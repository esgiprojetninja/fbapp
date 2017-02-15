import * as actionTypes from "../actions/contestTypes";

const initialSate = {
    contests: [],
    uisettings: {},
    files: [],
    newContest: {
        start_date: new Date(),
        end_date: new Date(),
        end_msg: "",
        description: "",
        title: "",
        id_winner: 0,
        state: 0
    },
    currentContest: {
        participants: []
    },
    isFetching: false,
    createModalOpen: false,
    error: false,
    color: "#3B5998",
    colorGallery: "#3B5998",
    openAdmin: false,
    openEvents: false,
    openSettings: false,
    openExport: false,
    settingsCarousel: false,
    settingsGallery: false,
    settingsSubmenu: false,
    settingsTheme: false,
    settingsMenu: false,
    hoverSettingTheme: false,
    hoverSettingCarousel: false,
    hoverSettingSubmenu: false,
    hoverSettingGallery: false,
    hoverSettingFullscreen: false,
    picture: ""
};

const contest = (state = initialSate, action) => {
    switch(action.type) {
        case actionTypes.REQUEST_CONTESTS:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case actionTypes.RECEIVED_FB_PICTURE:
            return {
                ...state,
                isFetching: true,
                picture: action.picture
            }
        case actionTypes.REQUEST_UISETTINGS:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case actionTypes.RECIEVE_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case actionTypes.RECIEVE_CONTEST:
            return {
                ...state,
                contests: [
                    ...contests,
                    action.contest
                ],
                isFetching: false,
                error: false
            }
        case actionTypes.RECIEVE_UISETTINGS:
            return {
                ...state,
                uisettings: action.uisettings,
                isFetching: false,
                error: false
            }
        case actionTypes.RECIEVE_CONTESTS:
            return {
                ...state,
                contests: action.contests,
                isFetching: false,
                error: false
            }
        case actionTypes.TOGGLE_CREATE_MODAL:
            return {
                ...state,
                createModalOpen: !state.createModalOpen,
                newContest: action.newContest
            }
        case actionTypes.NEW_CONTEST_CHANGE:
            const contest = Object.assign({}, state.newContest);
            contest[action.attr] = action.value;
            return {
                ...state,
                newContest: contest
            };
        case actionTypes.RECIEVE_CURRENT_CONTEST:
            return {
                ...state,
                isFetching: false,
                currentContest: action.contest
            };
        case actionTypes.UPLOAD_FILES:
            return {
                ...state,
                isFetching: false,
                files: action.files
            };
        case actionTypes.OPEN_SETTINGS: // TODO optimize this asap
            return {
                ...state,
                openSettings: true,
                openEvents: false,
                openExport: false,
                openCGU: false,
                settingsCarousel: false,
                settingsGallery: false,
                settingsSubmenu: false,
                settingsTheme: false,
                settingsMenu: true,
            };
        case actionTypes.OPEN_EVENTS: // TODO optimize this asap
            return {
                ...state,
                openEvents: true,
                openSettings: false,
                openExport: false,
                openCGU: false
            };
        case actionTypes.OPEN_EXPORT: // TODO optimize this asap
            return {
                ...state,
                openEvents: false,
                openSettings: false,
                openCGU: false,
                openExport: true
            }
        case actionTypes.OPEN_CGU: // TODO optimize this asap
            return {
                ...state,
                openCGU: true,
                openEvents: false,
                openSettings: false,
                openExport: false
            }
        case actionTypes.CHANGE_MAIN_COLOR:
            return {
                ...state,
                color: action.color
            };
        case actionTypes.CHANGE_COLOR_GALLERY:
            return {
                ...state,
                colorGallery: action.colorGallery
            };
        case actionTypes.OPEN_ADMIN:
            return {
                ...state,
                openAdmin: true,
                openEvents: true
            };
        case actionTypes.CLOSE_ADMIN:
            return {
                ...state,
                openAdmin: false,
            }
        case actionTypes.OPEN_SETTINGS_THEME:
            return {
                ...state,
                settingsCarousel: false,
                settingsGallery: false,
                settingsSubmenu: false,
                settingsTheme: true,
                settingsMenu: false
            };
        case actionTypes.OPEN_SETTINGS_CAROUSEL:
            return {
                ...state,
                settingsCarousel: true,
                settingsGallery: false,
                settingsSubmenu: false,
                settingsTheme: false,
                settingsMenu: false
            };
        case actionTypes.OPEN_SETTINGS_SUBMENU:
            return {
                ...state,
                settingsCarousel: false,
                settingsGallery: false,
                settingsSubmenu: true,
                settingsTheme: false,
                settingsMenu: false
            };
        case actionTypes.OPEN_SETTINGS_GALLERY:
            return {
                ...state,
                settingsCarousel: false,
                settingsGallery: true,
                settingsSubmenu: false,
                settingsTheme: false,
                settingsMenu: false
            };
        case actionTypes.OPEN_SETTINGS_MENU:
            return {
                ...state,
                settingsCarousel: false,
                settingsGallery: false,
                settingsSubmenu: false,
                settingsTheme: false,
                settingsMenu: true
            };
        case actionTypes.HOVER_SETTINGS_THEME:
            return {
                ...state,
                hoverSettingTheme: true,
                hoverSettingCarousel: false,
                hoverSettingSubmenu: false,
                hoverSettingGallery: false,
                hoverSettingFullscreen: false
            };
        case actionTypes.HOVER_SETTINGS_CAROUSEL:
            return {
                ...state,
                hoverSettingTheme: false,
                hoverSettingCarousel: true,
                hoverSettingSubmenu: false,
                hoverSettingGallery: false,
                hoverSettingFullscreen: false
            };
        case actionTypes.HOVER_SETTINGS_SUBMENU:
            return {
                ...state,
                hoverSettingTheme: false,
                hoverSettingCarousel: false,
                hoverSettingSubmenu: true,
                hoverSettingGallery: false,
                hoverSettingFullscreen: false
            };
        case actionTypes.HOVER_SETTINGS_GALLERY:
            return {
                ...state,
                hoverSettingTheme: false,
                hoverSettingCarousel: false,
                hoverSettingSubmenu: false,
                hoverSettingGallery: true,
                hoverSettingFullscreen: false
            };
        case actionTypes.HOVER_RESET:
            return {
                ...state,
                hoverSettingTheme: false,
                hoverSettingCarousel: false,
                hoverSettingSubmenu: false,
                hoverSettingGallery: false,
                hoverSettingFullscreen: false
            }
        case actionTypes.HOVER_FULLSCREEN:
            return {
                ...state,
                hoverSettingTheme: false,
                hoverSettingCarousel: false,
                hoverSettingSubmenu: false,
                hoverSettingGallery: false,
                hoverSettingFullscreen: true
            }
        case actionTypes.UPDATE_PARTICIPANT_AFTER_VOTE:
            return {
                ...state,
                currentContest: {
                    ...state.currentContest,
                    participants: state.currentContest.participants.map( (p, key) => (p.id == action.participant.id ) ? action.participant : p )
                }
            }
        case actionTypes.REMOVE_PARTICIPANT_AFTER_ADMIN_REMOVE:
            return {
                ...state,
                currentContest: {
                    ...state.currentContest,
                    participants: state.currentContest.participants.filter( (p) => p.id_user != action.id_user )
                }
            }
        default:
            return state;
    }
}

export default contest;
