import * as actionTypes from "../actions/contestTypes";

const initialSate = {
    contests: [],
    newContest: {
        start_date: new Date(),
        end_date: new Date(),
        end_msg: "",
        description: "",
        title: "",
        id_winner: 0,
        state: false
    },
    currentContest: false,
    isFetching: false,
    createModalOpen: false,
    error: false,
    color: "#00BCD4",
    colorGallery: {r: 255, g: 255, b: 255 , a: 0.5},
    openAdmin: false,
    openEvents: false,
    openSettings: false,
    settingsCarousel: false,
    settingsGallery: false,
    settingsSubmenu: false,
    settingsTheme: false,
    settingsMenu: false,
    hoverSettingTheme: false,
    hoverSettingCarousel: false,
    hoverSettingSubmenu: false,
    hoverSettingGallery: false,
    hoverSettingFullscreen: false
};

const contest = (state = initialSate, action) => {
    switch(action.type) {
        case actionTypes.REQUEST_CONTESTS:
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
        case actionTypes.OPEN_SETTINGS:
            return {
                ...state,
                openEvents: false,
                openSettings: true,
                settingsCarousel: false,
                settingsGallery: false,
                settingsSubmenu: false,
                settingsTheme: false,
                settingsMenu: true,
            };
        case actionTypes.OPEN_EVENTS:
            return {
                ...state,
                openEvents: true,
                openSettings: false
            };
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
        default:
            return state;
    }
}

export default contest;
