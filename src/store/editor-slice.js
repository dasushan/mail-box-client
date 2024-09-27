import { createSlice } from "@reduxjs/toolkit";
import { EditorState, convertToRaw } from "draft-js";

const initialState = {
    editorState: EditorState.createEmpty(),
}

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        onChange: (state, action) => {
            const newEditorState = action.payload;
            const contentState = newEditorState.getCurrentContent();
            
            console.log(convertToRaw(contentState))
            state.editorState = newEditorState;
        }
    }
})

export const editorActions = editorSlice.actions;
export default editorSlice;
