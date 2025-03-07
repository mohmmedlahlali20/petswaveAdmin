import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../Slice/userSlice.ts'
import PetsReducer from '../Slice/petSlice.ts'
import categoryReducer from '../Slice/categorySlice.ts'
import commandReducer from '../Slice/commandSlice.ts'



const store = configureStore({
  reducer: {
    User: UserReducer,
    pet: PetsReducer,
    category: categoryReducer,
    command: commandReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;