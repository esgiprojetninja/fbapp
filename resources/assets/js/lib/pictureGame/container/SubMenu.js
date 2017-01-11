import {connect} from "react-redux";
import SubMenuComponent from "../ui/SubMenu";

const mapStateToProps = (state) => {
    return {...state};
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

const SubMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubMenuComponent);
export default SubMenu;
