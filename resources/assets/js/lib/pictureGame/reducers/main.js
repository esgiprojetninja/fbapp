import {combineReducers} from "redux";
import user from "./user";
import contest from "./contest";
import participant from "./participant";
import notice from "./notice";
import dataExport from "./dataExport";
import gallery from "./gallery";
import legal from "./legal";

const Main = combineReducers({
    user,
    contest,
    participant,
    notice,
    dataExport,
    gallery,
    legal
});

export default Main;
