import {connect} from "react-redux";
import {
    getContests,
    toggleCreateModal,
    deleteContest,
    activateContest,
    changeMainColor,
    changeColorGallery,
    openAdmin,
    closeAdmin,
    openSettings,
    openEvents,
    openSettingsTheme,
    openSettingsSubmenu,
    openSettingsCarousel,
    openSettingsGallery,
    openSettingsMenu,
    hoverSettingsTheme,
    hoverSettingsSubmenu,
    hoverSettingsGallery,
    hoverSettingsCarousel,
    hoverReset
} from "../actions/contestActions";
import AdminContestsComponent from "../ui/AdminContests";

const mapStateToProps = (state) => {
    return state.contest;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getContests());
        },
        onCreateModalOpenClick: (ev, contest) => {
            dispatch(toggleCreateModal(contest));
        },
        onDeleteContestClick: (id) => {
            dispatch(deleteContest(id));
        },
        onActivateContestClick: (id) => {
            dispatch(activateContest(id));
        },
        onChangeColor: (color) => {
            dispatch(changeMainColor(color));
        },
        onChangeColorGallery: (colorGallery) => {
            dispatch(changeColorGallery(colorGallery));
        },
        onOpenSettings: () => {
            dispatch(openSettings());
        },
        onOpenEvents: () => {
            dispatch(openEvents());
        },
        onOpenAdmin: () => {
            dispatch(openAdmin());
        },
        onCloseAdmin: () => {
            dispatch(closeAdmin());
        },
        onOpenSettingsTheme: () => {
            dispatch(openSettingsTheme());
        },
        onOpenSettingsCarousel: () => {
            dispatch(openSettingsCarousel());
        },
        onOpenSettingsSubmenu: () => {
            dispatch(openSettingsSubmenu());
        },
        onOpenSettingsGallery: () => {
            dispatch(openSettingsGallery());
        },
        onOpenSettingsMenu: () => {
            dispatch(openSettingsMenu());
        },
        onHoverSettingsTheme: () => {
            dispatch(hoverSettingsTheme());
        },
        onHoverSettingsCarousel: () => {
            dispatch(hoverSettingsCarousel());
        },
        onHoverSettingsSubmenu: () => {
            dispatch(hoverSettingsSubmenu());
        },
        onHoverSettingsGallery: () => {
            dispatch(hoverSettingsGallery());
        },
        onHoverReset: () => {
            dispatch(hoverReset());
        }
    }
}

const AdminContests = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminContestsComponent);

export default AdminContests;
