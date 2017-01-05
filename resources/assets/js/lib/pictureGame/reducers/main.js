import {combineReducers} from "redux";
import user from "./user";
import contest from "./contest";
import participant from "./participant";

const Main = combineReducers({
    user,
    contest,
    participant
});

export default Main;
