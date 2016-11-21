import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { render } from "react-dom";
import { Provider } from "react-redux";
import AppWrapper from "./ui/AppWrapper";
import pictureGameReducers from "./reducers";
/* Material ui stuff */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const pictureGameApp = {
    startApp: (fbObject) => {
        let store = createStore(
            pictureGameReducers,
            applyMiddleware(thunk)
        );
        render(
            <MuiThemeProvider>
                <Provider store={store}>
                    <AppWrapper />
                </Provider>
            </MuiThemeProvider>,
            document.getElementById("fbapp")
        );
    }
};

export default pictureGameApp;
