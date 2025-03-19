import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice"; 
import storyReducer from "./storySlice"; 
import commentsReducer from "./commentsSlice";
import readStoryReducer from "./readStorySlice"; 
import libraryReducer from "./librarySlice";
// const rootReducer = combineReducers({
    
// })

const store = configureStore({
    reducer: {
        home: homeReducer,
        stories: storyReducer,
        comments: commentsReducer,
        library: libraryReducer, 
        readStory: readStoryReducer, 
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
export default store;
