import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import usersService from "../services/users.service";
import { generateAuthError } from "../utils/generateAuthError";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";
import setUserImg from "../utils/imgRender";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      errors: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      errors: null,
      isDataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      errors: null,
      auth: null,
      isLoggedIn: false,
      errors: null,
      isDataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersReceived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
      state.isDataLoaded = true;
    },
    userRequested(state) {
      state.isLoading = true;
    },
    userRequestFailed(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    authRequestSuccess(state, action) {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed(state, action) {
      state.errors = action.payload;
    },
    userCreated(state, action) {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut(state) {
      state.isLoggedIn = false;
      state.entities = null;
      state.auth = null;
      state.isDataLoaded = false;
    },
    userUpdateSuccessed(state, action) {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    authRequested(state) {
      state.errors = null;
    },
  },
});

const { actions, reducer: usersReducer } = usersSlice;
const {
  usersReceived,
  userRequested,
  userRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdateSuccessed,
  authRequested,
} = actions;
//fetch
export const loadUsers = () => async (dispatch) => {
  dispatch(userRequested());
  try {
    const { content } = await usersService.fetchAll();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(userRequestFailed(error.message));
  }
};

//signUp
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserfailed");

const createUser = (data) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await usersService.create(data); //realtime database
    console.log(content);
    dispatch(userCreated(content));
    history.push("/users");
  } catch (error) {
    dispatch(createUserFailed(error.message));
  }
};
export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password }); //firebase auth database
      console.log(data);
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          img: setUserImg(),
          email,
          password,
          rate: getRandomInt(0, 5),
          completedMeetings: getRandomInt(1, 100),
          ...rest,
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };
//signIn
export const signIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.logIn({ email, password });
      console.log(data);
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else dispatch(authRequestFailed(error.message));
    }
  };
//logOut
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};
//update User
const userUpdateRequest = createAction("users/userUpdateRequest");
const userUpdateFailed = createAction("users/updateFailed");
export const updateUser = (newData) => async (dispatch) => {
  dispatch(userUpdateRequest());
  try {
    const { content } = await usersService.updateUser(newData);
    console.log(content);
    dispatch(userUpdateSuccessed(content));
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};
//getters
export const getUsers = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};
export const getisLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.isDataLoaded;
export const getCurrentUser = () => (state) => state.users.auth.userId;
export const getLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getError = () => (state) => state.users.errors;

export default usersReducer;
