import React from 'react';
import { Header, Divider, Embed, Card, Button, Icon } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { trim } from 'lodash';
import { enableUniqueIds } from 'react-html-id';
import HOW_FAR_ILL_GO_PLACEHOLDER from '../assets/images/how-far-ill-go.png';
import CELIAC_CAMP_VIDEO from '../assets/images/celiac-camp-video.png';
import DangerousComponent from './DangerousComponent';

export default class Gallery extends React.PureComponent {
  constructor(props) {
    super(props);
    // enable Unique ID support for this class
    enableUniqueIds(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    const linkGroups = {};

    const info = props.data.pages.gallery;

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
          linkGroups[item.group].links.sort((a, b) => a.order > b.order);
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

    this.state = { width: '0', height: '0', sortedLinkGroups };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { sortedLinkGroups, width } = this.state;

    const info = this.props.data.pages.gallery;

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
        sortedLinkGroups.map(group => (
          <Card fluid className="link-card" key={this.nextUniqueId()}>
            <Card.Content header={group.header} />
            <Card.Content>
              {
                group.links.map((link) => {
                  if (link.count) {
                    return (
                      <div className="spacer" key={this.nextUniqueId()}>
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
                    <div className="spacer" key={this.nextUniqueId()}>
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
                group.sectioned.length ? (
                    // special OR component with two links
                    (group.sectioned.length === 2 && width > 865) ? (
                      <div className="spacer" key={this.nextUniqueId()}>
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
                      </div>
                    ) : (
                      group.sectioned.map(link => (
                        <div className="spacer" key={this.nextUniqueId()}>
                          <Button
                            key={this.nextUniqueId()}
                            as="a"
                            icon="photo"
                            content={<DangerousComponent text value={link.value} />}
                            href={link.header_value}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        </div>
                      ))
                    )
                ) : null
              }
            </Card.Content>
            <Card.Content extra>
              <Icon name="info circle" />
              <DangerousComponent text value={group.description} />
            </Card.Content>
          </Card>
        ))
      }
      </div>
    );
  }
}
