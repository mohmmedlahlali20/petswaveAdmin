import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../Slice/userSlice.ts'



const store = configureStore({
  reducer: {
    User: UserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;