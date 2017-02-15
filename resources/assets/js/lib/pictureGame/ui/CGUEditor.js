import React, {PropTypes as T} from "react";

import RichEditor from "./RichEditor";

export default class CGUEditor extends React.PureComponent {

    componentWillMount () {
        this.props.onReady();
    }

    render () {
        const divStyle = {padding: "15px"}
        return (
            <div style={divStyle}>
                <div>
                    <h1>CGU</h1>
                    <RichEditor
                        text={this.props.cgu}
                        saveData={this.props.saveCGU}
                    />
                </div>
                <div>
                    <h1>Politique de confidentialité</h1>
                    <RichEditor
                        text={this.props.privacy_policy}
                        saveData={this.props.savePrivacyPolicy}
                    />
                </div>
                <div>
                    <h1>Règles du jeu</h1>
                    <RichEditor
                        text={this.props.rules}
                        saveData={this.props.saveRules}
                    />
                </div>
            </div>
        );
    }
}

CGUEditor.propTypes = {
    onReady: T.func.isRequired,
    cgu: T.string.isRequired,
    privacy_policy: T.string.isRequired,
    rules: T.string.isRequired,
    saveCGU: T.func.isRequired,
    savePrivacyPolicy: T.func.isRequired,
    saveRules: T.func.isRequired
};
