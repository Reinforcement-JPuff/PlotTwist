import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: number;
  username: string;
  text: string;
}

const initialState: Comment[] = [
  { id: 1, username: "User12", text: "OMG this story is good!!!" },
  { id: 2, username: "User14", text: "OMG THIS STORY IS BAD!!!!" },
];

const commentsSlice = createSlice({
  name: "comments",
  initialState : [] as string[],
  reducers: {
    addComment: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;