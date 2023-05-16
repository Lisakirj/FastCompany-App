import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qualityReducer from "./qualities";
import professionReducer from "./profession";
import usersReducer from "./users";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
  qualities: qualityReducer,
  profession: professionReducer,
  users: usersReducer,
  comments: commentsReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};
