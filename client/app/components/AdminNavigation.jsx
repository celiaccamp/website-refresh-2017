import React from 'react';
import { Menu, Divider } from 'semantic-ui-react';

const AdminNavigation = ({ handleSelectedChange }) => (
  <div className="admin-navigation">
    <Menu vertical fluid borderless attached="top">
      <Menu.Item header>Select a Component</Menu.Item>
      <Divider />
      <Menu.Item name="home" onClick={handleSelectedChange}>
        Home
      </Menu.Item>
      <Menu.Item name="camper_registration" onClick={handleSelectedChange}>
        Camper Registration
      </Menu.Item>
      <Menu.Item name="junior_counselor_registration" onClick={handleSelectedChange}>
        JC Registration
      </Menu.Item>
      <Menu.Item name="counselor_registration" onClick={handleSelectedChange}>
        Counselor Registration
      </Menu.Item>
      <Menu.Item name="faq" onClick={handleSelectedChange}>
        FAQ
      </Menu.Item>
      <Menu.Item name="vendor_information" onClick={handleSelectedChange}>
        Vendor Information
      </Menu.Item>
      <Menu.Item name="contact_information" onClick={handleSelectedChange}>
        Contact Information
      </Menu.Item>
      <Menu.Item name="what_people_say" onClick={handleSelectedChange}>
        What People Say
      </Menu.Item>
      <Menu.Item name="sample_menu" onClick={handleSelectedChange}>
        Sample Menu
      </Menu.Item>
      <Menu.Item name="gallery" onClick={handleSelectedChange}>
        Gallery
      </Menu.Item>
      <Menu.Item name="donations_and_payment" onClick={handleSelectedChange}>
        Donations
      </Menu.Item>
      <Divider />
      <Menu.Item name="camp_watch" onClick={handleSelectedChange}>
        Camp Watch
      </Menu.Item>
      <Menu.Item name="calendar" onClick={handleSelectedChange}>
        Calendar
      </Menu.Item>
      <Menu.Item name="links" onClick={handleSelectedChange}>
        Links
      </Menu.Item>
    </Menu>
  </div>
);

export default AdminNavigation;
