import {combineReducers} from "redux";
import user from "./user";
import contest from "./contest";

const Main = combineReducers({
    user,
    contest
});

export default Main;
