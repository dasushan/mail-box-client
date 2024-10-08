import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: [],
}

const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setEmails: (state, action) => {
            state.emails = action.payload
        }
    }
})

export const { setEmails } = emailSlice.actions;
export default emailSlice