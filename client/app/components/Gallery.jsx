import React from 'react';
import { Header, Divider, Embed, Card, Button, Icon, Loader } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { trim } from 'lodash';
import HOW_FAR_ILL_GO_PLACEHOLDER from '../assets/images/how-far-ill-go.png';
import CELIAC_CAMP_VIDEO from '../assets/images/celiac-camp-video.png';
import DangerousComponent from './DangerousComponent';

const Gallery = ({ data }) => {
  if (!data) return <Loader active />;

  const info = data.pages.gallery;

  // images for automatic carousel
  const photos2017 = [];
  const requireContext = require.context('../assets/images/2017-photo-highlights', true, /^\.\/.*\.JPG$/);
  requireContext.keys().map(requireContext).forEach((src) => {
    photos2017.push(
      {
        original: src,
      },
    );
  });

  const linkGroups = {};

  // sort out links into groups
  Object.keys(info).forEach((key) => {
    const item = info[key];
    // valid links are between 1 and max integer
    if (item.group > 1 && item.group < Number.MAX_SAFE_INTEGER) {
      const group = linkGroups[item.group];
      if (!group) {
        linkGroups[item.group] = { links: [], sectioned: [], group: item.group };
      }
      if (item.purpose === 'container') {
        linkGroups[item.group].description = item.value;
        linkGroups[item.group].header = item.header_value;
      } else if (item.type === 'inputandtextarea') {
        // otherwise it is a link if it's and input & text area
        const re = /{{(\w+):\s?([a-zA-Z0-9]+)}}$/;
        const results = re.exec(item.header_value);
        // if there is a match set specified field
        if (results) {
          item[results[1]] = results[2];
          item.header_value = trim(item.header_value.replace(results[0], ''));
          if (results[1] === 'session') {
            linkGroups[item.group].sectioned.push(item);
            linkGroups[item.group].sectioned.sort((a, b) => {
              if (a.section !== undefined && a.section < b.section) {
                return -1;
              }
              if (b.section !== undefined && b.section < a.section) {
                return 1;
              }
              return 0;
            });
            return;
          }
        }
        linkGroups[item.group].links.push(item);
      }
    }
  });

  // listGroups sorted by group
  const sortedLinkGroups = [];
  Object.keys(linkGroups).forEach((key) => {
    const group = linkGroups[key];
    sortedLinkGroups.push(group);
  });
  sortedLinkGroups.sort((a, b) => a.group > b.group);

  return (
    <div className="gallery">
      <Header as="h2">{info.title.value}</Header>
      <DangerousComponent value={info.text_section_1.value} />
      <Divider />
      <DangerousComponent value={info.text_section_2.value} />
      <br />
      <ImageGallery
        items={photos2017}
        showThumbnails={false}
        showBullets
        showPlayButton
      />
      <br />
      <Divider />
      <DangerousComponent value={info.text_section_3.value} />
      <br />
      <Embed
        id="FAdpiBcOnc0"
        source="youtube"
        placeholder={HOW_FAR_ILL_GO_PLACEHOLDER}
      />
      <br />
      <Divider />
      <DangerousComponent value={info.text_section_4.value} />
      <br />
      <Embed
        id="NzGd8JoBYeA"
        source="youtube"
        placeholder={CELIAC_CAMP_VIDEO}
      />
      {
        // TODO: fix appearance on mobile
        sortedLinkGroups.map((group, i) => (
          <Card fluid className="link-card" key={i}>
            <Card.Content header={group.header} />
            <Card.Content>
              {
                group.links.map((link) => {
                  if (link.count) {
                    return (
                      <div className="spacer" key={link.label}>
                        <Button
                          icon="image"
                          as="a"
                          label={{ basic: true, content: link.count }}
                          labelPosition="right"
                          content={<DangerousComponent text value={link.value} />}
                          href={link.header_value}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      </div>
                    );
                  }
                  return (
                    <div className="spacer" key={i}>
                      <Button
                        as="a"
                        icon="linkify"
                        content={<DangerousComponent text value={link.value} />}
                        href={link.header_value}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    </div>
                  );
                })
              }
              {
                group.sectioned.length && (
                  <div className="spacer" key={i}>
                    {
                      // special OR component with two links
                      group.sectioned.length === 2 ? (
                        <Button.Group>
                          <Button
                            as="a"
                            href={group.sectioned[0].header_value}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Icon name="photo" />
                            <DangerousComponent text value={group.sectioned[0].value} />
                          </Button>
                          <Button.Or />
                          <Button
                            as="a"
                            href={group.sectioned[1].header_value}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Icon name="photo" />
                            <DangerousComponent text value={group.sectioned[1].value} />
                          </Button>
                        </Button.Group>
                      ) : (
                        <Button.Group>
                          {
                            group.sectioned.map(link => (
                              <Button
                                as="a"
                                href={link.header_value}
                                rel="noopener noreferrer"
                                target="_blank"
                                key={link.label}
                              >
                                <Icon name="photo" />
                                <DangerousComponent text value={link.value} />
                              </Button>
                            ))
                          }
                        </Button.Group>
                      )
                    }
                  </div>
                )
              }
            </Card.Content>
            <Card.Content extra>
              <Icon name="info circle" />
              <DangerousComponent text value={group.description} />
            </Card.Content>
          </Card>
        ))
      }

      {/* photoLinks.map((section, k) => (
          <Card fluid className="link-card" key={k}>
            <Card.Content header={`Camp Celiac ${section.year} Links`} />
            <Card.Content>
              {
                section.links.map((link, i) => {
                  if (link.number) {
                    return (
                      <div className="spacer" key={i}>
                        <Button
                          icon="image"
                          as="a"
                          label={{ basic: true, content: link.number }}
                          labelPosition="right"
                          content={link.title}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      </div>
                    );
                  } else if (Array.isArray(link)) {
                    return (
                      <div className="spacer" key={i}>
                        {
                          link.length === 2 ? (
                            <Button.Group>
                              <Button
                                as="a"
                                href={link[0].url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <Icon name="photo" />
                                {link[0].title}
                              </Button>
                              <Button.Or />
                              <Button
                                as="a"
                                href={link[1].url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <Icon name="photo" />
                                {link[1].title}
                              </Button>
                            </Button.Group>
                          ) : (
                            <Button.Group>
                              { link.map((item, j) => (
                                <Button
                                  key={j + section.links.length}
                                  as="a"
                                  href={item.url}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <Icon name="photo" />
                                  {item.title}
                                </Button>
                              ))
                            }
                            </Button.Group>
                          )
                        }
                      </div>
                    );
                  }
                  return (
                    <div className="spacer" key={i}>
                      <Button
                        as="a"
                        content={link.title}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    </div>
                  );
                })
              }
            </Card.Content>
            <Card.Content extra>
              <Icon name="info circle" />
              {section.description}
            </Card.Content>
          </Card>
        ))
      } */}
    </div>
  );
};

export default Gallery;
