/*
    ./client/components/Config.jsx
    util functions used through
*/
import React from 'react';
import { Form, Input, Header, Button, Icon, Modal, Divider, Popup } from 'semantic-ui-react';
import { Editor } from 'react-draft-wysiwyg';
import AddComponentModal from './AddComponentModal';
import AddGroupContainer from './AddGroupContainer';

// returns a react component with appropriate markup based on type field
export function getTypeComponent(key) {
  const { editorStates, editedData } = this.state;
  const info = editedData[key];
  switch (info.type) {
    case 'input':
      // basic input
      return (
        <Form.Field key={key}>
          <label htmlFor={key}>
            {info.label}
            {info.deletable && <span><Icon
              name="remove"
              onClick={() => this.handleDelete(key, info.label)}
              style={{ cursor: 'pointer' }}
            /></span>}
          </label>
          <Input
            value={info.value}
            onChange={e => this.setNestedEditField(key, e.target.value)}
          />
        </Form.Field>
      );
    case 'textarea':
      // basic wysiwig field
      return (
        /*  TODO: add focus effect for text area found
        here: https://github.com/Semantic-Org/Semantic-UI-CSS/blob/master/components/form.css */
        <Form.Field key={key}>
          <label htmlFor={key}>
            {info.label}
            {info.deletable && <span><Icon
              name="remove"
              onClick={() => this.handleDelete(key, info.label)}
              style={{ cursor: 'pointer' }}
            /></span>}
          </label>
          <Editor
            id={key}
            editorState={editorStates[key]}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            onEditorStateChange={newState => this.setNestedEditorState(key, newState)}
            onContentStateChange={
              rawContent => this.setNestedEditField(key, JSON.stringify(rawContent))
            }
            toolbar={{
              options: ['inline', 'blockType', 'list', 'colorPicker', 'link', 'emoji', 'history'],
            }}
          />
        </Form.Field>
      );
    case 'inputandtextarea':
      // contains a label (input) and description (wysiwig field)
      return (
        <Form.Field key={key}>
          <Form.Field>
            <label htmlFor={key}>
              {info.label}
              &nbsp;
              {info.deletable && <span><Icon
                name="remove"
                onClick={() => this.handleDelete(key, info.label)}
                style={{ cursor: 'pointer' }}
              /></span>}
            </label>
            <Input
              value={info.header_value}
              onChange={e => this.setNestedEditField(key, e.target.value, 'header_value')}
            />
          </Form.Field>
          <Form.Field>
            <Editor
              editorState={editorStates[key]}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              onEditorStateChange={newState => this.setNestedEditorState(key, newState)}
              onContentStateChange={
                rawContent => this.setNestedEditField(key, JSON.stringify(rawContent))
              }
              toolbar={{
                options: ['inline', 'blockType', 'list', 'colorPicker', 'link', 'emoji', 'history'],
              }}
            />
          </Form.Field>
        </Form.Field>
      );
    case 'addinputandtextarea':
      // renders a component to add "inputandtextarea" type items
      return (
        <Form.Field key={key}>
          <AddComponentModal
            header={info.label}
            create={this.addInputAndTextArea}
            exists={this.labelExists}
            group={info.group}
            delete={() => this.handleDelete(key, info.label)}
            deletable={info.deletable}
          >
            <Button.Content visible>{info.label}</Button.Content>
            <Button.Content hidden>
              <Icon name="plus" />
            </Button.Content>
          </AddComponentModal>
        </Form.Field>
      );
    case 'divider':
      return (
        <Divider
          key={key}
          horizontal
          className="link-group-divider"
        >{
            info.deletable ? (
              <Popup
                hoverable
                position="top center"
                trigger={<span style={{ cursor: 'pointer' }}>{info.label}</span>}
              >
                <Button icon="remove" onClick={() => this.handleDelete(key, info.label)} />
              </Popup>
            ) : info.label
          }
        </Divider>
      );
    case 'addgroupcontainer':
      // renders a component to add a link group
      return (
        <Form.Field key={key}>
          <Divider />
          <AddGroupContainer
            header={info.label}
            create={this.addGroupContainer}
          >
            <Button.Content visible>{info.label}</Button.Content>
            <Button.Content hidden>
              <Icon name="edit" />
            </Button.Content>
          </AddGroupContainer>
        </Form.Field>
      );
    case 'twoinputandtextarea':
      // contains a two labels (inputs) and description (wysiwig field)
      return (
        <Form.Field key={key}>
          <Form.Field>
            <label htmlFor={key}>
              {info.label}
              &nbsp;
              {info.deletable && <span><Icon
                name="remove"
                onClick={() => this.handleDelete(key, info.label)}
                style={{ cursor: 'pointer' }}
              /></span>}
            </label>
            <Input
              value={info.header_value}
              onChange={e => this.setNestedEditField(key, e.target.value, 'header_value')}
            />
          </Form.Field>
          <Form.Field>
            <Input
              value={info.content}
              onChange={e => this.setNestedEditField(key, e.target.value, 'content')}
            />
          </Form.Field>
          <Form.Field>
            <Editor
              editorState={editorStates[key]}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              onEditorStateChange={newState => this.setNestedEditorState(key, newState)}
              onContentStateChange={
                rawContent => this.setNestedEditField(key, JSON.stringify(rawContent))
              }
              toolbar={{
                options: ['inline', 'blockType', 'list', 'colorPicker', 'link', 'emoji', 'history'],
              }}
            />
          </Form.Field>
        </Form.Field>
      );
    case 'addtwoinputandtextarea':
      // renders a component to add "twoinputandtextarea" type items
      return (
        <Form.Field key={key}>
          <AddComponentModal
            header={info.label}
            create={this.addTwoInputAndTextArea}
            exists={this.labelExists}
            group={info.group}
            delete={() => this.handleDelete(key, info.label)}
            deletable={info.deletable}
          >
            <Button.Content visible>{info.label}</Button.Content>
            <Button.Content hidden>
              <Icon name="plus" />
            </Button.Content>
          </AddComponentModal>
        </Form.Field>
      );
    default:
      throw Error(`Unrecognized component type "${info.type}" in getTypeComponent() function.`);
  }
}

