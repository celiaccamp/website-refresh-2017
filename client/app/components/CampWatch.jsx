import React from 'react';
import { Header, Divider, Button, Loader } from 'semantic-ui-react';
import PACKING_LIST from '../assets/pdfs/packing_list.pdf';
import CAMP_MAP from '../assets/pdfs/camp_arroyo_map.pdf';
import DIRECTIONS from '../assets/pdfs/camp_arroyo_directions.pdf';
import DangerousComponent from './DangerousComponent';

const CampWatch = ({ data }) => {
  if (!data) return <Loader active />;
  const info = data.pages.camp_watch;
  return (
    <div className="camp-watch">
      <Header as="h2">
        {info.title.value}
      </Header>
      <DangerousComponent value={info.content.value} />
      <br />
      <Divider />
      <Button fluid as="a" href={PACKING_LIST} target="_blank" rel="noopener noreferrer">Packing List</Button>
      <Divider hidden />
      <Button fluid as="a" href={CAMP_MAP} target="_blank" rel="noopener noreferrer">Camp Map</Button>
      <Divider hidden />
      <Button fluid as="a" href={DIRECTIONS} target="_blank" rel="noopener noreferrer">Directions</Button>
    </div>
  );
};

export default CampWatch;
