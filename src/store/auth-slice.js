import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: null,
    emailId: '',
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.idToken;
            state.emailId = action.payload.email;
            localStorage.setItem('token', state.token);
            localStorage.setItem('email', state.emailId);
            state.isLoggedIn = true;
        },
        getAuthStatus: (state, action) => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            state.token = token;
            state.emailId = email;
            state.isLoggedIn = !!token;
        }
    }
})

export const authActions = authSlice.actions
export default authSlice