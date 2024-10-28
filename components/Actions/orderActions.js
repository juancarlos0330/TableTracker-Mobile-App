import { GET_ORDER_DATA, LOADING_DATA } from "./constants";
import { apiURL } from "../config/config";
import axios from "axios";

// get order data
export const getOrderdata = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/orders/all", paramData)
    .then((res) => {
      dispatch({
        type: GET_ORDER_DATA,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// update waiting status
export const updateWaitingstatus = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/orders/updatewaiting", paramData)
    .then((res) => {
      dispatch(getOrderdata({ id: paramData.uid }));
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// update running status
export const updateRunningstatus = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/orders/updaterunning", paramData)
    .then((res) => {
      dispatch(getOrderdata({ id: paramData.uid }));
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// Update modal waiting status
export const updateModalwaitingstatus = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/orders/modalupdatewaiting", paramData)
    .then((res) => {
      dispatch(getOrderdata({ id: paramData.uid }));
      dispatch(setLoadingdata(false));
    })
    .catch((err) => console.log(err));
};

// update modal running status
export const updateModalrunningstatus = (paramData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/orders/modalupdaterunning", paramData)
    .then((res) => {
      dispatch(getOrderdata({ id: paramData.uid }));
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
