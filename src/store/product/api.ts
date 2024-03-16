import {createAsyncThunk} from '@reduxjs/toolkit';
import {CartItem, Product} from '../../types/product';

export const getProducts = createAsyncThunk(
    'home/getProducts',
    async (_, {rejectWithValue}) => {
        try {
            const res = await fetch('http://localhost:8080/products');
            return await res.json();
        } catch (e) {
            return rejectWithValue('Something');
        }
    }
)

export const rewriteProducts = createAsyncThunk(
    'home/rewriteProducts',
    async (productData: Product, {rejectWithValue}) => {

        try {
            const res = await fetch(`http://localhost:8080/products/${productData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            return await res.json();
        } catch (error) {
            return rejectWithValue('Something went wrong');
        }
    }
);

export const addProduct = createAsyncThunk(
    'home/addProduct',
    async (productData: Product, {rejectWithValue}) => {
        try {
            const res = await fetch('http://localhost:8080/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            return await res.json();
        } catch (error) {
            return rejectWithValue('Something went wrong');
        }
    }
);


export const getOrders = createAsyncThunk(
    'home/getOrders',
    async (id: number | undefined, {rejectWithValue}) => {
        try {
            const res = await fetch(`http://localhost:8080/orders?userId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await res.json();
        } catch (e) {
            return rejectWithValue('Something went wrong');
        }
    }
)

export const checkoutOrder = createAsyncThunk(
    'home/createOrder',
    async (data: { cartItems: CartItem[], userId: number | undefined }, {rejectWithValue}) => {

        const finalPrice = data.cartItems.reduce((total, cartItem) => {
            return total + cartItem.amount * cartItem.product.price;
        }, 0);

        const order = {
            date: new Date().toISOString(),
            items: data.cartItems,
            userId: data.userId,
            finalPrice: finalPrice
        };

        try {
            const res = await fetch(`http://localhost:8080/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            return await res.json();
        } catch (error) {
            return rejectWithValue('Something went wrong');
        }
    }
)