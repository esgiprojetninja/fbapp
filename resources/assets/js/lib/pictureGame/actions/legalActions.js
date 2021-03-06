import * as legalTypes from "./legalTypes";
import LegalApi from "../API/legal/LegalApi";

const legalApi = new LegalApi();

const requestLegal = () => {
    return {
        type: legalTypes.REQUEST_LEGAL
    };
}

const receiveError = (error) => {
    return {
        type: legalTypes.RECEIVE_ERROR,
        error: error
    };
}

const receiveLegal = (legal) => {
    return {
        type: legalTypes.RECEIVE_LEGAL,
        legal: legal
    };
}

export const getLegal = () => {
    return (dispatch) => {
        dispatch(requestLegal());
        legalApi.getLast((response) => {
            if (response.error) {
                dispatch(receiveError(response.error));
            } else {
                dispatch(receiveLegal(response.legal));
            }
        });
    };
}

export const changeCGU = (cgu) => {
    return {
        type: legalTypes.CHANGE_CGU,
        cgu : cgu
    };
}

export const changePrivacyPolicy = (privacy_policy) => {
    return {
        type: legalTypes.CHANGE_PRIVACY_POLICY,
        privacy_policy : privacy_policy
    };
}

export const changeRules = (rules) => {
    return {
        type: legalTypes.CHANGE_RULES,
        rules : rules
    };
}

export const saveLegal = () => {
    return (dispatch, getState) => {
        dispatch(requestLegal());
        legalApi.save(getState().legal, (response) => {
            if (response.error) {
                dispatch(receiveError(response.error));
            } else {
                dispatch(receiveLegal(response.legal));
            }
        })
    }
}
