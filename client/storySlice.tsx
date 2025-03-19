import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Story {
  id: number;
  title: string;
  cover: string;
  bio: string;
}

const initialState: Story = {
  id: 1,
  title: "The Unexpected Twist",
  cover: "/cover.jpg",
  bio: "A mystery story full of surprises.",
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    updateStory: (state, action: PayloadAction<Story>) => {
      return action.payload; // Replaces the story
    },
  },
});

export const { updateStory } = storySlice.actions;
export default storySlice.reducer;