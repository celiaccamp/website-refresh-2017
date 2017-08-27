import React from 'react';
import { Header, Message } from 'semantic-ui-react';

const ThankYou = () => (
  <div>
    <Header as="h2">
    Thank You
  </Header>
    <Message
      positive
      icon="checkmark box"
      content="Your payment has been successfully processed."
    />
  </div>
);

export default ThankYou;
