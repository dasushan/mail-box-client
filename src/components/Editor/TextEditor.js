import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './TextEditor.css';
import { Button } from 'react-bootstrap';
const TextEditor = () => {
  // Controlled state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Handle the change in editor state
  const onEditorStateChange = (newState) => {
    setEditorState(newState)
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    //Get the editor's raw content
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    console.log('Editor Content:', rawContentState)
  }
  console.log(editorState);
  return (
    <div>
      <div className="address-wrapper">
        <span>To</span>
        <div className="address">
          <input type="text" placeholder="To" />
        </div>
      </div>

      <div className="subject">
        <input type="text" placeholder="subject" />
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: [
            'link',
            'emoji',
            'inline',
            'fontSize',
            'remove',
            'history',
            'fontFamily',
            'colorPicker',
            'blockType',
          ],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline'],
          },
        }}
      />
      <Button type=' submit 'onClick={handleSubmit}>Send</Button>
    </div>
  );
};

export default TextEditor;
