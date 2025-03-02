import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../Slice/userSlice.ts'
import PetsReducer from '../Slice/petSlice.ts'



const store = configureStore({
  reducer: {
    User: UserReducer,
    pet: PetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;