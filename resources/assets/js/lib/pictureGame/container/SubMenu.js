import {connect} from "react-redux";
import SubMenuComponent from "../ui/SubMenu";

const mapStateToProps = (state) => {
    return Object.assign({}, state);
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

const SubMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubMenuComponent);
export default SubMenu
