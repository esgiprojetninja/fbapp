import React, {PropTypes as T} from "react";

import Spinner from "./Spinner";

export default class DataExport extends React.PureComponent {

    componentWillMount () {
        this.props.onReady();
    }

    render () {
        if (this.props.isFetching) {
            return <Spinner />;
        }
        return (
            <ul>
                {this.props.userList.map((user, index) => (<li key={index}>{user.id}</li>))}
            </ul>
        );
    }
}

DataExport.propTypes = {
    userList: T.arrayOf(T.object).isRequired,
    isFetching: T.bool.isRequired
};
