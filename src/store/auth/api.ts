import {createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '../../types/user';
import {RootState} from '../index';

export const getUsers = createAsyncThunk(
    'home/getUsers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:8080/users');
            return await res.json();
        } catch (e) {
            return rejectWithValue('Something');
        }
    }
);

export const editUser = createAsyncThunk(
    'home/editUser',
    async (data: { id: number | undefined, updatedUserData: User }, { rejectWithValue }) => {
        try {
            const res = await fetch(`http://localhost:8080/users/${data.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const existingUser = await res.json();
            if (!existingUser) {
                return rejectWithValue('User not found');
            }

            const updatedUser = { ...existingUser, ...data.updatedUserData };

            const editUserRes = await fetch(`http://localhost:8080/users/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            return await editUserRes.json();
        } catch (error) {
            return rejectWithValue('Something went wrong');
        }
    }
);


export const createUser = createAsyncThunk(
    'home/createUser',
    async (user: User, { rejectWithValue }) => {
        try {
            const res = await fetch(`http://localhost:8080/users?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const existingUser = await res.json();
            if (existingUser.length) {
                return rejectWithValue('User with this email already exists');
            }
            const createUserRes = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            return await createUserRes.json();
        } catch (error) {
            return rejectWithValue('Something went wrong');
        }
    }
);

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async (user: User, { rejectWithValue, dispatch , getState}) => {
        try {
            await dispatch(getUsers())
            const state = getState() as RootState; // Cast to RootState
            const users = state.user.users;

            const { email, password } = user;
            const authenticatedUser = users.find((user: User) => user.email === email && user.password === password);

            if (authenticatedUser) {
                return authenticatedUser;
            } else {
                return rejectWithValue('Invalid email or password');
            }
        } catch (error) {
            return rejectWithValue('Authentication failed');
        }
    }
);