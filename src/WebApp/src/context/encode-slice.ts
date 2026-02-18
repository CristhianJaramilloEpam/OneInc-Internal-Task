import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EncodeCharResponse } from "../models/encode-char-response";
import { set } from "react-hook-form";

export interface EncodeState {
  encodedChars?: string[];
  progress?: number;
  isStreaming?: boolean;
}

const initialState: EncodeState = {
  encodedChars: [],
  progress: 0,
  isStreaming: false,
};

export const encodeSlice = createSlice({
  name: "encode",
  initialState,
  reducers: {
    setNewEncodedChar: (state, action: PayloadAction<EncodeCharResponse>) => {
      if (!state.encodedChars) state.encodedChars = [];
      state.encodedChars.push(action.payload.encodedChar);
      state.progress = action.payload.progress;
      state.isStreaming = true;
    },
    setIsStreaming: (state, action: PayloadAction<boolean>) => {
      state.isStreaming = action.payload;
    },
    resetEncodedChars: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setNewEncodedChar, resetEncodedChars, setIsStreaming } = encodeSlice.actions;
