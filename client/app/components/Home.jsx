/*
    ./client/components/Home.jsx
*/
import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Header, Loader } from 'semantic-ui-react';
import DangerousComponent from './DangerousComponent';

const Home = ({ data }) => {
  if (!data) return <Loader active />;

  // images for automatic carousel
  const images = [];
  const requireContext = require.context('../assets/images/home-carousel', true, /^\.\/.*\.jpg$/);
  requireContext.keys().map(requireContext).forEach((src) => {
    images.push(
      {
        original: src,
      },
    );
  });

  return (
    <div>
      <span>
        <ImageGallery
          items={images}
          slideInterval={2000}
          showThumbnails={false}
          showBullets
          autoPlay
          showPlayButton={false}
        />
      </span>
      <Header as="h2">{data.pages.home.title.value}</Header>
      <DangerousComponent value={data.pages.home.content.value} />
    </div>
  );
};

export default Home;
