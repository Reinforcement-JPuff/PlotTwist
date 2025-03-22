import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Story {
  id: number;
  title: string;
  cover: string;
  bio: string;
}

export interface StoryState {
  stories: Story[]; 
  currentStory?: Story
}

const initialState: StoryState = {
  stories: [
    { id: 1, 
      title: "The Unexpected Twist", 
      cover: "/cover.jpg", 
      bio: "A mystery story full of surprises." 
    },
  ],
  currentStory: undefined,
};

const storySlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    setCurrentStory: (state, action: PayloadAction<number>) => {
      state.currentStory = state.stories.find((story) => story.id === action.payload);
    },
  },
});

export const { setCurrentStory } = storySlice.actions;
export default storySlice.reducer;