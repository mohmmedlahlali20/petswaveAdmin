import { User } from "../../constant/type.ts";
import { GetAllUsers, loginApi } from "../service/api/user.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    isOTPVerified: boolean;
    users: User[] 
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
    users: []
};


export const Login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await loginApi({ email, password });
            const { token, user } = res;
            Cookies.set('token', token);
            Cookies.set('User', user);
            return { token, user };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);


export const GettingUsers = createAsyncThunk('user/GetAll', async (_, { rejectWithValue }) => {
    try {
        const res = await GetAllUsers()
        return res || []
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || ' failed to get users');

    }
})


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
            .addCase(GettingUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(GettingUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.users = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(GettingUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
}));

export default UserSlice.reducer
