import React from 'react';
import { Form, Message, Modal, Button, Icon, Header } from 'semantic-ui-react';

export default class AddComponentModal extends React.Component {
  state = { open: false, value: '', error: false }

  close = () => this.setState({ open: false });

  open = () => this.setState({ open: true });

  handleLabelChange = (e, { value }) => this.setState({ value });

  handleClick = () => {
    if (!this.props.exists(this.state.value)) {
      this.close();
      // create() must take argument of label value
      this.props.create(this.state.value, this.props.group);
      this.setState({ error: false, value: '' });
    } else {
      this.setState({ error: true });
    }
  }

  handleDeleteClick = () => {
    this.close();
    this.props.delete();
  }

  render() {
    const { children, header, animated, deletable } = this.props;
    const { open, value, error } = this.state;

    const deleteIcon = deletable ? (
      <Icon
        name="remove"
        onClick={this.handleDeleteClick}
        style={{ cursor: 'pointer' }}
      />
    ) : '';

    return (
      <span>
        <Button animated={animated || 'vertical'} fluid onClick={this.open}>
          {children}
        </Button>
        <Modal open={open} onClose={this.close}>
          <Header>
            <span>
              <Icon name="edit" size="large" />
              {header || 'Add a New Component'}&nbsp;
              {deleteIcon}
            </span>
          </Header>
          <Modal.Content>
            <Form error={error} onSubmit={this.handleClick}>
              <Form.Input
                label="Internal Label"
                value={value}
                onChange={this.handleLabelChange}
                placeholder="Enter unique label to be used as admin panel identifier."
              />
              <Message
                error
                header="Label Already Exists"
                content="Please enter a label unique to the page."
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleClick}>
              <Icon name="plus" /> Create
          </Button>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}
