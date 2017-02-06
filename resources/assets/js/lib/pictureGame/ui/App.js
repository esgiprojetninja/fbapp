import React, {PropTypes as T} from "react";
import HomeCarousel from "../container/HomeCarousel";
import SubMenu from "../container/SubMenu";
import Gallery from "../container/Gallery";
import AppNavBar from "../container/AppNavBar";

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
