import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoryPage {
  id: number;
  title: string;
  text: string;
  choices: { text: string; nextPage: number }[];
}

const storyData: StoryPage[] = [
  {
    id: 1,
    title: "The Beginning",
    text: "You are in a dark cave. There's a path to the left and right.",
    choices: [
      { text: "Go Left", nextPage: 2 },
      { text: "Go Right", nextPage: 3 },
    ],
  },
  {
    id: 2,
    title: "The Left Path",
    text: "You find an old shrine. The door creaks open...",
    choices: [
      { text: "Enter the shrine", nextPage: 4 },
      { text: "Go back", nextPage: 1 },
    ],
  },
  {
    id: 3,
    title: "The Right Path",
    text: "You hear a groan. Something is watching you...",
    choices: [
      { text: "Run!", nextPage: 1 },
      { text: "Stand still", nextPage: 5 },
    ],
  },
];

interface StoryState {
  pages: StoryPage[];
  currentPage: number;
}

const initialState: StoryState = {
  pages: storyData,
  currentPage: 1,
};

const readStorySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    goToPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { goToPage } = readStorySlice.actions;
export default readStorySlice.reducer;