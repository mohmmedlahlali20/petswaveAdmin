import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../constant/type";
import { createCategoryApi, getCategoryApi, removeCategoryApi } from "../service/api/category";

const initialState: {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
} = {
  categories: [],
  isLoading: false,
  error: null,
};

export const addCategory = createAsyncThunk(
  "Category/add",
  async (name: string, { rejectWithValue }) => {
    try {
      return await createCategoryApi(name);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getAllCategory = createAsyncThunk(
  "Category/get",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoryApi();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "category/remove",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      return await removeCategoryApi(categoryId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(removeCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(category => category._id !== action.payload._id);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
