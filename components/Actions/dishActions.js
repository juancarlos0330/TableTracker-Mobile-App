import { GET_DISH_DATA, GET_ORDERLIST_DATA, LOADING_DATA } from "./constants";
import { apiURL } from "../config/config";
import axios from "axios";

// get dish data
export const getDishdata = () => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .get(apiURL + "api/dishes/uall")
    .then((res) => {
      dispatch({
        type: GET_DISH_DATA,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// add order data
export const addOrderdata = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/dishes/addorder", paramData)
    .then((res) => {
      dispatch(getDishdata());
      dispatch(getOrderlistdatas({ id: paramData.uid }));
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// get orderlist data
export const getOrderlistdatas = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/orderlists/all", paramData)
    .then((res) => {
      dispatch({
        type: GET_ORDERLIST_DATA,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

export const setLoadingdata = (flag) => {
  return {
    type: LOADING_DATA,
    payload: flag,
  };
};
