import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
    username: string;
    password: string;
}

const initialState: LoginState = {
    username: "",
    password: "",
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; password: string }>) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        newLogin: (state, action: PayloadAction<{ username: string; password: string }>) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
    }
})

export const { login, newLogin } = loginSlice.actions;
export default loginSlice.reducer;
