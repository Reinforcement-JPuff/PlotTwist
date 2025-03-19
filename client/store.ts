import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storyReducer from "./homeSlice";
import storiesReducer from "./storySlice";
import commentsReducer from "./commentsSlice";
import readStorySliceReducer from "./readStorySlice";

// const rootReducer = combineReducers({
    
// })

const store = configureStore({
    reducer: {
        stories: storyReducer,
        comments: commentsReducer,
        story: storiesReducer,
        readStory: readStorySliceReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
export default store;
