import {connect} from "react-redux";
import {
    getUserList
} from "../actions/dataExportActions";
import DataExportUI from "../ui/DataExport";

const mapStateToProps = (state) => {
    return state.dataExport;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getUserList());
        }
    };
}

const DataExport = connect(
    mapStateToProps,
    mapDispatchToProps
)(DataExportUI);

export default DataExport;
