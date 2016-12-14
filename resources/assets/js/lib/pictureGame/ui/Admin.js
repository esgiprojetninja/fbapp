import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";

export default class Admin extends React.PureComponent {
    render () {
        return (
            <div>
                <AppNavBar title="Admin"/>
            </div>
        );
    }
}
