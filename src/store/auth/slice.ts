import {createSlice} from '@reduxjs/toolkit';
import {UserState} from '../../types/user';
import {authenticateUser, createUser, editUser, getUsers} from './api';

const initialState: UserState = {
    users: [],
    user: null,
    authenticationError: ''
}

const appSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (initialState) => {
            const user = JSON.parse(localStorage.getItem('activeUser') || '{}')
            if(!Object.keys(user).length) {
                initialState.user = null
            } else {
                initialState.user = user
            }

        },
        logOut: (initialState) => {
            initialState.user = null;
            localStorage.removeItem('activeUser');
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });

        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.user = action.payload
            localStorage.setItem('activeUser', JSON.stringify(action.payload))
        });

        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.authenticationError = action.payload as string
        });

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.user = action.payload
            localStorage.setItem('activeUser', JSON.stringify(action.payload))
        });

        builder.addCase(createUser.rejected, (state, action) => {
            state.authenticationError = action.payload  as string
        });

        builder.addCase(editUser.fulfilled, (state, action) => {
            state.user = action.payload
            localStorage.setItem('activeUser', JSON.stringify(action.payload))
        });
    }
})

export const {
    getUser,
    logOut
} = appSlice.actions;

export default appSlice.reducer;