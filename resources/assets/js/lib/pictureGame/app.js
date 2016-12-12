import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Router, Route, browserHistory } from 'react-router';
import { render } from "react-dom";
import { Provider } from "react-redux";
import loginReducers from "./reducers/loginReducers";
import App from "./ui/App";
/* Material ui stuff */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const pictureGameApp = {
    startApp: () => {
        let store = createStore(
            loginReducers,
            applyMiddleware(thunk)
        );
        const logChange = () => {console.info(store.getState());}
        store.subscribe(logChange);
        render(
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router history={browserHistory}>
                        <Route path="/" component={App} />
                    </Router>
                </Provider>
            </MuiThemeProvider>,
            document.getElementById("fbapp")
        );
    }
};

export default pictureGameApp;
