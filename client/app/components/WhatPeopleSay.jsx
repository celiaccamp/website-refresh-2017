import React from 'react';
import { Header, Label, Divider, List } from 'semantic-ui-react';
import Testimonial from './Testimonial';
import DangerousComponent from './DangerousComponent';

const WhatPeopleSay = ({ data }) => {
  const info = data.pages.what_people_say;

  const links = [];
  const testimonials = [];

  Object.keys(info).forEach((key) => {
    const item = info[key];
    if (item.group === 1 && item.type === 'inputandtextarea') {
      links.push(item);
    } else {
      testimonials.push(item);
    }
  });

  return (
    <div className="what-people-say">
      <Header as="h2">{info.title.value}</Header>
      <Header as="h3">The Media</Header>
      <List animated>
        {
          links.map(item => (
            <List.Item key={item.label}>
              <Label
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href={item.header_value}
                tag
              ><DangerousComponent value={item.value} /></Label>
            </List.Item>
          ))
        }
      </List>
      <Header as="h3">Counselors</Header>
      <List>
        <List.Item>
          {/* {
          data.pages.what_people_say.map()
        } */}
          <Testimonial by="A., San Jose, CA">
            {/* <DangerousComponent by={}/> */}
          Camp Celiac was by far the best session of my entire life!
          Witnessing and feeling the connections with the children,
          as well as with the other counselors and volunteers was beyond describable.
          I was literally brought to tears. Next year cannot come fast enough!
        </Testimonial>
        </List.Item>
        <Divider />
        <List.Item>
          <Testimonial by="E., Manhattan Beach, CA">
          Spending a session with people who can relate to you on a whole new level
           is such a wonderful and refreshing feeling to know that you are not alone.
           I didn&#39;t know anyone my age that had celiac before camp, and meeting
           the other counselors was awesome. Everyone has family and friends, but
           attending camp allows you a session to spend with your Celiac family!
        </Testimonial>
        </List.Item>
        <Divider />
        <List.Item>
          <Testimonial by="L., Nashua, NH">
          Being a counselor at Camp Celiac goes way beyond the GF Chocolate Chip cookies
          that are served (which happen to be extraordinary by the way!)
          It&#39;s about being a part of a team that understands the challenges
          of having to be gluten free and checking those at the door. To be a counselor
          at Camp Celiac is simply to know the joy of making a child smile, of teaching
          them a new skill, of watching them learn, of seeing friendships form that
          will last a lifetime and being part of those friendships. Expect to work hard,
          expect to have fun and most of all expect to make memories that will last well
          beyond the summer.
        </Testimonial>
        </List.Item>
        <Divider />
        <List.Item>
          <Testimonial by="J., Paso Robles, CA">
          The kids in my group made the celiac camp better than I imagined it could be.
          I wish that I could work with each child on an ongoing basis.
        </Testimonial>
        </List.Item>
      </List>
    </div>
  );
};
export default WhatPeopleSay;
