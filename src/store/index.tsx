import {configureStore} from '@reduxjs/toolkit';
import userReducer from './auth/slice'
import productReducer from './product/slice'
import {useDispatch} from 'react-redux';

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
