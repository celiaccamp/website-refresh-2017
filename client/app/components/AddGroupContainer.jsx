import React from 'react';
import { Form, Message, Modal, Button, Icon, Header } from 'semantic-ui-react';

export default class AddGroupContainer extends React.Component {
  state = { open: false, dividerLabel: '', containerLabel: '', error: false }

  close = () => this.setState({ open: false });

  open = () => this.setState({ open: true });

  handleDividerLabelChange = (e, { value }) => this.setState({ dividerLabel: value });

  handleContainerLabelChange = (e, { value }) => this.setState({ containerLabel: value });


  handleClick = () => {
    // validate
    if (this.state.dividerLabel && this.state.containerLabel) {
      this.close();
      // create() must take argument of dividerLabel and containerLabel
      this.props.create(this.state.dividerLabel, this.state.containerLabel);
      this.setState({ error: false, dividerLabel: '', containerLabel: '' });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { children, header, animated } = this.props;
    const { open, containerLabel, dividerLabel, error } = this.state;
    return (
      <span>
        <Button color="blue" animated={animated || 'vertical'} fluid onClick={this.open}>
          {children}
        </Button>
        <Modal open={open} onClose={this.close}>
          <Header icon="edit" content={header || 'Add a New Component'} />
          <Modal.Content>
            <Form error={error}>
              <Form.Input
                error={error && !containerLabel}
                required
                label="Internal Container Label"
                value={containerLabel}
                onChange={this.handleContainerLabelChange}
                placeholder="Label for the container header and footer inputs (i.e. 2017 Link Group Container Header & Footer)"
              />
              <Form.Input
                error={error && !dividerLabel}
                required
                label="Internal Divider Label"
                value={dividerLabel}
                onChange={this.handleDividerLabelChange}
                placeholder="Label for the section divider (i.e. Camp Celiac 2017 Links)"
              />
              <Message
                error
                header="Invalid Input"
                content="Please enter values for both fields."
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleClick}>
              <Icon name="plus" /> Create Group
          </Button>
          </Modal.Actions>
        </Modal>
      </span>
    );
  }
}
