import { createSlice } from "@reduxjs/toolkit";

export interface VideoCommentStateIf {
  newComment: Record<string, any>;
}
const initialState: VideoCommentStateIf = {
  newComment: {},
};

export const videoCommentSlice = createSlice({
  name: "videoComment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.newComment = { ...action.payload };
    },
  },
});

export const { addComment } = videoCommentSlice.actions;

export default videoCommentSlice.reducer;
