import React from 'react';
import { Menu, Image, Icon, Dropdown, Modal, Header, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import LOGO_WITH_TITLE from '../assets/images/logo-with-title.png';
import { logout, resetPassword } from '../auth';

class AdminHeader extends React.Component {
  state = {
    showResetPasswordSuccessModal: false,
    showResetPasswordFailureModal: false,
  }

  closeResetPasswordSuccessModal = () => {
    this.setState({ showResetPasswordSuccessModal: false });
  }

  closeResetPasswordFailureModal = () => {
    this.setState({ showResetPasswordFailureModal: false });
  }

  handleResetPassword = () => {
    resetPassword(this.props.user.email)
    .then(() => this.setState({ showResetPasswordSuccessModal: true }))
    .catch(() => this.setState({ showResetPasswordFailureModal: true }));
  }

  render() {
    const { history, authed, user } = this.props;
    const { showResetPasswordSuccessModal, showResetPasswordFailureModal } = this.state;
    return (
      <div className="admin-header">
        {showResetPasswordSuccessModal && (
          <Modal open={showResetPasswordSuccessModal} onClose={this.closeResetPasswordSuccessModal}>
            <Header icon="mail" content="Email Successful Sent" />
            <Modal.Content>
              <p>
                An email was successfully sent to {user.email}.
                Please follow the instructions in the email to change your password.
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted onClick={this.closeResetPasswordSuccessModal}>
                <Icon name="checkmark" /> Got it!
              </Button>
            </Modal.Actions>
          </Modal>
        )}
        {showResetPasswordFailureModal && (
          <Modal open={showResetPasswordFailureModal} onClose={this.closeResetPasswordFailureModal}>
            <Header icon="check" content="Save Successful" />
            <Modal.Content>
              <p>
                The reset password email could not be sent to {user.email}.
                Please talk to Nate. Apologies :(
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted onClick={this.closeResetPasswordFailureModal}>
                <Icon name="checkmark" /> Come on Nate, step it up.
              </Button>
            </Modal.Actions>
          </Modal>
        )}
        <Menu borderless fluid>
          <Menu.Item
            header
            as="a"
            onClick={() => history.push('/home')}
          >
            <Image
              src={LOGO_WITH_TITLE}
            />
          </Menu.Item>
          {
        authed && (
          <Menu.Menu position="right">
            <Icon name="user" size="large" className="user-icon" />
            <Dropdown item simple text={user.email} className="user-dropdown" >
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>
                  <Icon name="log out" />
                  Log Out
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleResetPassword}>
                  <Icon name="mail" />
                  Change Password
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )
      }
    )
    </Menu>
      </div>
    );
  }
}

export default withRouter(AdminHeader);
