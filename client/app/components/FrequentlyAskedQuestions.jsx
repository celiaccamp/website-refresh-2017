import React from 'react';
import { Header, Accordion } from 'semantic-ui-react';
import DangerousComponent from './DangerousComponent';

const FrequentlyAskedQuestions = ({ data }) => {
  const info = data.pages.faq;

  // set up panels
  const panels = [];
  const keys = Object.keys(info).sort((a, b) => {
    const aValue = info[a].order;
    const bValue = info[b].order;
    if (aValue === undefined || aValue < bValue) {
      return -1;
    }
    if (bValue === undefined || bValue < aValue) {
      return 1;
    }
    return 0;
  });

  keys.forEach((key) => {
    const item = info[key];
    if (item.type === 'inputandtextarea') {
      panels.push({
        title: item.header_value,
        content: <DangerousComponent value={item.value} />,
      });
    }
  });

  return (
    <div className="faq">
      <Header as="h2">{info.title.value}</Header>
      <Accordion styled exclusive={false} panels={panels} />
    </div>
  );
};

export default FrequentlyAskedQuestions;
