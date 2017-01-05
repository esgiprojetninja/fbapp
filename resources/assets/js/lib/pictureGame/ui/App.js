import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import HomeCarousel from "../container/HomeCarousel";
import SubMenu from "./SubMenu";
import Gallery from "../container/Gallery";

export default class App extends React.PureComponent {
    render () {
        return (
            <div className="full-height">
                <AppNavBar title="Pardon Maman: the game"/>
                <section>
                    <HomeCarousel/>
                    <SubMenu/>
                </section>
                <section>
                    <Gallery/>
                </section>
            </div>
        );
    }
}
