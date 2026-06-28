import { VideoStateIf } from "@/src/types/store/video-details-slice.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: VideoStateIf = {
  videos: [],
  activeIndex: 0,
};

const videoDetailsSlice = createSlice({
  name: "videoDetails",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      const { payload } = action;
      state.videos = payload;
    },

    appendVideos: (state, action) => {
      const { payload } = action;
      state.videos = [...state.videos, ...payload];
    },

    prependVideos: (state, action) => {
      const { payload } = action;
      state.videos = [...payload, ...state.videos];
    },

    setActiveIndex: (state, action) => {
      const { payload } = action;
      state.activeIndex = payload;
    },

    increaseCommentCount: (state, action) => {
      const { payload } = action;
      state.videos = state.videos.map((video) => {
        if (video._id === payload.videoId) {
          return {
            ...video,
            stats: { ...video.stats, comments: video.stats.comments + 1 },
          };
        }
        return video;
      });
    },
  },
});

export const {
  setVideos,
  appendVideos,
  prependVideos,
  setActiveIndex,
  increaseCommentCount,
} = videoDetailsSlice.actions;
export default videoDetailsSlice.reducer;
