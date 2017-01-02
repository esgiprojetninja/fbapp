import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import HomeCarousel from "./HomeCarousel";
import Gallery from "../container/Gallery";

export default class App extends React.PureComponent {
    render () {
        return (
            <div>
                <AppNavBar title="Pardon Maman: the game"/>
                <HomeCarousel/>
                <Gallery/>
            </div>
        );
    }
}
