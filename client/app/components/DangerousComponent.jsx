import React from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { trim } from 'lodash';
import { withRouter } from 'react-router-dom';
import { enableUniqueIds } from 'react-html-id';

const ReactDOMServer = require('react-dom/server');

class DangerousComponent extends React.Component {

  constructor(props) {
    super(props);

    // enable Unique ID support for this class
    enableUniqueIds(this);

    let html = stateToHTML(convertFromRaw(JSON.parse(props.value)));

    const linkList = [];

    // check for celiac camp link and change it to internal
    const re = /<a [^<>]*?(?=href)href="http:\/{2}w{3}\.celiaccamp\.com\/([-a-z]*)[^<>]*?>(.*?)<\/a>/;
    while (re.test(html)) {
      re.lastIndex = 0;
      const match = re.exec(html);
      const id = this.nextUniqueId();
      const link = ReactDOMServer.renderToStaticMarkup(
        <a id={id} style={{ cursor: 'pointer' }}>{match[2]}</a>,
      );
      // add id and href to link list to have event listener set
      linkList.push({ id, to: match[1] });
      // replace html with new link
      html = html.replace(match[0], link);
    }
    this.state = { linkList, html };
  }

  componentDidMount() {
    // add listeners to link clicks
    this.state.linkList.forEach((link) => {
      const ref = document.getElementById(link.id);
      ref.addEventListener(
        'click', () => this.changeBrowserLocation(link.to, ref),
      );
    });
  }

  changeBrowserLocation = (location, ref) => {
    ref.removeEventListener('click', this.changeBrowserLocation);
    this.props.history.push(location);
  }

  render() {
    const { text, checkEmpty } = this.props;
    let { html } = this.state;

    // empty text areas sometimes have a stray <br> tag - remove it
    if (checkEmpty) {
      html = html.replace(/^(<p>\s?<\/?br\/?>\s?<\/p>)$/gm, '');
    }

    if (text) {
      return (
        <span>{trim(html.replace(/^(<p\n?>)|(<\s*\/p>)$/gm, ''))}</span>
      );
    }

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    );
  }
}

export default withRouter(DangerousComponent);
