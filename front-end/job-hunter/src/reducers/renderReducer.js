const initialState = {
  reRender: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_RERENDER":
      return {
        ...state,
        reRender: action.payload,
      };
    default:
      return state;
  }
}
