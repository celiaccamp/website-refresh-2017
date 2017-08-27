import React from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { trim } from 'lodash';
import { Link } from 'react-router-dom';

const DangerousComponent = ({ value, text, checkEmpty }) => {
  let html = stateToHTML(convertFromRaw(JSON.parse(value)));

  // check for celiac camp link and change it to internal
  if (html) {
    const re = /<a href="http:\/{2}w{3}\.celiaccamp\.com\/([a-z]*).*">(.*)<\/a>/;
    const match = re.exec(html);
    if (match) {
      html = html.replace(match[0], <Link to={match[1]}>{match[2]}</Link>);
      console.log(html);
    }
  }
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
};

export default DangerousComponent;
