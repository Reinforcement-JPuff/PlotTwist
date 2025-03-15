import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Story {
  id: number;
  title: string;
  cover: string;
  bio: string;
}

interface LibraryState {
  savedStories: Story[];
}

const initialState: LibraryState = {
  savedStories: [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToLibrary: (state, action: PayloadAction<Story>) => {
      const storyExists = state.savedStories.find(
        (story) => story.id === action.payload.id
      );
      if (!storyExists) {
        state.savedStories.push(action.payload);
      }
    },
  },
});

export const { addToLibrary } = librarySlice.actions;
export default librarySlice.reducer;