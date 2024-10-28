import { GET_ORDER_DATA } from "../Actions/constants";

const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
