import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Router, Route, browserHistory } from 'react-router';
import { render } from "react-dom";
import { Provider } from "react-redux";
import MainReducer from "./reducers/main";
import AppNavBar from "./ui/AppNavBar";
import App from "./container/App";
import Admin from "./ui/Admin";
import ConfPolitics from "./ui/ConfPolitics";
/* Material ui stuff */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const pictureGameApp = {
    startApp: () => {
        let store = createStore(
            MainReducer,
            applyMiddleware(thunk)
        );
        const logChange = () => {console.info(store.getState());}
        store.subscribe(logChange);
        render(
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router history={browserHistory}>
                        <Route path="/" component={App} />
                        <Route path="conf-politics" component={ConfPolitics} />
                    </Router>
                </Provider>
            </MuiThemeProvider>,
            document.getElementById("fbapp")
        );
    }
};

export default pictureGameApp;
