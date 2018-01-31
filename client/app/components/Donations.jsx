import React from 'react';
import { Header, Card, Button, Icon, Segment, Divider, Form, Dropdown } from 'semantic-ui-react';
import DangerousComponent from './DangerousComponent';

const donationOptions = [
  { text: '$25', value: 25 },
  { text: '$50', value: 50 },
  { text: '$100', value: 100 },
  { text: '$200', value: 200 },
  { text: '$300', value: 300 },
  { text: '$500', value: 500 },
  { text: '$750', value: 750 },
  { text: '$1000', value: 1000 },
  { text: '$1500', value: 1500 },
  { text: '$2000', value: 2000 },
];

export default class DonationsAndPayment extends React.PureComponent {
  state = { amount: 50, acknowledge: 'Yes', donationOptions };

  handleAmountChange = (e, { value }) => {
    this.setState({ amount: value });
  };

  handleAmountAddition = (e, { value }) => {
    this.setState({
      donationOptions: [{ text: `$${value}`, value }, ...this.state.donationOptions],
    });
  };

  handleAcknowledgeChange = (e, { value }) => {
    this.setState({ acknowledge: value });
  };

  render() {
    const { amount, acknowledge } = this.state;
    const { data } = this.props;

    const acknowledgementOptions = [
      { key: 'Yes', text: 'Yes', value: 'Yes' },
      { key: 'No', text: 'No', value: 'No' },
    ];

    const info = data.pages.donations_and_payment;

    return (
      <div>
        <Header as="h2">{info.title.value}</Header>
        <DangerousComponent value={info.text_section_1.value} />
        <Segment style={{ textAlign: 'center' }}>
          {/* <Header as="h3">Registration</Header>
          <Form
            target="_blank"
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
          > */}
          {/*  Hidden inputs for paypal API  */}
          {/* <input type="hidden" name="cmd" value="_cart" />
            <input type="hidden" name="add" value="1" />
            <input type="hidden" name="bn" value="webassist.dreamweaver.4_5_0" />
            <input type="hidden" name="business" value="campceliac@gmail.com" />
            <input type="hidden" name="item_name" value="Camp Celiac Registration Fee" />
            <input type="hidden" name="amount" value="25" />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="hidden" name="receiver_email" value="campceliac@gmail.com" />
            <input type="hidden" name="mrb" value="R-3WH47588B4505740X" />
            <input type="hidden" name="pal" value="ANNSXSLJLYR2A" />
            <input type="hidden" name="no_shipping" value="1" />
            <input type="hidden" name="no_note" value="1" />
            <input type="hidden" name="return" value="http://www.celiaccamp.com/thankyou" />
            <Button
              type="submit"
              animated="vertical"
            >
              <Button.Content visible>Pay $25 Registration Fee</Button.Content>
              <Button.Content hidden>
                <Icon name="shopping cart" />
              </Button.Content>
            </Button> */}
          {/* </Form> */}
          {/* <Divider /> */}
          <Header as="h3">Support Camp Celiac</Header>
          <Form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
            <Form.Field
              selection
              search
              allowAdditions
              additionLabel="Custom Amount: $"
              onAddItem={this.handleAmountAddition}
              control={Dropdown}
              options={this.state.donationOptions}
              value={amount}
              onChange={this.handleAmountChange}
              style={{ width: '20%' }}
            />
            <Form.Field
              selection
              control={Dropdown}
              label="May we publicly acknowledge your donation?"
              options={acknowledgementOptions}
              defaultValue="Yes"
              onChange={this.handleAcknowledgeChange}
              style={{ width: '20%' }}
            />
            {/*  Hidden inputs for paypal API */}
            <input type="hidden" name="cmd" value="_cart" />
            <input type="hidden" name="business" value="KXV2CVJF4TFVY" />
            <input type="hidden" name="lc" value="US" />
            <input type="hidden" name="item_name" value="Make a Donation" />
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="hidden" name="button_subtype" value="products" />
            <input type="hidden" name="no_note" value="0" />
            <input type="hidden" name="no_shipping" value="2" />
            <input type="hidden" name="rm" value="1" />
            <input type="hidden" name="return" value="http://www.celiaccamp.com/thankyou" />
            <input type="hidden" name="add" value="1" />
            <input type="hidden" name="bn" value="PP-ShopCartBF:btn_cart_LG.gif:NonHosted" />
            <input type="hidden" name="on0" value="May we publicly acknowledge your donation?" />
            <input type="hidden" name="os0" value={acknowledge} />
            <Button type="submit">Donate</Button>
          </Form>
        </Segment>
        <DangerousComponent value={info.text_section_2.value} />
        <br />
        <Card raised style={{ width: '65%', margin: 'auto' }} className="address-card">
          <Card.Content header="Celiac Community Foundation of Northern California" />
          <Card.Content
            description={
              <p>
                PO Box 1506
                <br />
                Healdsburg, CA 95448-1506
              </p>
            }
          />
        </Card>
      </div>
    );
  }
}
