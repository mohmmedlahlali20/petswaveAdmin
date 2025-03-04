import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Category } from "../../constant/type"
import { createCategoryApi, getCategoryApi } from "../service/api/category"


const initialState: {
    categories: Category[],
    isLoading: Boolean,
    error: string | null
} = {
    categories: [],
    isLoading: false,
    error: null
}

export const addCategory = createAsyncThunk(
    "Category/add",
    async (name: string, { rejectWithValue }) => {
        try {
            return await createCategoryApi(name);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
)

export const getAllCategory = createAsyncThunk('Category/get',
    async (_, { rejectWithValue }) => {
        try {
            return await getCategoryApi()

        } catch (err: any) {  
            return rejectWithValue(err.message);

        }
    })


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
    }
});

export default categorySlice.reducer