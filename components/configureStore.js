import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";
import loadingReducer from "./reducers/loadingReducer";
import dishReducer from "./reducers/dishReducer";
import orderlistReducer from "./reducers/orderlistReducer";
import orderReducer from "./reducers/orderReducer";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  loading: loadingReducer,
  dishes: dishReducer,
  orderlists: orderlistReducer,
  orders: orderReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
};

export default configureStore;
