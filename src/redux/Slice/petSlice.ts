import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pets } from "../../constant/type";
import { addPetsApi, getPetsApi } from "../service/api/pets";





const initialState: {
    isLoading: boolean,
    error: string | null,
    pets: Pets[],
    petSelected: Pets | null,


} = {
    isLoading: false,
    error: null,
    pets: [],
    petSelected: null
}


export const addPets = createAsyncThunk(
    "pets/add",
    async ({ petData, images }: { petData: Pets; images: File[] }, { rejectWithValue }) => {
        try {
            return await addPetsApi(petData, images);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);


export const getPets = createAsyncThunk('pets/get',
    async (_, { rejectWithValue }) => {
        try {
            return await getPetsApi()

        } catch (err: any) {
            return rejectWithValue(err.message);

        }
    })



const petSlice = createSlice({
    name: "Pets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addPets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pets.push(action.payload);
            })
            .addCase(addPets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getPets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPets.fulfilled, (state, action: PayloadAction<Pets[]>) => {
                state.pets = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getPets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
});



export default petSlice.reducer