import React from 'react';
import { Header, Message, Step } from 'semantic-ui-react';
import DangerousComponent from './DangerousComponent';

const CounselorRegistration = ({ data }) => {
  const info = data.pages.counselor_registration;
  return (
    <div className="registration">
      <Header as="h2">{info.title.value}</Header>
      <DangerousComponent value={info.text_section_1.value} />
      <Message
        icon="info circle"
        header={info.background_check_message.header_value}
        warning
        content={
          <DangerousComponent value={info.background_check_message.value} />
        }
      />
      <DangerousComponent value={info.text_section_2.value} />
      <br />
      <div className="center-wrapper">
        <Step.Group vertical>
          <Step
            link
            size="tiny"
            icon="wpforms"
            title="Volunteer Registration Form"
            description="Available February 1st"
            as="a"
            href={data ? data.links.counselor_registration_form.value : '#'}
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
            href={data ? data.links.counselor_liability_waiver.value : '#'}
            rel="noopener noreferrer"
            target="_blank"
          />
        </Step.Group>
      </div>
    </div>
  );
};

export default CounselorRegistration;
