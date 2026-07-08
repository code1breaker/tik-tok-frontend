import { configureStore } from "@reduxjs/toolkit";

import uploadReducer from "./upload-slice";
import videoCommentReducer from "./video-comment-slice";
import videoDetailsReducer from "./video-details-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      upload: uploadReducer,
      videoDetails: videoDetailsReducer,
      videoComment: videoCommentReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
