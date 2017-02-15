import React, {PropTypes as T} from "react";

import AppNavBar from "../container/AppNavBar";
import {Grid, Row, Col} from "react-bootstrap";

export default class Legals extends React.PureComponent {

    componentWillMount () {
        this.props.onReady();
    }

    render () {
        return (
            <div className="full-height">
                <AppNavBar title="Pardon Maman" noToggle={true}/>
                <Col md={8} mdOffset={2}>
                    <section style={{marginTop: "35px"}}>
                        <h1 style={{textAlign: "center"}} id="rules">Règles du jeu</h1>
                        <div dangerouslySetInnerHTML={{__html: this.props.rules}}></div>
                    </section>
                    <section style={{marginTop: "35px"}}>
                        <h1 style={{textAlign: "center"}} id="cgu">CGU</h1>
                        <div dangerouslySetInnerHTML={{__html: this.props.cgu}}></div>
                    </section>
                    <section style={{marginTop: "35px"}}>
                        <h1 style={{textAlign: "center"}} id="privacy">Politique de confidentialité</h1>
                        <div dangerouslySetInnerHTML={{__html: this.props.privacy_policy}}></div>
                    </section>
                </Col>
            </div>
        );
    }
}

Legals.propTypes = {
    cgu: T.string.isRequired,
    privacy_policy: T.string.isRequired,
    rules: T.string.isRequired,
    onReady: T.func.isRequired
};
