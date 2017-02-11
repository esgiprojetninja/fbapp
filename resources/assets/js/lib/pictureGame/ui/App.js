import React, {PropTypes as T} from "react";
import HomeCarousel from "../container/HomeCarousel";
import SubMenu from "../container/SubMenu";
import Gallery from "../container/Gallery";
import AppNavBar from "../container/AppNavBar";
import screenfull from "screenfull";
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import Spinner from "./Spinner";

export default class App extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount () {
        this.props.onReady();
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
        if(this.props.contest.uisettings.enable_fullscreen){
            return this.fullScreenTemplate();
        }
    }

    render () {
        if (!this.props.contest.uisettings.main_color) {
            return (
                <Spinner />
            );
        }
        return (
            <div className="full-height">
                <AppNavBar title="Pardon Maman: the game"/>
                <section>
                    <HomeCarousel />
                    <SubMenu />
                </section>
                <section>
                    <Gallery />
                </section>
                {this.renderFullscreen()};
            </div>
        );
    }
}
