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
    openCGU,
    openSettings,
    openEvents,
    openExport,
    openSettingsTheme,
    openSettingsSubmenu,
    openSettingsCarousel,
    openSettingsGallery,
    openSettingsMenu,
    hoverSettingsTheme,
    hoverSettingsSubmenu,
    hoverSettingsGallery,
    hoverSettingsCarousel,
    hoverReset,
    hoverFullscreen,
    getUISettings,
    storeUISettings,
    uploadFiles,
    getFbPicture,
    receivedFbPicture
} from "../actions/contestActions";
import AdminContestsComponent from "../ui/AdminContests";

const mapStateToProps = (state) => {
    if(state.user){
        state.contest.user = state.user;
    }
    return state.contest;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getContests());
            dispatch(getUISettings());
            dispatch(getFbPicture());
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
        onOpenCGU: () => {
            dispatch(openCGU());
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
        },
        onHoverSettingsFullscreen: () => {
            dispatch(hoverFullscreen());
        },
        onOpenExport: () => {
            dispatch(openExport());
        },
        onUISettingsChange: (newUISettings) => {
            dispatch(storeUISettings(newUISettings));
        },
        onUploadFiles: (files) => {
            dispatch(uploadFiles(files));
        },
        onGetFbPicture: (user_id, response) => {
            dispatch(getFbPicture(user_id, response));
        },
        onReceivedFbPicture: (response) => {
            dispatch(receivedFbPicture(response));
        }
    }
}

const AdminContests = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminContestsComponent);

export default AdminContests;
