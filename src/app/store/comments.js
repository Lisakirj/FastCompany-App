import { createAction, createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/comments.service";
import { nanoid } from "nanoid";

const initialState = {
  entities: null,
  isLoading: true,
  errors: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested(state) {
      state.isLoading = true;
    },
    commentsReceived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentCreated(state, action) {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentDeleted(state, action) {
      state.entities = state.entities.filter(
        (c) => c._id !== action.payload.id
      );
    },
  },
});

const { actions, reducer: commentsReducer } = commentsSlice;
const { commentsReceived, commentsRequested, commentCreated, commentDeleted } =
  actions;

//fetch
const commentsFailed = createAction("comments/commentsFailed");
export const loadComments = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentsService.getComments(pageId);
    // console.log(content);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsFailed(error.message));
  }
};
//create
const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateRequesteFailed = createAction(
  "comments/commentCreateRequesteFailed"
);
export const createComment =
  ({ data, currentUserId, userId }) =>
  async (dispatch) => {
    dispatch(commentCreateRequested());
    const comment = {
      _id: nanoid(),
      userId: currentUserId,
      pageId: userId,
      createdAt: Date.now(),
      ...data,
    };
    try {
      const { content } = await commentsService.create(comment);
      console.log(content);
      dispatch(commentCreated(content));
    } catch (error) {
      commentCreateRequesteFailed(error.message);
    }
  };
//delete
const deleteCommentRequested = createAction("comments/deleteCommentRequested");
const deleteCommentRequesteFailed = createAction(
  "comments/deleteCommentRequesteFailed"
);
export const deleteComment = (id) => async (dispatch) => {
  dispatch(deleteCommentRequested());
  console.log(id);
  try {
    const { content } = await commentsService.deleteComment(id);
    console.log(content);
    if (content === null) {
      dispatch(commentDeleted({ id }));
    }
  } catch (error) {
    dispatch(deleteCommentRequesteFailed(error.message));
  }
};
//selectors
export const getComments = () => (state) => state.comments.entities;
export const getIsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
