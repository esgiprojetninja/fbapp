import {combineReducers} from "redux";
import user from "./user";
import contest from "./contest";
import participant from "./participant";
import notice from "./notice";

const Main = combineReducers({
    user,
    contest,
    participant,
    notice
});

export default Main;
