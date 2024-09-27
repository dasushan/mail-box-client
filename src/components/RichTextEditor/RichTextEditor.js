import React, { useEffect, useState, useCallback } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import '@draft-js-plugins/emoji/lib/plugin.css';
import createHighlightPlugin from './plugins/highlightPlugin';
import { Button } from 'react-bootstrap';
import debounce from 'lodash/debounce';
import './RichTextEditor.css';

import { editorActions } from '../../store/editor-slice';
import { useSelector, useDispatch } from 'react-redux';

// Create an instance of the emoji plugin
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

// generate highlight plugin
const highlightPlugin = createHighlightPlugin();

const RichTextEditor = () => {
  const editorState = useSelector((state) => state.editor.editorState);
  const dispatch = useDispatch();

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  const [loading, setLoading] = useState(true);

  // Fetch content from backend when component mount
  // useEffect(() => {
  //   fetch(
  //     'https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/content.json',
  //     {
  //       method: 'GET',
  //     }
  //   )
  //     .then((val) => {
  //       val.json();
  //     })
  //     .then((rawContent) => {
  //       if (rawContent) {
  //         setEditorState(
  //           EditorState.createWithContent(convertFromRaw(rawContent))
  //         );
  //       } else {
  //         setEditorState(EditorState.createEmpty());
  //       }
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // Fetch content from localStorage
  useEffect(() => {
    const data = localStorage.getItem('content');
    if (data) {
      const rawContent = JSON.parse(data);
      console.log(rawContent);
      const loadedEditorState = EditorState.createWithContent(
        convertFromRaw(rawContent)
      );
      handleEditorChange(loadedEditorState);
    }
  }, []); 

  // Save content to backend
  const saveContent = useCallback(
    debounce((content) => {
      // fetch(
      //   'https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/content.json',
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({ content: convertToRaw(content) }),
      //     headers: new Headers({
      //       'Content-Type': 'application/json',
      //     }),
      //   }
      // );
      window.localStorage.setItem(
        'content',
        JSON.stringify(convertToRaw(content))
      );
    }, 1000),
    []
  );

  //
  const emailSubmitHandler = () => {
    const content = window.localStorage.getItem('content');
    const loadedContent = editorState.getCurrentContent();
    console.log(convertToRaw(loadedContent))
    console.log(content)
    console.log(JSON.parse(content))
  };
  // On editor change
  // const onChange = (newEditorState) => {
  //   const contentState = newEditorState.getCurrentContent();
  //   saveContent(contentState);
  //   // setEditorState(newEditorState);
  //   dispatch(onChange(newEditorState))
  // };

  const handleEditorChange = (newEditorState) => {
    dispatch(editorActions.onChange(newEditorState));
    const contentState = newEditorState.getCurrentContent();
    saveContent(contentState);
  };

  // Handle key commands
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Toggling Inline Styles
  const toggleInlineStyle = (style) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    handleEditorChange(newState);
  };

  // Toggling Code Block
  const onToggleCode = () => {
    const newState = RichUtils.toggleCode(editorState);
    handleEditorChange(newState);
  };

  // if (loading) {
  //   return <h3>Loading ...</h3>;
  // }

  return (
    <div className="container mb-1">
      <div className="address">
        <input type="text" placeholder="To" />
      </div>

      <div className="subject">
        <input type="text" placeholder="Subject" />
      </div>
      <div className=" wrapperclass">
        <div className="editorclass">
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
            plugins={[emojiPlugin, highlightPlugin]}
          />
          <EmojiSuggestions />
        </div>

        <div className="controls">
          <Button className="m-1" onClick={emailSubmitHandler}>
            Send
          </Button>
          <Button
            onClick={() => toggleInlineStyle('UNDERLINE')}
            className="m-1"
            variant="outline-dark"
          >
            {' '}
            U
          </Button>
          <Button
            onClick={() => toggleInlineStyle('BOLD')}
            className="m-1"
            variant="outline-dark"
          >
            <b>B</b>
          </Button>
          <Button
            onClick={() => toggleInlineStyle('ITALIC')}
            className="m-1"
            variant="outline-dark"
          >
            <em>I</em>
          </Button>
          <Button
            onClick={() => toggleInlineStyle('HIGHLIGHT')}
            className="m-1"
            variant="outline-dark"
          >
            <span style={{ background: 'yellow', color: 'black' }}>H</span>
          </Button>
          <Button onClick={onToggleCode} variant="outline-dark">
            Code Block
          </Button>
        </div>
        <EmojiSelect />
      </div>
    </div>
  );
};

export default RichTextEditor;
