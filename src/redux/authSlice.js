import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        register: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
    }
})

export const {
    registerFailed,
    registerSuccess,
    registerStart
} = authSlice.actions;

export default authSlice.reducer;