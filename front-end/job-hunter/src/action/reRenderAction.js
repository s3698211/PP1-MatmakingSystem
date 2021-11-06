import { useHistory } from "react-router";

export const reRenderRequest = (value) => (dispatch) => {
  dispatch({
    type: "SET_RERENDER",
    payload: !value,
  });
};
