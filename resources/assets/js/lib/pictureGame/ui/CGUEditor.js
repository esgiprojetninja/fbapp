import React, {PropTypes as T} from "react";

import RichEditor from "./RichEditor";

export default class CGUEditor extends React.PureComponent {
    componentWillMount () {
        this.props.onReady();
    }

    render () {
        return (
            <div>
                <h1>CGU</h1>
                <RichEditor
                    text={this.props.legal.CGU}
                    //textChanged={this.props.cguChanged}
                    saveData={this.props.saveCGU}
                />
            </div>

        );
    }
}

CGUEditor.propTypes = {
    onReady: T.func.isRequired,
    legal: T.object.isRequired,
    //cguChanged: T.func.isRequired,
    saveCGU: T.func.isRequired
};
