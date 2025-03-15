import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Story {
  id: number;
  title: string;
}

const initialState: { stories: Story[] } = {
  stories: [
    { id: 1, title: "The Unexpected PlotTwist" },
    { id: 2, title: "A PlotTwist's Twisty Twist" },
  ],
};

const storySlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStory: (state, action: PayloadAction<Story>) => {
      state.stories.push(action.payload);
    },
  },
});

export const { addStory } = storySlice.actions;
export default storySlice.reducer;