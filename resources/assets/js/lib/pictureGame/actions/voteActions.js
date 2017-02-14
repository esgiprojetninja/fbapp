import * as types from "./voteTypes";
import ContestApi from "../API/contest/ContestApi";

const contestApi = new ContestApi();


export const getCurrentContestVoters = () => {
    dispatch(requestCurrentContestVotes())
    
}


export const openVotes = () => {
    return {
        type: types.OPEN_MODAL
    }
}
