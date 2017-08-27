/*
    ./client/components/ComponentEditor.jsx
    main admin panel editor
*/
import React from 'react';
import { Form, Header, Button, Icon, Modal, Divider } from 'semantic-ui-react';
import { EditorState, convertFromRaw } from 'draft-js';
import { cloneDeep, isEqual } from 'lodash';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import firebase from 'firebase';
import keydown from 'react-keydown';
import { getTypeComponent, emptyDraft, sortKeys } from './Config';
import ConfirmationModal from './ConfirmationModal';

@keydown('cmd + s', 'ctrl + s')
export default class ComponentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setUpEditor(props);
  }

  componentWillReceiveProps(nextProps) {
    const { keydown: { event } } = nextProps;
    if (event) {
      event.preventDefault();
      this.save();
    }
    if (nextProps.path !== this.props.path) {
      // check if there are changes
      this.state = this.setUpEditor(nextProps);
    }
  }

  setNestedEditorState = (key, newState) => {
    const newEditorState = {};
    newEditorState[key] = newState;
    this.setState({ editorStates: { ...this.state.editorStates, ...newEditorState } });
  }

  setNestedEditField = (key, value, field = 'value') => {
    const lowerState = {};
    lowerState[field] = value;
    const changedState = {};
    changedState[key] = Object.assign({}, this.state.editedData[key], lowerState);
    if (!isEqual(changedState[key], this.state.editedData[key])) {
      this.props.handleChanged();
    }
    this.setState({ editedData: { ...this.state.editedData, ...changedState } });
  }

  // returns a state object containing necessary set-up data
  setUpEditor(props) {
    const { data } = props;
    // get and sort keys
    const keys = Object.keys(data);
    sortKeys(keys, data);

    // number of non-adder components
    let numInputs = 0;
    // number of groups
    let numGroups = 0;

    // default the editor states
    const editorStates = {};
    keys.forEach((key) => {
      if (data[key].type === 'textarea'
          || data[key].type === 'inputandtextarea'
          || data[key].type === 'twoinputandtextarea') {
        editorStates[key] = this.generateEditorState(key, data);
      }
      numInputs = Math.max(
        numInputs, data[key].order < Number.MAX_SAFE_INTEGER ? data[key].order : -1,
      );
      numGroups = Math.max(
        numGroups, data[key].group < Number.MAX_SAFE_INTEGER ? data[key].group : -1,
      );
    });

    return {
      editedData: cloneDeep(data),
      editorStates,
      processing: false,
      showSuccessModal: false,
      showErrorModal: false,
      showConfirmationModal: false,
      keys,
      numInputs,
      numGroups,
    };
  }

  closeSuccessModal = () => this.setState({ showSuccessModal: false })

  closeErrorModal = () => this.setState({ showErrorModal: false })

  save = () => {
    const { editedData } = this.state;
    const { path } = this.props;
    this.setState({ processing: true });
    firebase.database().ref(path).set(editedData)
    .then(() => {
      this.props.clearChanged();
      this.setState({ processing: false, showSuccessModal: true });
    })
    .catch(() => {
      this.setState({ processing: false, showErrorModal: true });
    });
  }

  generateEditorState = (key, data) => {
    if (data[key].value) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(data[key].value)));
    }
    throw Error('Cannot not find value field for object.');
  }

  // adds input given object
  // sets state and increments appropriate counts
  addInput(newInput, increment = true, callback) {
    const { editedData, keys, numInputs } = this.state;
    const { path } = this.props;
    const key = firebase.database().ref(path).push().key;
    const newEditedState = {};
    newEditedState[key] = newInput;
    const newEditedData = { ...editedData, ...newEditedState };

    // deal with keys (duplicate, push, sort, set)
    const newKeys = keys.slice();
    newKeys.push(key);
    sortKeys(newKeys, newEditedData);
    this.setState({
      editedData: newEditedData,
      keys: newKeys,
      numInputs: increment ? numInputs + 1 : numInputs,
    }, callback);
  }

  addInputAndTextArea = (label, group, extra) => {
    const { numInputs } = this.state;
    const newInputAndTextArea = {
      header_value: '',
      label,
      order: numInputs + 1,
      value: emptyDraft,
      type: 'inputandtextarea',
      deletable: true,
      ...extra,
    };
    // set here if needed since null not allowed
    if (group) newInputAndTextArea.group = group;

    // add to editedState
    this.addInput(newInputAndTextArea);

    // mark the state as having unsaved changes
    this.props.handleChanged();
  }

  addTwoInputAndTextArea = (label, group, extra) => {
    const { numInputs } = this.state;
    const newTwoInputAndTextArea = {
      header_value: '',
      content: '',
      label,
      order: numInputs + 1,
      value: emptyDraft,
      type: 'twoinputandtextarea',
      deletable: true,
      ...extra,
    };
    // set here if needed since null not allowed
    if (group) newTwoInputAndTextArea.group = group;

    // add to editedState
    this.addInput(newTwoInputAndTextArea);

    // mark the state as having unsaved changes
    this.props.handleChanged();
  }

  addGroupContainer = (dividerLabel, containerLabel) => {
    const { numGroups } = this.state;
    const newDivider = {
      deletable: 'true',
      order: -1,
      group: numGroups + 1,
      type: 'divider',
      label: dividerLabel,
    };
    const newAdder = {
      deletable: 'true',
      label: `Add to ${dividerLabel}`,
      group: numGroups + 1,
      order: Number.MAX_SAFE_INTEGER,
      type: 'addinputandtextarea',
    };

    // optional third argument to addInput is the callback to setState()
    this.addInput(newDivider, false,
      () => this.addInput(newAdder, false,
        () => this.addInputAndTextArea(containerLabel, numGroups + 1, { purpose: 'container' })),
    );
    this.setState({ numGroups: numGroups + 1 });

    // mark the state as having unsaved changes
    this.props.handleChanged();
  }

  labelExists = (label) => {
    let found = false;
    Object.keys(this.state.editedData).forEach((key) => {
      if (!this.state.editedData[key].label) return;
      if (label.replace(/ +/g, '').toUpperCase() ===
          this.state.editedData[key].label.replace(/ +/g, '').toUpperCase()) {
        found = true;
      }
    });
    return found;
  }

  handleDelete = (key, label) => {
    this.setState({
      deleteModal: (
        <ConfirmationModal
          next={() => this.delete(key)}
          cancel={() => this.setState({ deleteModal: null })}
        >
          Are you sure you want to delete <strong><i>{label}</i></strong> from the page?
        </ConfirmationModal>
      ),
    });
  }

  delete = (key) => {
    this.setState({ deleteModal: null });
    const changed = cloneDeep(this.state.editedData);
    delete changed[key];
    const keys = this.state.keys.slice();
    const index = keys.indexOf(key);
    if (index > -1) {
      keys.splice(index, 1);
    } else {
      throw Error('Cannot find key in key list. Delete function cannot complete');
    }
    this.setState({ editedData: changed, keys });
    this.props.handleChanged();
  }

  render() {
    const { processing, showSuccessModal, showErrorModal, deleteModal, keys } = this.state;
    const { title } = this.props;

    return (
      <div className="component-editor">
        {showSuccessModal && (
          <Modal open={showSuccessModal} onClose={this.closeSuccessModal}>
            <Header icon="check" content="Save Successful" />
            <Modal.Content>
              <p>
                Your edits were saved successfully!
                Check out the Camp Celiac website to view the changes live.
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted onClick={this.closeSuccessModal}>
                <Icon name="thumbs up" /> Got it!
              </Button>
            </Modal.Actions>
          </Modal>
        )}
        {showErrorModal && (
          <Modal open={showErrorModal} onClose={this.closeErrorModal}>
            <Header icon="cancel" content="Save Error" />
            <Modal.Content>
              <p>
                There was an error saving your edits. Please talk to Nate.
                Apologies! :(
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted onClick={this.closeErrorModal}>
                <Icon name="thumbs down" /> Come on Nate, step it up.
              </Button>
            </Modal.Actions>
          </Modal>
        )}
        {deleteModal}
        <Header as="h3">{title}</Header>
        <Form>
          {
            keys.map(key => (getTypeComponent.call(this, key)))

          }
          <Divider />
          <Form.Button animated onClick={this.save} loading={processing}>
            <Button.Content visible>Save</Button.Content>
            <Button.Content hidden>
              <Icon name="save" size="large" />
            </Button.Content>
          </Form.Button>
        </Form>
      </div>
    );
  }
}
