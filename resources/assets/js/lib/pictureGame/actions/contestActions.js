import * as actionTypes from "./contestTypes";
import ContestApi from "../API/contest/ContestApi";
import UISettingsApi from "../API/UISettings/UISettingsApi";

const contestApi = new ContestApi();
const uisettingsApi = new UISettingsApi();

const generateFreshContest = () => {
    return {
        start_date: new Date(),
        end_date: new Date(),
        end_msg: "",
        description: "",
        title: "",
        id_winner: 0,
        active: false
    }
}

export const requestContests = () => {
    return {
        type: actionTypes.REQUEST_CONTESTS
    };
}

export const requestUISettings = () => {
    return {
        type: actionTypes.REQUEST_UISETTINGS
    };
}

export const recieveError = (error) => {
    return {
        type: actionTypes.RECIEVE_ERROR,
        error: error
    };
}

export const recieveContests = (contests) => {
    return {
        type: actionTypes.RECIEVE_CONTESTS,
        contests: contests
    };
}

export const recieveCurrentContest = (contest) => {
    return {
        type: actionTypes.RECIEVE_CURRENT_CONTEST,
        contest: contest
    };
}

export const storeContest = () => {
    return (dispatch, getState) => {
        dispatch(requestContests());
        contestApi.store(getState().contest.newContest, (response) => {
            if (!response.error) {
                dispatch(getContests());
                dispatch(getCurrentContest());
            } else {
                dispatch(recieveError(response.error));
            }
        });
        dispatch(toggleCreateModal()); // TODO move this away
    }
}

export const storeUISettings = (newSettings) => {
    return (dispatch) => {
        dispatch(requestUISettings());
        uisettingsApi.store(newSettings, (response) => {
            if (!response.error) {
                dispatch(getUISettings());
            } else {
                dispatch(recieveError(response.error));
            }
        });
    }
}

export const getCurrentContest = () => {
    return (dispatch) => {
        dispatch(requestContests());
        contestApi.getCurrent(response => {
            if (!response.error) {
                dispatch(recieveCurrentContest(response.contest));
            } else {
                dispatch(recieveError(response.error));
            }
        })
    }
}

export const getContests = () => {
    return (dispatch) => {
        dispatch(requestContests());
        contestApi.getAll(response => {
            if (!response.error) {
                dispatch(recieveContests(response.contests));
            } else {
                dispatch(recieveError(response.error));
            }
        });
    };
}

export const deleteContest = (id) => {
    return (dispatch) => {
        contestApi.delete(id, (response) => {
            if(!response.error) {
                dispatch(getContests());
                dispatch(getCurrentContest());
            } else {
                dispatch(recieveError(response.error));
            }
        })
    }
}

export const activateContest = (id) => {
    return (dispatch) => {
        dispatch(requestContests());
        contestApi.activate(id, (response) => {
            if(!response.error) {
                dispatch(getContests());
            } else {
                dispatch(recieveError(response.error));
            }
        })
    }
}

export const toggleCreateModal = (contest) => {
    if (!contest) {
        contest = generateFreshContest();
    }
    return {
        type: actionTypes.TOGGLE_CREATE_MODAL,
        newContest: contest
    };
}

export const recieveUISettings = (uisettings) => {
    return {
        type: actionTypes.RECIEVE_UISETTINGS,
        uisettings: uisettings
    };
}

export const uploadFiles = (files) => {
    return {
        type: actionTypes.UPLOAD_FILES,
        files
    };
}

export const getUISettings = () => {
    return (dispatch) => {
        dispatch(requestUISettings());
        uisettingsApi.getAll(response => {
            if (!response.error) {
                let uisettings = {};
                uisettings = response.uisettings;
                dispatch(recieveUISettings(uisettings));
            } else {
                dispatch(recieveError(response.error));
            }
        });
    };
}

export const openSettings = () => {
    return {
        type: actionTypes.OPEN_SETTINGS
    };
}

export const openEvents = () => {
    return {
        type: actionTypes.OPEN_EVENTS,
    };
}

export const openExport = () => {
    return {
        type: actionTypes.OPEN_EXPORT
    };
}

export const changeMainColor = (color) => {
    return {
        type: actionTypes.CHANGE_MAIN_COLOR,
        color
    }
}

