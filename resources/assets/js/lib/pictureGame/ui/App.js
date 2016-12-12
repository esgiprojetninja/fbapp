import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import Gallery from "../container/Gallery";

export default class App extends React.PureComponent {
    render () {
        return (
            <div>
                <AppNavBar />
                <Gallery />
            </div>
        );
    }
}
