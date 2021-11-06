import { combineReducers } from "redux";

import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import renderReducer from "./renderReducer";
export default combineReducers({
  security: securityReducer,
  errors: errorReducer,
  render: renderReducer,
});
