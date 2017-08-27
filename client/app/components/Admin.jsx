/*
    ./client/components/Admin.jsx
*/
import React from 'react';
import { Grid, Loader, Dimmer } from 'semantic-ui-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { firebaseAuth, ref } from '../firebase';
import AdminHeader from './AdminHeader';
import AdminNavigation from './AdminNavigation';
import ComponentEditor from './ComponentEditor';
import Login from './Login';
import NotFound from './NotFound';
import DataCheckWrapper from './DataCheckWrapper';
import ConfirmationModal from './ConfirmationModal';

function PrivateRoute({ component: PassedComponent, authed, additionalProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
          authed === true
          ? <PassedComponent {...props} {...additionalProps} />
          : <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
        )}
    />
  );
}

function PublicRoute({ component: PassedComponent, authed, additionalProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        authed === false
        ? <PassedComponent {...props} {...additionalProps} />
        : <Redirect to="/admin/dashboard" />
      )}
    />
  );
}

export default class Admin extends React.PureComponent {

  state = {
    authed: false,
    selected: 'home',
    changed: false,
    confirmation: false,
    next: null,
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          user,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });

    ref.on('value', (snapshot) => {
      this.setState({
        data: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  handleSelectedChange = (e, { name }) => {
    if (this.state.changed) {
      this.setState({ confirmation: true, next: name });
    } else {
      this.setState({ selected: name, changed: false });
    }
  }

  handleChanged = () => this.setState({ changed: true })

  clearChanged = () => this.setState({ changed: false })

  render() {
    const { data, selected, confirmation, next } = this.state;

    const pages = {
      home: {
        title: 'Edit the Home Page',
        path: 'pages/home',
        data: data ? data.pages.home : null,
      },
      camper_registration: {
        title: 'Edit the Camper Registration Page',
        path: 'pages/camper_registration',
        data: data ? data.pages.camper_registration : null,
      },
      junior_counselor_registration: {
        title: 'Edit the Junior Counselor Registration Page',
        path: 'pages/junior_counselor_registration',
        data: data ? data.pages.junior_counselor_registration : null,
      },
      counselor_registration: {
        title: 'Edit the Counselor Registration Page',
        path: 'pages/counselor_registration',
        data: data ? data.pages.counselor_registration : null,
      },
      faq: {
        title: 'Edit the Frequently Asked Questions Page',
        path: 'pages/faq',
        data: data ? data.pages.faq : null,
      },
      vendor_information: {
        title: 'Edit the Vendor Information Page',
        path: 'pages/vendor_information',
        data: data ? data.pages.vendor_information : null,
      },
      contact_information: {
        title: 'Edit the Contact Information Page',
        path: 'pages/contact_information',
        data: data ? data.pages.contact_information : null,
      },
      what_people_say: {
        title: 'Edit the What People Say Page',
        path: 'pages/what_people_say',
        data: data ? data.pages.what_people_say : null,
      },
      sample_menu: {
        title: 'Edit the Sample Menu Page',
        path: 'pages/sample_menu',
        data: data ? data.pages.sample_menu : null,
      },
      gallery: {
        title: 'Edit the Gallery Page',
        path: 'pages/gallery',
        data: data ? data.pages.gallery : null,
      },
      donations_and_payment: {
        title: 'Edit the Donations & Payment Page',
        path: 'pages/donations_and_payment',
        data: data ? data.pages.donations_and_payment : null,
      },
      camp_watch: {
        title: 'Edit the Camp Watch Sidebar',
        path: 'pages/camp_watch',
        data: data ? data.pages.camp_watch : null,
      },
      calendar: {
        title: 'Edit the Calendar Sidebar',
        path: 'pages/calendar',
        data: data ? data.pages.calendar : null,
      },
      links: {
        title: 'Edit the External Links',
        path: 'links',
        data: data ? data.links : null,
      },
    };

    return (
      <div>
        {
          confirmation && <ConfirmationModal
            next={() => { this.setState({ selected: next, changed: false, confirmation: false }); }}
            cancel={() => { this.setState({ confirmation: false }); }}
          >Are you sure you want to switch pages? Any changes will be lost</ConfirmationModal>
        }
        {!pages[selected].data && <Dimmer active><Loader /></Dimmer>}
        <AdminHeader authed={this.state.authed} user={this.state.user} />
        <div className="main-admin-content-wrapper">
          <Grid padded stackable>
            <Grid.Row>
              <Grid.Column computer={3} tablet={5}>
                <AdminNavigation handleSelectedChange={this.handleSelectedChange} />
              </Grid.Column>
              <Grid.Column computer={13} tablet={11}>
                <Switch>
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/admin/dashboard"
                    additionalProps={
                    {
                      data,
                      children: (
                        <ComponentEditor
                          title={pages[selected].title}
                          path={pages[selected].path}
                          data={pages[selected].data}
                          handleChanged={this.handleChanged}
                          clearChanged={this.clearChanged}
                        />
                      ),
                    }
                    }
                    component={DataCheckWrapper}
                  />
                  <PublicRoute authed={this.state.authed} path={'/admin'} component={Login} />
                  <PublicRoute authed={this.state.authed} path={'/admin/login'} component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
