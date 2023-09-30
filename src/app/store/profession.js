import { createSlice } from "@reduxjs/toolkit";
import professionsService from "../services/professions.service";
import isOutDated from "../utils/isOutDated";

const initialState = {
  entities: null,
  isLoading: true,
  errors: null,
  lastFetch: null,
};

const professionSlice = createSlice({
  name: "professions",
  initialState,
  reducers: {
    professionReceived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    professionRequest(state) {
      state.isLoading = true;
    },
    professionRequestFailed(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

const { actions, reducer: professionReducer } = professionSlice;
const { professionReceived, professionRequest, professionRequestFailed } =
  actions;

//fetch
export const loadProfession = () => async (dispatch, getState) => {
  const { lastFetch } = getState().profession;
  if (isOutDated(lastFetch)) {
    dispatch(professionRequest());
    try {
      const { content } = await professionsService.fetchAll();
      dispatch(professionReceived(content));
    } catch (error) {
      dispatch(professionRequestFailed(error.message));
    }
  }
};
//selectors
export const getProfessionsList = () => (state) => state.profession.entities;
export const getProfessionById = (id) => (state) => {
  return state.profession.entities
    ? state.profession.entities.find((p) => p._id === id)
    : [];
};

export const getProfessionsLoading = () => (state) =>
  state.profession.isLoading;

export default professionReducer;
