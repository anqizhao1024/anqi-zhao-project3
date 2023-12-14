import {createSlice} from '@reduxjs/toolkit'
import {getCookie, setCookie} from "../cookies";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        username: "",
        desc: "",
        joinedAt: "",
    },
    reducers: {
        logOut: (state) => {
            state.isLoggedIn = false;
            state.username = ""
            setCookie("username", "")
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.username = action.payload

            setCookie("username", action.payload, 14)
        },
        fetchCookie: (state) => {
            let usernameFromCookie = getCookie("username")
            state.isLoggedIn = usernameFromCookie !== "";
            state.username = usernameFromCookie

            setCookie("username", usernameFromCookie, 14)
        }
    },
})
export const {
    login,
    logOut,
    fetchCookie,
} = userSlice.actions

export default userSlice.reducer