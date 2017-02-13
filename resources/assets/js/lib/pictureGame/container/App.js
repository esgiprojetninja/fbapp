import {connect} from "react-redux";
import {
    getUISettings
} from "../actions/contestActions";
import AppComponent from "../ui/App";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getUISettings());
        }
    };
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

export default App;
