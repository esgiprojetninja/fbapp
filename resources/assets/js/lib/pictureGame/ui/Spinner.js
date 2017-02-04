import React from "react";
import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class Spinner extends React.PureComponent {
    render () {
        const styles = {
            spinerContainer: {
                position: "relative",
                width: "40px",
                margin: "0 auto"
            },
            spinerRefresh: {
                display: "inline-block",
                position: "relative",
            }
        }
        return (
            <div style={styles.spinerContainer}>
                <RefreshIndicator
                    size={40}
                    left={10}
                    top={40}
                    status="loading"
                    style={styles.spinerRefresh}
                />
            </div>
        );
    }
}