export const changeColorGallery = (colorGallery) => {
    return {
        type: actionTypes.CHANGE_COLOR_GALLERY,
        colorGallery
    }
}

export const openAdmin = () => {
    return {
        type: actionTypes.OPEN_ADMIN,
        openAdmin: true,
        openEvents: true
    };
}

export const closeAdmin = () => {
    return {
        type: actionTypes.CLOSE_ADMIN,
        openAdmin: false
    };
}

export const openSettingsTheme = () => {
    return {
        type: actionTypes.OPEN_SETTINGS_THEME,
        settingsCarousel: false,
        settingsGallery: false,
        settingsSubmenu: false,
        settingsTheme: true,
        settingsMenu: false
    };
}

export const openSettingsCarousel = () => {
    return {
        type: actionTypes.OPEN_SETTINGS_CAROUSEL,
        settingsCarousel: true,
        settingsGallery: false,
        settingsSubmenu: false,
        settingsTheme: false,
        settingsMenu: false
    };
}

export const openSettingsSubmenu = () => {
    return {
        type: actionTypes.OPEN_SETTINGS_SUBMENU,
        settingsCarousel: false,
        settingsGallery: false,
        settingsSubmenu: true,
        settingsTheme: false,
        settingsMenu: false
    };
}

export const openSettingsGallery = () => {
    return {
        type: actionTypes.OPEN_SETTINGS_GALLERY,
        settingsCarousel: false,
        settingsGallery: true,
        settingsSubmenu: false,
        settingsTheme: false,
        settingsMenu: false
    };
}

export const openSettingsMenu = () => {
    return {
        type: actionTypes.OPEN_SETTINGS_MENU,
        settingsCarousel: false,
        settingsGallery: false,
        settingsSubmenu: false,
        settingsTheme: false,
        settingsMenu: true
    };
}

export const newContestChange = (attr, value) => {
    return {
        type: actionTypes.NEW_CONTEST_CHANGE,
        attr: attr,
        value: value
    };
}

export const hoverSettingsTheme = () => {
    return {
        type: actionTypes.HOVER_SETTINGS_THEME,
        hoverSettingTheme: true,
        hoverSettingCarousel: false,
        hoverSettingSubmenu: false,
        hoverSettingGallery: false,
        hoverSettingFullscreen: false
    };
}

export const hoverSettingsCarousel = () => {
    return {
        type: actionTypes.HOVER_SETTINGS_CAROUSEL,
        hoverSettingTheme: false,
        hoverSettingCarousel: true,
        hoverSettingSubmenu: false,
        hoverSettingGallery: false,
        hoverSettingFullscreen: false
    };
}

export const hoverSettingsSubmenu = () => {
    return {
        type: actionTypes.HOVER_SETTINGS_SUBMENU,
        hoverSettingTheme: false,
        hoverSettingCarousel: false,
        hoverSettingSubmenu: true,
        hoverSettingGallery: false,
        hoverSettingFullscreen: false
    };
}

export const hoverSettingsGallery = () => {
    return {
        type: actionTypes.HOVER_SETTINGS_GALLERY,
        hoverSettingTheme: false,
        hoverSettingCarousel: false,
        hoverSettingSubmenu: false,
        hoverSettingGallery: true,
        hoverSettingFullscreen: false
    };
}

export const hoverReset = () => {
    return {
        type: actionTypes.HOVER_RESET,
        hoverSettingTheme: false,
        hoverSettingCarousel: false,
        hoverSettingSubmenu: false,
        hoverSettingGallery: false,
        hoverSettingFullscreen: false
    };
}

export const hoverFullscreen = () => {
    return {
        type: actionTypes.HOVER_FULLSCREEN,
        hoverSettingTheme: false,
        hoverSettingCarousel: false,
        hoverSettingSubmenu: false,
        hoverSettingGallery: false,
        hoverSettingFullscreen: true
    };
}

const updateParticipantAfterVote = (participant) => {
    return {
        type: actionTypes.UPDATE_PARTICIPANT_AFTER_VOTE,
        participant
    }
}

export const reloadContestParticipantAfterVote = () => {
    return (dispatch, getState) => {
        dispatch(updateParticipantAfterVote(getState().gallery.aimed_participant))
    }
}
