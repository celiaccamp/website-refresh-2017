import React from 'react';
import { Header, Message, Step, Card } from 'semantic-ui-react';
import DangerousComponent from './DangerousComponent';

const JuniorCounselorRegistration = ({ data }) => {
  const info = data.pages.junior_counselor_registration;
  return (
    <div className="registration">
      <Header as="h2">{info.title.value}</Header>
      <DangerousComponent value={info.text_section_1.value} />
      <Message
        icon="info circle"
        warning
        content={
          <DangerousComponent value={info.gap_year_message.value} />
        }
      />
      <DangerousComponent value={info.text_section_2.value} />
      <Message
        icon="info circle"
        header={info.registration_priority_message.header_value}
        warning
        content={
          <DangerousComponent value={info.registration_priority_message.value} />
        }
      />
      <DangerousComponent value={info.text_section_3.value} />
      <Message
        icon="exclamation circle"
        positive
        content={
          <DangerousComponent value={info.register_status_message.value} />
        }
      />
      <DangerousComponent value={info.text_section_4.value} />
      <br />
      <div className="center-wrapper">
        <Step.Group vertical>
          <Step
            link
            size="tiny"
            icon="wpforms"
            title="JC Registration Form"
            description="Completed by legal guardian"
            as="a"
            href={data ? data.links.junior_counselor_registration_form.value : '#'}
            rel="noopener noreferrer"
            target="_blank"
          />
          <Step
            link
            size="tiny"
            icon="heartbeat"
            title="Health History"
            description="Requires physician approval"
            as="a"
            href={data ? data.links.health_history_link.value : '#'}
            rel="noopener noreferrer"
            target="_blank"
          />
          <Step
            link
            size="tiny"
            icon="pencil"
            title="Liability Waiver"
            description="Uses online signature"
            as="a"
            href={data ? data.links.camper_and_jc_liability_waiver.value : '#'}
            rel="noopener noreferrer"
            target="_blank"
          />
          <Step
            link
            size="tiny"
            icon="credit card"
            title="Pay Registration"
            description="$25 non-refundable registration fee"
          />
        </Step.Group>
      </div>
      <br />
      <DangerousComponent value={info.text_section_5.value} />
      <br />
      <Card
        raised
        style={{ width: '65%', margin: 'auto' }}
        className="address-card"
      >
        <Card.Content header="Celiac Community Foundation of Northern California" />
        <Card.Content description={
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
};

export default JuniorCounselorRegistration;
