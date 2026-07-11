import { createSlice } from "@reduxjs/toolkit";

export interface FileStateIf {
  name: string;
  url: string;
  size: number;
  type: string;
}

export type CloudinaryAudioInfo = {
  codec: string;
  bit_rate: string;
  frequency: number;
  channels: number;
  channel_layout: string;
};

export type CloudinaryVideoInfo = {
  pix_format: string;
  codec: string;
  level: number;
  profile: string;
  bit_rate: string;
};

export interface UploadedFileStateIf {
  api_key: string;
  asset_folder: string;
  asset_id: string;

  audio: CloudinaryAudioInfo;
  video: CloudinaryVideoInfo;

  bit_rate: number;
  bytes: number;
  created_at: string;

  display_name: string;
  duration: number;
  etag: string;
  format: string;

  frame_rate: number;
  height: number;
  width: number;

  is_audio: boolean;
  nb_frames: number;
  pages: number;

  original_filename: string;
  placeholder: boolean;

  playback_url: string;
  public_id: string;

  resource_type: "video" | "image" | "raw";
  rotation: number;

  secure_url: string;
  url: string;

  signature: string;
  tags: string[];

  type: string;
  version: number;
  version_id: string;
}

export interface UploadFormIf {
  videoId: string;
  details: {
    coverImgUrl: string;
    description: string;
    location: string;
  };
  settings: {
    postTiming: "now" | "schedule";
    visibility: string;
    interaction: {
      comments: boolean;
      likes: boolean;
    };
  };
}

export interface UploadStateIf {
  file: FileStateIf | null;
  uploadedFile: UploadedFileStateIf | null;
  uploadStats: {
    progress: number;
    loaded: string;
    total: string;
  };
  form: UploadFormIf;
}

const initialState: UploadStateIf = {
  file: null,
  uploadedFile: null,
  uploadStats: {
    progress: 0,
    loaded: "",
    total: "",
  },
  form: {
    videoId: "",
    details: {
      coverImgUrl: "",
      description: "",
      location: "",
    },
    settings: {
      postTiming: "now",
      visibility: "everyone",
      interaction: {
        comments: true,
        likes: true,
      },
    },
  },
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setFile: (state, action) => {
      const { payload } = action;
      state.file = payload;
    },

    setUploadedFile: (state, action) => {
      const { payload } = action;
      state.uploadedFile = payload;
    },

    setProgress: (state, action) => {
      const { payload } = action;
      state.uploadStats = payload;
    },

    setUploadForm: (state, action) => {
      const { payload } = action;
      const { videoId, details = {}, settings = {} } = payload;
      const { interaction, ...restSettings } = settings;

      state.form = {
        videoId: state.form.videoId || videoId,
        details: { ...state.form.details, ...details },
        settings: { ...state.form.settings, ...restSettings },
      };

      if (interaction) {
        state.form.settings.interaction = {
          ...state.form.settings.interaction,
          ...interaction,
        };
      }
    },

    resetUpload: () => {
      return initialState;
    },
  },
});

export const {
  setFile,
  setProgress,
  setUploadedFile,
  setUploadForm,
  resetUpload,
} = uploadSlice.actions;

export default uploadSlice.reducer;
