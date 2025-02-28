import {User} from "../../constant/type.ts";
import {loginApi} from "../service/api/user.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


const initialState: {
    user: User | null;
    userProfile: User | null
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    token: string | null;
    userId: string | null;
    isOTPSent: boolean;
    isOTPVerified: boolean
} = {
    user: null,
    userProfile: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    token: null,
    userId: null,
    isOTPSent: false,
    isOTPVerified: false,
};


export const Login = createAsyncThunk(
    'user/login',
    async ({email, password}: { email: string; password: string }, {rejectWithValue}) => {
        try {
            const res = await loginApi({email, password});
            const {token, user} = res;
            Cookies.set('token', token);
            Cookies.set('User', user);
            return {token, user};
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);


const UserSlice = createSlice(({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(Login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
}));

export default  UserSlice.reducer