// empty Draft.js text area (with entity state, etc.) so as to not throw errors
export const emptyDraft = '{"entityMap":{},"blocks":[{"key":"48v9r","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}';

// sorts keys in-place and also returns sorted list
export const sortKeys = (keys, data) => {
  // sort keys by associated group then order number
  keys.sort((a, b) => {
    const aGroup = data[a].group;
    const bGroup = data[b].group;
    const aOrder = data[a].order;
    const bOrder = data[b].order;
    // do not use !group in check to allow 0-indexed groups, orders, etc.
    if (aGroup !== undefined && aGroup < bGroup) {
      return -1;
    }
    if (bGroup !== undefined && bGroup < aGroup) {
      return 1;
    }
    if (aOrder !== undefined && aOrder < bOrder) {
      return -1;
    }
    if (bOrder !== undefined && bOrder < aOrder) {
      return 1;
    }
    throw Error(`Keys ${a} and ${b} have identical groups and orders. Check for undefined or identical values.`);
  });
  return keys;
};

// arrays of links to photobooth pitures, shutterfly, etc.
export const PHOTO_LINKS = {
  links2017: [
    {
      title: 'Session Pictures',
      url: 'https://celiaccamp2017.shutterfly.com/',
      number: 5361,
    },
    [
      {
        title: 'Session 1 Photobooth Pictures',
        url: 'https://sayyaphotobooth.smugmug.com/Photobooth-2017/Camp-Celiac-2017-0718/n-FdGcZm/',
      },
      {
        title: 'Session 2 Photobooth Pictures',
        url: 'https://sayyaphotobooth.smugmug.com/Photobooth-2017/Camp-Celiac-2017-0721/n-n8PzZD/',
      },
    ],
  ],
  links2016: [
    {
      title: 'Session Pictures',
      url: 'https://celiaccamp2016.shutterfly.com/',
      number: 5909,
    },
    [
      {
        title: 'Session 1 Photobooth Pictures',
        url: 'https://sayyaphotobooth.smugmug.com/Photobooth-2016/20160713-Camp-Celiac/n-bZzPQq/',
      },
      {
        title: 'Session 2 Photobooth Pictures',
        url: 'https://sayyaphotobooth.smugmug.com/Photobooth-2016/20160716-Camp-Celiac/n-tmHH3F/',
      },
    ],
  ],
  links2015: [
    {
      title: 'Session Pictures',
      url: 'https://celiaccamp2015.shutterfly.com/',
      number: 4315,
    },
    [
      {
        title: 'Session 1 Photobooth Pictures',
        url: 'https://sayyaphotobooth.smugmug.com/Photobooth/Camp-Celiac-Day-2/n-P7hDtx/',
      },
      {
        title: 'Session 2 Photobooth Pictures',
        url: 'https://sayyaphotobooth.smugmug.com/Photobooth/Camp-Celiac-Day-2/n-P7hDtx/',
      },
    ],
  ],
};
