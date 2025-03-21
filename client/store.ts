import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice"; 
import storyReducer from "./storySlice"; 
import commentsReducer from "./commentsSlice";
import readStoryReducer from "./readStorySlice"; 
import libraryReducer from "./librarySlice";
import loginReducer from "./loginSlice";
import { apiSlice } from "./features/apiSlice";
//import { combineReducers } from "redux";

// const rootReducer = combineReducers({
    
// })

const store = configureStore({
    reducer: {
        login: loginReducer,
        home: homeReducer,
        stories: storyReducer,
        comments: commentsReducer,
        library: libraryReducer, 
        readStory: readStoryReducer,
        [apiSlice.reducerPath]: apiSlice.reducer 
    }, 
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
export default store;
