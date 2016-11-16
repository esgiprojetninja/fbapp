import React from "react";
import { createStore } from "redux";
import { render } from "react-dom";
import { Provider } from "react-redux";
import AppContainer from "./ui/appContainer";
import pictureGameReducers from "./reducers";
/* Material ui stuff */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const pictureGameApp = {
    startApp: () => {
        let store = createStore(pictureGameReducers);
        render(
            <MuiThemeProvider>
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </MuiThemeProvider>,
            document.getElementById("fbapp")
        );
    }
};

export default pictureGameApp;
