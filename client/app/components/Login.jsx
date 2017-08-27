import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { login, resetPassword } from '../auth';
import LOGO_WITH_TITLE from '../assets/images/logo-with-title.png';

function setErrorMsg(error) {
  return {
    loginMessage: error,
    loading: false,
  };
}

export default class Login extends Component {
  state = { loginMessage: '', email: '', password: '' }
  handleSubmit = (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    const { email, password } = this.state;
    login(email, password)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ ...setErrorMsg('Invalid username/password combination.'), loading: false });
      });
  }
  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.email}.`)))
      .catch(() => this.setState(setErrorMsg('Email address not found.')));
  }
  handleEmailChange = (e, { value }) => {
    this.setState({ email: value });
  }
  handlePasswordChange = (e, { value }) => {
    this.setState({ password: value });
  }
  render() {
    const { loginMessage, email, password, loading } = this.state;
    return (
      <div className="login-form">
        <Modal open size="tiny">
          <Grid
            textAlign="center"
            style={{ paddingTop: '5vh', paddingBottom: '7vh' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                <Link to="/home">
                  <Image src={LOGO_WITH_TITLE} style={{ width: 200, margin: 'auto' }} />
                </Link>
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={email}
                    onChange={this.handleEmailChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                  />

                  <Button fluid size="large" loading={loading}>Login</Button>
                </Segment>
              </Form>
              <Message
                negative
                style={{ display: !loginMessage ? 'none' : null }}
                icon="exclamation triangle"
                content={
                  loginMessage && (
                    <span>
                      {loginMessage}<br />
                      <a href="#" onClick={this.resetPassword} className="alert-link">Send Password Reset Email</a>
                    </span>
                  )
                }
              />
            </Grid.Column>
          </Grid>
        </Modal>
      </div>
    );
  }
}
