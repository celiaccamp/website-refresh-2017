import React from 'react';
import { Header, Loader } from 'semantic-ui-react';
import DangerousComponent from './DangerousComponent';

const ContactInformation = ({ data }) => {
  if (!data) return <Loader active />;
  const info = data.pages.contact_information;
  return (
    <div>
      <Header as="h2">{info.title.value}</Header>
      <DangerousComponent value={info.content.value} />
    </div>
  );
};


export default ContactInformation;
