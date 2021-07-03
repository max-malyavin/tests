import { combineReducers } from "redux";

import { UserReducer } from "./ducks/user/reducer";

export default combineReducers({
  user: UserReducer,
});
