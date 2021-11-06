import axios from "axios";
import setJWTToken from "../auth/setJWTToken";

import jwtDecode from "jwt-decode";

export const createNewUser =
  (newUser, history, handleLoading) => async (dispatch) => {
    try {
      await axios.post(
        "https://match-making-jobhunter-api.herokuapp.com/api/auth/signup",
        newUser
      );
      handleLoading();
      history.push(`/signin/${newUser.user_type}`);
      dispatch({
        type: "GET_ERRORS",
        payload: {},
      });
    } catch (err) {
      handleLoading();
      alert(err.response.data.message);

      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data.message,
      });
    }
  };

export const signin =
  (loginRequest, handleLoading, history, userType) => async (dispatch) => {
    await axios
      .post(
        "https://match-making-jobhunter-api.herokuapp.com/api/auth/signin",
        loginRequest
      )
      .then((res) => {
        const { accessToken } = res.data;
        if (res.data.status != false) {
          sessionStorage.setItem("jwtToken", accessToken);
          setJWTToken(accessToken);
          const decoded = jwtDecode(accessToken);
          handleLoading();

          history.push(`/${userType.toLowerCase()}/dashboard`);

          dispatch({
            type: "SET_CURRENT_USER",
            payload: decoded,
          });
        }
      })
      .catch((err) => {
        handleLoading();
        alert(err.response.data.error);

        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data.error,
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
