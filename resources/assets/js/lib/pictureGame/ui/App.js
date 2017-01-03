import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import HomeCarousel from "./HomeCarousel";
import SubMenu from "./SubMenu";
import Gallery from "../container/Gallery";

export default class App extends React.PureComponent {
    render () {
        return (
            <div className="full-height">
                <AppNavBar title="Pardon Maman: the game"/>
                <section className="full-height">
                    <HomeCarousel/>
                    <SubMenu/>
                </section>
                <section className="gallery-wrapper">
                    <Gallery/>
                </section>
            </div>
        );
    }
}
