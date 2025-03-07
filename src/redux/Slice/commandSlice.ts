import { createSlice } from "@reduxjs/toolkit"
import { Commands } from "../../constant/type"


const initialState:{
    isLoading: boolean,
    error: string | null
    commands: Commands[]
} ={
    isLoading: false,
    error: null,
    commands: []
}



const commandSlice = createSlice({
    name: "Commad",
    initialState,
    reducers:{},
    extraReducers: async (builder) => {
        builder

    }
});



export default commandSlice.reducer