import {combineReducers} from "redux";
import user from "./user";
import contest from "./contest";
import participant from "./participant";
import notice from "./notice";
import dataExport from "./dataExport";

const Main = combineReducers({
    user,
    contest,
    participant,
    notice,
    dataExport
});

export default Main;
