import React from 'react';
import { Header } from 'semantic-ui-react';
import DangerousComponent from './DangerousComponent';

const VendorInformation = ({ data }) => {
  const info = data.pages.vendor_information;
  return (
    <div>
      <Header as="h2">{info.title.value}</Header>
      <DangerousComponent value={info.content.value} />
    </div>
  );
};


export default VendorInformation;
