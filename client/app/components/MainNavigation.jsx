/*
    ./client/components/MainNavigation.jsx
*/
import React from 'react';
import { Dropdown, Image, Menu, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import LOGO_WITH_TITLE from '../assets/images/logo-with-title.png';

const MainNavigation = withRouter(({ history, data }) => (
  <div className="main-navigation">
    <Menu stackable>
      <Menu.Item
        header
        as="a"
        onClick={() => history.push('/home')}
      >
        <Image
          src={LOGO_WITH_TITLE}
        />
      </Menu.Item>
      <Menu.Item
        as="a"
        onClick={() => history.push('/home')}
      >
          Home
        </Menu.Item>
      <Dropdown item simple text="Registration">
        <Dropdown.Menu>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/camperregistration')}
          >
              Camper Registration
            </Dropdown.Item>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/juniorcounselorregistration')}
          >
              Junior Counselor Registration
            </Dropdown.Item>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/counselorregistration')}
          >
              Counselor Registration
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown item simple text="Information">
        <Dropdown.Menu>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/faq')}
          >
              FAQ
            </Dropdown.Item>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/vendorinformation')}
          >
              Vendor Information
            </Dropdown.Item>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/contactinformation')}
          >
              Contact Information
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown item simple text="About Camp">
        <Dropdown.Menu>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/whatpeoplesay')}
          >
            What People Say
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/samplemenu')}
          >
            Sample Menu
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            onClick={() => history.push('/gallery')}
          >
            Gallery
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item
        as="a"
        onClick={() => history.push('/donationsandpayment')}
      >
          Donations & Payment
        </Menu.Item>
      <Menu.Menu position="right" className="computer-only">
        <Menu.Item>
          <Button
            as="a"
            href={data ? data.links.facebook_link.value : '#'}
            target="_blank"
            circular
            color="facebook"
            icon="facebook"
          />
        </Menu.Item>
        <Menu.Item>
          <Button
            as="a"
            href={data ? data.links.instagram_link.value : '#'}
            target="_blank"
            circular
            color="instagram"
            icon="instagram"
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </div>
  ));

export default MainNavigation;
