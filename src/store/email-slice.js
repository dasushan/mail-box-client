import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: [],
    selectedEmail: null
}

const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setEmails: (state, action) => {
            state.emails = action.payload
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        }
    }
})

export const { setEmails, setSelectedEmail } = emailSlice.actions;
export default emailSlice