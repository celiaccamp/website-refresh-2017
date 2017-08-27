/*
    ./client/components/Footer.jsx
*/
import React from 'react';
import { Header, Divider, Grid, Container, List, Segment, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CELIAC_COMMUNITY_LOGO from '../assets/images/celiac-community-logo.png';
import TAYLOR_LOGO from '../assets/images/taylor-logo.png';
import KAISER_LOGO from '../assets/images/kaiser-logo.png';
import ADLER_COLVIN_LOGO from '../assets/images/adler-colvin-logo.png';

const Footer = ({ data }) => (
  <div className="footer">
    <Segment
      vertical
      style={{ margin: '5em 0em 0em', padding: '5em 0em', backgroundColor: '#e0e1e2' }}
    >
      <Container textAlign="center">
        <Grid divided stackable>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header as="h4">
              Camp Celiac is administered by the Celiac Community
              Foundation of Northern California
              </Header>
              <Image
                as="a"
                target="_blank"
                href="http://celiaccommunity.org/"
                src={CELIAC_COMMUNITY_LOGO}
                className="celiac-community-logo"
              />
            </Grid.Column>
            <Grid.Column >
              <Header as="h4" content="Generous Sponsors" />
              <List link relaxed className="sponsors">
                <List.Item as="a" href="http://www.ttff.org" target="_blank">
                  <Image src={TAYLOR_LOGO} />
                </List.Item>
                <List.Item as="a" href="http://www.kp.org" target="_blank">
                  <Image src={KAISER_LOGO} />
                </List.Item>
                <List.Item as="a" href="http://www.adlercolvin.com/" target="_blank">
                  <Image src={ADLER_COLVIN_LOGO} />
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column only="computer tablet">
              <Header as="h4" content="Registration Links" />
              <List relaxed link>
                <List.Item>
                  <Link to="/camperregistration">
                    Camper Registration
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to="/juniorcounselorregistration">
                    Junior Counselor Registration
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to="/counselorregistration">
                    Counselor Registration
                  </Link>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only="computer tablet">
            <Grid.Column textAlign="center">
              <Divider section />
              <List horizontal divided link>
                <List.Item>
                  <Link to="/donationsandpayment">
                  Donate
                  </Link>
                </List.Item>
                <List.Item>
                  <Link to="/contactinformation">
                  Contact Us
                </Link>
                </List.Item>
                <List.Item>
                  <Link to="/admin">
                   Administrators
                </Link>
                </List.Item>
                <List.Item as="a" href={data ? data.links.facebook_link.value : '#'} target="_blank">
                  <Icon name="facebook f" />
                </List.Item>
                <List.Item as="a" href={data ? data.links.instagram_link.value : '#'} target="_blank">
                  <Icon name="instagram" />
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
  );

export default Footer;
