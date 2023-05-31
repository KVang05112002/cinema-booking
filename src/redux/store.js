import { combineReducers, createStore } from "redux";
import authSlice from "./authSlice";

export const allReducer = combineReducers({
    authSlice: authSlice
})

const store = createStore(allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;


