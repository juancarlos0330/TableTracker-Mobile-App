import { CLEAR_ERRORS, GET_ERRORS, LOADING_DATA, SET_USERS } from "./constants";
import { apiURL } from "../config/config";
import axios from "axios";

// Login user
export const loginUser = (userData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/users/login", userData)
    .then((res) => {
      dispatch({
        type: SET_USERS,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      dispatch(setLoadingdata(false));
    });
};

// Register user
export const registerUser = (userData) => (dispatch) => {
  dispatch(setLoadingdata(true));
  axios
    .post(apiURL + "api/users/reg", userData)
    .then((res) => {
      dispatch({
        type: SET_USERS,
        payload: res.data,
      });
      dispatch(setLoadingdata(false));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      dispatch(setLoadingdata(false));
    });
};

// Logout user
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: SET_USERS,
    payload: {},
  });
  dispatch({
    type: CLEAR_ERRORS,
    payload: {},
  });
};

export const setLoadingdata = (flag) => {
  return {
    type: LOADING_DATA,
    payload: flag,
  };
};
