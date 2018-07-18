/*
    ./client/components/MainWebsite.jsx
*/
import React from 'react';
import { Grid, Container, Divider, Segment, Loader, Dimmer } from 'semantic-ui-react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ref } from '../firebase';
import MainNavigation from './MainNavigation';
import CampWatch from './CampWatch';
import Home from './Home';
import Footer from './Footer';
import NotFound from './NotFound';
import CamperRegistration from './CamperRegistration';
import JuniorCounselorRegistration from './JuniorCounselorRegistration';
import CounselorRegistration from './CounselorRegistration';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import WhatPeopleSay from './WhatPeopleSay';
import SampleMenu from './SampleMenu';
import Gallery from './Gallery';
import VendorInformation from './VendorInformation';
import ContactInformation from './ContactInformation';
import Donations from './Donations';
import ThankYou from './ThankYou';
import Calendar from './Calendar';

class MainWebsite extends React.Component {
  state = {};

  componentDidMount() {
    ref.on('value', snapshot => {
      this.setState({ data: snapshot.val() });
    });
  }

  handleClick = (e, { name }) => {
    this.props.history.push(`/${name}`);
  };

  render() {
    return (
      <div>
        <MainNavigation {...this.state} handleClick={this.handleClick} />
        <div className="main-content-wrapper">
          <Container className="content-container">
            {!this.state || !this.state.data ? (
              <Dimmer active>
                <Loader content="Loading" />
              </Dimmer>
            ) : (
              <Grid padded stackable>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <Switch>
                      <Route
                        path="/home"
                        exact
                        render={props => <Home {...props} {...this.state} />}
                      />
                      <Route path="/" exact render={props => <Home {...props} {...this.state} />} />
                      <Route
                        path="/camperregistration"
                        exact
                        render={props => <CamperRegistration {...props} {...this.state} />}
                      />
                      <Route
                        path="/juniorcounselorregistration"
                        exact
                        render={props => <JuniorCounselorRegistration {...props} {...this.state} />}
                      />
                      <Route
                        path="/counselorregistration"
                        exact
                        render={props => <CounselorRegistration {...props} {...this.state} />}
                      />
                      <Route
                        path="/faq"
                        exact
                        render={props => <FrequentlyAskedQuestions {...props} {...this.state} />}
                      />
                      <Route
                        path="/whatpeoplesay"
                        exact
                        render={props => <WhatPeopleSay {...props} {...this.state} />}
                      />
                      <Route
                        path="/samplemenu"
                        exact
                        render={props => <SampleMenu {...props} {...this.state} />}
                      />
                      <Route
                        path="/gallery"
                        exact
                        render={props => <Gallery {...props} {...this.state} />}
                      />
                      <Route
                        path="/vendorinformation"
                        exact
                        render={props => <VendorInformation {...props} {...this.state} />}
                      />
                      <Route
                        path="/contactinformation"
                        exact
                        render={props => <ContactInformation {...props} {...this.state} />}
                      />
                      <Route
                        path="/donations"
                        exact
                        render={props => <Donations {...props} {...this.state} />}
                      />
                      <Route
                        path="/thankyou"
                        exact
                        render={props => <ThankYou {...props} {...this.state} />}
                      />
                      <Route path="/*" render={props => <NotFound {...props} {...this.state} />} />
                    </Switch>
                  </Grid.Column>
                  <Grid.Column width={5} textAlign="center">
                    <Segment>
                      <CampWatch {...this.state} />
                    </Segment>
                    <Divider hidden />
                    <Segment>
                      <Calendar {...this.state} />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )}
          </Container>
        </div>
        <Footer {...this.state} />
      </div>
    );
  }
}

export default withRouter(MainWebsite);
