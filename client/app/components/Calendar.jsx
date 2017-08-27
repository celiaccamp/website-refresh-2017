import React from 'react';
import { Header, Divider, Statistic, Loader } from 'semantic-ui-react';
import DangerousComponent from './DangerousComponent';

const Calendar = ({ data }) => {
  if (!data) return <Loader active />;
  const info = data.pages.calendar;

  // get the date types
  const dates = Object.keys(info).reduce((thusFar, key) => {
    if (info[key].type === 'twoinputandtextarea') return [info[key], ...thusFar];
    return thusFar;
  }, []);

  return (
    <div className="calendar">
      <Header as="h2">{info.title.value}</Header>
      {
        dates.map(date => (
          <span key={date.label}>
            <Statistic
              color="blue"
              label={date.content}
              value={date.header_value}
              size="small"
              style={{ marginBottom: '5px' }}
            />
            <DangerousComponent checkEmpty value={date.value} />
          </span>
        ))
      }
      <Divider />
      <DangerousComponent value={info.text_section_1.value} />
    </div>
  );
};

export default Calendar;
