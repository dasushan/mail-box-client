import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const senderEmailId = useSelector((state) => state.auth.emailId);
  const editorState = useSelector((state) => state.editor.editorState);
  const dispatch = useDispatch();

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  const [loading, setLoading] = useState(true);
  const receiverEmailInputRef = useRef();
  const subjectInputRef = useRef();

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
      const loadedEditorState = EditorState.createWithContent(
        convertFromRaw(rawContent)
      );
      handleEditorChange(loadedEditorState);
    }
  }, []);

  // send email
  const emailSubmitHandler = () => {
    // const content = window.localStorage.getItem('content');
    // console.log(content)
    // console.log(JSON.parse(content))

    const loadedContent = getContent();
    console.log(loadedContent);

    const receiverEmail = receiverEmailInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;
    const document = {
      to: receiverEmail,
      subject: enteredSubject,
      message: loadedContent,
      sender: senderEmailId,
    };
    // const username = email ? email.replace(/[@ .]/g, '') : '';
    const receiver = receiverEmail ? receiverEmail.replace(/[@ .]/g, '') : '';
    const sender = senderEmailId ? senderEmailId.replace(/[@ .]/g, '') : '';
    fetch(
      `https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${receiver}/inbox.json`,
      {
        method: 'POST',
        body: JSON.stringify({ sender: senderEmailId, document }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log(result);
        // fetch(
        //   `https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${sender}/sent.json`,
        //   {
        //     method: 'POST',
        //     body: JSON.stringify({ receiver: receiverEmail, document }),
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // )
        //   .then((response) => {
        //     response.json();
        //   })
        //   .then((result) => {
        //     console.log(result);
        //   });
      });

    fetch(
      `https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${sender}/sent.json`,
      {
        method: 'POST',
        body: JSON.stringify({ receiver: receiverEmail, document }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  // Get textual content of the editor
  const getContent = () => {
    const contentState = editorState.getCurrentContent();
    const blocks = convertToRaw(contentState).blocks;
    const text = [];
    blocks.forEach((block) => {
      text.push(block.text);
    })
    const res = text.join(" ").trim();
    console.log(res)
    return res;
  }

  // Save content to localStorage
  const saveContent = useCallback(
    debounce((content) => {
      window.localStorage.setItem(
        'content',
        JSON.stringify(convertToRaw(content))
      );
    }, 1000),
    []
  );

  // On editor change
  const handleEditorChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    // localStorage
    saveContent(contentState);
    // redux global state
    dispatch(editorActions.onChange(newEditorState));
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
        <input
          type="text"
          placeholder="To"
          ref={receiverEmailInputRef}
          required
        />
      </div>

      <div className="subject">
        <input
          type="text"
          placeholder="Subject"
          ref={subjectInputRef}
          required
        />
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
