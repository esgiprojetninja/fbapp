import React, {PropTypes as T} from "react";
import HomeCarousel from "../container/HomeCarousel";
import SubMenu from "../container/SubMenu";
import Gallery from "../container/Gallery";
import AppNavBar from "../container/AppNavBar";
import screenfull from "screenfull";
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';

export default class App extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    fullScreenTemplate() {
        return (
            <Fullscreen
                onClick={
                    () => {
                        if (screenfull.enabled) {
                            screenfull.toggle();
                        }
                    }
                }
                className="full-screen"
            />
        );
    }

    renderFullscreen() {
        if(this.props.contest.uisettings.enable_fullscreen || this.props.contest.uisettings.enable_fullscreen === undefined){
            return this.fullScreenTemplate();
        }
    }

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
                {this.renderFullscreen()};
            </div>
        );
    }
}
