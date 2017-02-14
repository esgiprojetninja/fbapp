import React, {PropTypes as T} from "react";
import ReactDOM from "react-dom";
import {Editor, EditorState, ContentState, convertFromHTML, convertToRaw} from "draft-js";
import draftToHtml from "draftjs-to-html";
import RaisedButton from "material-ui/RaisedButton";

export default class RichEditor extends React.PureComponent {
    constructor() {
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
        this.saveData = this.saveData.bind(this);
    }

    saveData (editorState) {
        const rawState = convertToRaw(this.state.editorState.getCurrentContent());
        this.props.saveData(draftToHtml(rawState));
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
