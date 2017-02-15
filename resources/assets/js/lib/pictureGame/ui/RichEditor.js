import React, {PropTypes as T} from "react";
import ReactDOM from "react-dom";
import {Editor, EditorState, ContentState, convertFromHTML, convertFromRaw, convertToRaw, RichUtils} from "draft-js";
import RaisedButton from "material-ui/RaisedButton";
import {convertToHTML, convertFromHTML} from "draft-convert";

export default class RichEditor extends React.PureComponent {
    constructor() {
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
        this.saveData = this.saveData.bind(this);
        // Rich example
         this.focus = () => this.refs.editor.focus();
         this.handleKeyCommand = (command) => this._handleKeyCommand(command);
         this.onTab = (e) => this._onTab(e);
         this.toggleBlockType = (type) => this._toggleBlockType(type);
         this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    //******************* Rich example **********************//

    _handleKeyCommand(command) {
          const {editorState} = this.state;
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            this.onChange(newState);
            return true;
          }
          return false;
        }

        _onTab(e) {
             const maxDepth = 4;
             this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
           }

           _toggleBlockType(blockType) {
             this.onChange(
               RichUtils.toggleBlockType(
                 this.state.editorState,
                 blockType
               )
             );
           }

           _toggleInlineStyle(inlineStyle) {
             this.onChange(
               RichUtils.toggleInlineStyle(
                 this.state.editorState,
                 inlineStyle
               )
             );
           }

    //******************* Rich example **********************//

    componentWillReceiveProps (nextProps) {
        if (nextProps.text.length > 0) {
            this.onChange(EditorState.createWithContent(convertFromHTML(nextProps.text)));
        }
    }

    saveData () {
        this.props.saveData(convertToHTML(this.state.editorState.getCurrentContent()));
    }

    render() {
        const {editorState} = this.state;

          // If the user changes block type before entering any text, we can
          // either style the placeholder or hide it. Let's just hide it now.
          let className = 'RichEditor-editor';
          var contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }
        return (
            <div className="RichEditor-root">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={className} onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onTab={this.onTab}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
                <RaisedButton
                    label="Sauvegarder"
                    primary={true}
                    onTouchTap={this.saveData}
                />
            </div>
        );
    }
}

RichEditor.propTypes = {
    text: T.string.isRequired,
    //textChanged: T.func.isRequired,
    saveData: T.func.isRequired
};

// Custom overrides for "code" style.
      const styleMap = {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
      };

      function getBlockStyle(block) {
        switch (block.getType()) {
          case 'blockquote': return 'RichEditor-blockquote';
          default: return null;
        }
      }

      class StyleButton extends React.Component {
              constructor() {
                super();
                this.onToggle = (e) => {
                  e.preventDefault();
                  this.props.onToggle(this.props.style);
                };
              }

              render() {
                let className = 'RichEditor-styleButton';
                if (this.props.active) {
                  className += ' RichEditor-activeButton';
                }

                return (
                  <span className={className} onMouseDown={this.onToggle}>
                    {this.props.label}
                  </span>
                );
              }
            }

            const BLOCK_TYPES = [
                    {label: 'H1', style: 'header-one'},
                    {label: 'H2', style: 'header-two'},
                    {label: 'H3', style: 'header-three'},
                    {label: 'H4', style: 'header-four'},
                    {label: 'H5', style: 'header-five'},
                    {label: 'H6', style: 'header-six'},
                    {label: 'Blockquote', style: 'blockquote'},
                    {label: 'UL', style: 'unordered-list-item'},
                    {label: 'OL', style: 'ordered-list-item'},
                    {label: 'Code Block', style: 'code-block'},
                  ];

                  const BlockStyleControls = (props) => {
                    const {editorState} = props;
                    const selection = editorState.getSelection();
                    const blockType = editorState
                      .getCurrentContent()
                      .getBlockForKey(selection.getStartKey())
                      .getType();

                    return (
                      <div className="RichEditor-controls">
                        {BLOCK_TYPES.map((type) =>
                          <StyleButton
                            key={type.label}
                            active={type.style === blockType}
                            label={type.label}
                            onToggle={props.onToggle}
                            style={type.style}
                          />
                        )}
                      </div>
                    );
                  };

                  var INLINE_STYLES = [
                    {label: 'Bold', style: 'BOLD'},
                    {label: 'Italic', style: 'ITALIC'},
                    {label: 'Underline', style: 'UNDERLINE'},
                    {label: 'Monospace', style: 'CODE'},
                  ];

                  const InlineStyleControls = (props) => {
                    var currentStyle = props.editorState.getCurrentInlineStyle();
                    return (
                      <div className="RichEditor-controls">
                        {INLINE_STYLES.map(type =>
                          <StyleButton
                            key={type.label}
                            active={currentStyle.has(type.style)}
                            label={type.label}
                            onToggle={props.onToggle}
                            style={type.style}
                          />
                        )}
                      </div>
                    );
                  };
