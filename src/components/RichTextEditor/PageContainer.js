import React, { Component } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
// It is important to import the Editor which accepts plugins
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import '@draft-js-plugins/emoji/lib/plugin.css';
import createHighlightPlugin from './plugins/highlightPlugin';
import { Button } from 'react-bootstrap';

//Creates an Instance. At this step, a configuration object can be passed in as an argument
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

// The Editor accepts an array of plugins. In this case, only the emojiPlugin is
// passed in, although it is possible to pass in multiple plugins.
// The EmojiSuggestions component is internally connected to the editor and will
// be updated & positioned once the user starts the autocompletion with a colon.
// The EmojiSelect component also is internally connected to the editor. He add
// a button which allows open emoji select popup.

// generate the plugin
const highlightPlugin = createHighlightPlugin();

class PageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const content = window.localStorage.getItem('content');
    console.log(content)

    if(content){
        this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else{
        this.state.editorState = EditorState.createEmpty();
    }
  }

  saveContent = (content) => {
    window.localStorage.setItem(
      'content',
      JSON.stringify(convertToRaw(content))
    );
  };

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  };
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  onUnderlineClick = () => {
    const newState = RichUtils.toggleInlineStyle(
      this.state.editorState,
      'UNDERLINE'
    );
    this.onChange(newState);
  };

  onBoldClick = () => {
    const newState = RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    );
    this.onChange(newState);
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
    );
  };

  onHighlight = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT')
    );
  };

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  };

  render() {
    return (
      <div className="container border border-info border-1 p-3 bg-dark">
        <div className="bg-light ">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            plugins={[emojiPlugin, highlightPlugin]}
          />
          <EmojiSuggestions />
        </div>

        <div className="controls">
          <Button onClick={this.onUnderlineClick} className="m-1">
            U
          </Button>
          <Button onClick={this.onBoldClick} className="m-1">
            <b>B</b>
          </Button>
          <Button onClick={this.onItalicClick} className="m-1">
            <em>I</em>
          </Button>
          <Button onClick={this.onHighlight} className="m-1">
            <span style={{ background: 'yellow', color: 'black' }}>H</span>
          </Button>
          <Button onClick={this.onToggleCode}>Code Block</Button>
          <div>
            <EmojiSelect />
          </div>
        </div>
      </div>
    );
  }
}

export default PageContainer;
