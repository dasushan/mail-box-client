import { configureStore } from '@reduxjs/toolkit';

import editorSlice from './editor-slice';
import authSlice from './auth-slice';
import emailSlice from './email-slice';
const store = configureStore({
  reducer: {
    editor: editorSlice.reducer,
    auth: authSlice.reducer,
    emails: emailSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
