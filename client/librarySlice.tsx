import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a story type
interface Story {
  id: number;
  title: string;
  cover: string;
}

// Define the Library state
interface LibraryState {
  writtenStories: Story[];
  savedStories: Story[];
}

const initialState: LibraryState = {
  writtenStories: [
    { id: 1, title: "My First Story", cover: "/cover1.jpg" },
    { id: 2, title: "Adventure Begins", cover: "/cover2.jpg" },
  ],
  savedStories: [
    { id: 3, title: "The Dark Forest", cover: "/cover3.jpg" },
    { id: 4, title: "A Hero’s Journey", cover: "/cover4.jpg" },
  ],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addWrittenStory: (state, action: PayloadAction<Story>) => {
      state.writtenStories.push(action.payload);
    },
    addSavedStory: (state, action: PayloadAction<Story>) => {
      state.savedStories.push(action.payload);
    },
  },
});

export const { addWrittenStory, addSavedStory } = librarySlice.actions;
export default librarySlice.reducer;