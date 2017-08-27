import React from 'react';
import { Message } from 'semantic-ui-react';

const NotFound = () => (
  <Message
    negative
    icon="exclamation triangle"
    header="Uh oh, that page doesn&#39;t seem to exist. Maybe it&#39;s moved?"
  />
);


export default NotFound;
