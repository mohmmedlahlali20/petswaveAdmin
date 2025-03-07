import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Commands } from "../../constant/type"
import { GetAllCommandesApi } from "../service/api/command"


const initialState: {
    isLoading: boolean,
    error: string | null
    commands: Commands[]
} = {
    isLoading: false,
    error: null,
    commands: []
}


export const GetAllCommandes = createAsyncThunk('command/getAll',
    async (_, { rejectWithValue }) => {
        try {
            return await GetAllCommandesApi()

        } catch (err: any) {
            return rejectWithValue(err.message);
        }

    })



const commandSlice = createSlice({
    name: "Commad",
    initialState,
    reducers: {},
    extraReducers: async (builder) => {
        builder
            .addCase(GetAllCommandes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(GetAllCommandes.fulfilled, (state, action: PayloadAction<Commands[]>) => {
                state.commands = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(GetAllCommandes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }


});



export default commandSlice.reducer