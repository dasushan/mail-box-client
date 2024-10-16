import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: [],
    sent: [],
    selectedEmail: null
}

const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setEmails: (state, action) => {
            state.emails = action.payload
        },
        setSent: (state, action) => {
            state.sent = action.payload;
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        }
    }
})

export const { setEmails, setSelectedEmail, setSent } = emailSlice.actions;
export default emailSlice