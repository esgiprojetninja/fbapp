import React from "react";
import AppBar from 'material-ui/AppBar';
import Login from "../container/Login";

const AppWrapper = () => {
    return (
        <div>
            <AppBar
                title="FB app"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <Login />
        </div>
    );
};

export default AppWrapper;
