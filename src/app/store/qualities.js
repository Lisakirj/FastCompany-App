import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qualities.service";
import isOutDated from "../utils/isOutDated";

const initialState = {
  entities: null,
  isLoading: true,
  errors: null,
  lastFetch: null,
};
const qualitySlice = createSlice({
  name: "qualities",
  initialState,
  reducers: {
    qualitiesReceived(state, action) {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualityRequested(state) {
      state.isLoading = true;
    },
    qualityRequestFailed(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

const { actions, reducer: qualityReducer } = qualitySlice;
const { qualitiesReceived, qualityRequested, qualityRequestFailed } = actions;
//fetch
export const loadQualities = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    dispatch(qualityRequested());
    try {
      const { content } = await qualityService.fetchAll();
      // console.log(content);
      dispatch(qualitiesReceived(content));
    } catch (error) {
      dispatch(qualityRequestFailed(error.message));
    }
  }
};
//selectors
export const getQualitiesList = () => (state) => state.qualities.entities;
export const getQualityById = (id) => (state) => {
  return state.qualities.entities.find((q) => q._id === id);
};
export const getQualitiesLoading = () => (state) => state.qualities.isLoading;

export default qualityReducer;
