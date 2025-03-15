import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storyReducer from "./homeSlice";
import libraryRecducer from "./storySlice";

// const rootReducer = combineReducers({
    
// })

const store = configureStore({
    reducer: {
        stories: storyReducer,
        library: libraryReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
export default store;
