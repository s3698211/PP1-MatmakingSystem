import axios from "axios";

const setJWTToken = (token) => {
  if (token) {
    console.log(token);
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setJWTToken;
