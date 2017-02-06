import React, {PropTypes as T} from "react";

import Snackbar from 'material-ui/Snackbar';

export default class Notice extends React.PureComponent {
    handleRequestClose() {
        if ( this.props.leaveAction ){
          this.props.leaveAction()
        }
        this.props.closeNotice();
    };

    render() {
        const timeOut = (this.props.customTimeout && !isNaN(this.props.customTimeout)) ? this.props.customTimeout : this.props.autoHideDuration;
        return (
          <Snackbar
              open={this.props.open}
              action="ok"
              onActionTouchTap={this.handleRequestClose.bind(this)}
              message={this.props.msg}
              autoHideDuration={timeOut}
              onRequestClose={this.handleRequestClose.bind(this)}
          />
        )
    }
}
Notice.propTypes = {
    msg: T.string.isRequired,
    open: T.bool.isRequired,
    autoHideDuration: T.number.isRequired,
    closeNotice: T.func.isRequired,
    openNotice: T.func.isRequired
};
