import React from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';

export default class ConfirmationModal extends React.Component {
  state = { open: true }

  close = () => this.setState({ open: false });

  open = () => this.setState({ open: true });

  handleOkayClick = () => {
    this.close();
    this.props.next();
  }

  handleCancelClick = () => {
    this.close();
    if (this.props.cancel) this.props.cancel();
  }

  render() {
    const { open } = this.state;
    return (
      <Modal open={open} onClose={this.close}>
        <Header icon="warning" content="Hold Up!" />
        <Modal.Content>
          {this.props.children}
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={this.handleCancelClick}>
            Oops! Take me back.
            </Button>
          <Button color="green" inverted onClick={this.handleOkayClick}>
            Go ahead. I am not afraid.
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
