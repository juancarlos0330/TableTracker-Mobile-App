import { GET_ORDERLIST_DATA, LOADING_DATA } from "./constants";
import { apiURL } from "../config/config";
import axios from "axios";

// get orderlist data
export const getOrderlistdata = (paramData) => (dispatch) => {
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

// delete orderlist data
export const delOrderlistdata = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/orderlists/delete", paramData)
    .then((res) => {
      dispatch(getOrderlistdata({ id: paramData.id }));
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// order orderlist data
export const orderOrderlistdata = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/orderlists/order", paramData)
    .then((res) => {
      dispatch(getOrderlistdata({ id: paramData.uid }));
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
