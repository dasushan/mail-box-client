import { configureStore } from '@reduxjs/toolkit';

import editorSlice from './editor-slice';
const store = configureStore({
  reducer: {
    editor: editorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
