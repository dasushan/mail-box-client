import React from 'react';
import {  EditorState, RichUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor'
import { Button } from 'react-bootstrap';

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onChange = (editorState) => {
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
  render() {
    return (
      <div className="container border border-info border-1 p-3 bg-dark">
        <div className='bg-light '>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
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
        </div>
      </div>
    );
  }
}

export default PageContainer;
