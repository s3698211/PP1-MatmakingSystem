import axios from "axios";
import setJWTToken from "../auth/setJWTToken";

import jwtDecode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/auth/signup", newUser);
    history.push(`/signin/${newUser.user_type}`);
    dispatch({
      type: "GET_ERRORS",
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: "GET_ERRORS",
      payload: err.response.data,
    });
  }
};

export const signin = (loginRequest) => async (dispatch) => {
  await axios
    .post("/api/auth/signin", loginRequest)
    .then((res) => {
      const { accessToken } = res.data;

      localStorage.setItem("jwtToken", accessToken);
      setJWTToken(accessToken);
      const decoded = jwtDecode(accessToken);

      dispatch({
        type: "SET_CURRENT_USER",
        payload: decoded,
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data.message,
      });
    });
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: "SET_CURRENT_USER",
    payload: {},
  });
};
