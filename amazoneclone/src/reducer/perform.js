const initialState = [];

export const Reducer = (state = initialState, action) => {
  if (action.type === "add") {
    return [...state, action.payload];
  } else if (action.type === "delete") {
    console.log(action.payload);
    console.log(state);
    const data = state;

    return data.filter((item, index) => index !== action.payload);
  } else {
    return state;
  }
};
