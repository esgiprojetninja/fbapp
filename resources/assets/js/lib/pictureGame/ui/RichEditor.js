import React, {PropTypes as T} from "react";
import ReactDOM from "react-dom";
import {Editor, EditorState, ContentState, convertFromHTML, convertFromRaw, convertToRaw} from "draft-js";
import draftToHtml from "draftjs-to-html";
import {stateFromHTML} from "draft-js-import-html";
import RaisedButton from "material-ui/RaisedButton";
import {convertToHTML, convertFromHTML} from "draft-convert";

export default class RichEditor extends React.PureComponent {
    constructor() {
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
        this.saveData = this.saveData.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.text.length > 0) {
            this.onChange(EditorState.createWithContent(convertFromHTML(nextProps.text)));
        }
    }

    saveData () {
        //const rawState = convertToRaw(this.state.editorState.getCurrentContent());
        this.props.saveData(convertToHTML(this.state.editorState.getCurrentContent()));
    }

    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
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
