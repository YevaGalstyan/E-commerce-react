import {createSlice} from '@reduxjs/toolkit';
import {Product, ProductState} from '../../types/product';
import {checkoutOrder, getOrders, getProducts} from './api';

const initialState: ProductState = {
    products: [],
    defaultProducts: [],
    cart: [],
    orders: [],
    currentProduct: null,
}

const appSlice = createSlice({
    initialState,
    name: 'product',
    reducers: {
        decreaseQuantity: (initialSate, action) => {
            const {id} = action.payload;
            const index = initialSate.cart.findIndex(item => item.product.id === id);

            if (index !== -1) {
                if (initialSate.cart[index].amount === 1) {
                    initialSate.cart.splice(index, 1);
                } else {
                    initialSate.cart[index].amount--;
                }
            }

            localStorage.setItem('cart', JSON.stringify(initialSate.cart))
        },
        decreaseQuantityFromCart: (initialSate, action) => {
            const {id} = action.payload;
            const index = initialSate.cart.findIndex(item => item.product.id === id);

            if (index !== -1) {
                if (initialSate.cart[index].amount !== 1) {
                    initialSate.cart[index].amount--;
                }
            }
            localStorage.setItem('cart', JSON.stringify(initialSate.cart))
        },

        removeItem: (initialSate, action) => {
            const {id} = action.payload;
            const index = initialSate.cart.findIndex(item => item.product.id === id);

            initialSate.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(initialSate.cart))
        },

        increaseQuantity: (initialSate, action) => {
            initialSate.cart.find(item => {
                if (item.product.id === action.payload.id && item.amount < action.payload.count) {
                    item.amount++
                }
            })
            localStorage.setItem('cart', JSON.stringify(initialSate.cart))
        },

        addItem: (initialSate, action) => {
            initialSate.cart.push({
                amount: 1,
                product: action.payload
            })
            localStorage.setItem('cart', JSON.stringify(initialSate.cart))
        },

        setCurrentProduct: (initialState, action) => {
            initialState.currentProduct = action.payload
        },

        sortProducts: (initialState, action) => {
            switch (action.payload) {
                case '1':
                    initialState.products = initialState.products.sort((a, b) => a.price - b.price);
                    break;
                case '2':
                    initialState.products = initialState.products.sort((a, b) => b.price - a.price);
                    break;
            }
        },

        getCart: (initialState) => {
            initialState.cart = JSON.parse(localStorage.getItem('cart') || '[]')
        },

        searchProduct: (initialState, action) => {
            const searchTerm = action.payload.toLowerCase();
            initialState.products = initialState.defaultProducts.filter(product =>
                product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
            );
        },

        filterPrice: (initialState, action) => {
            initialState.products = initialState.defaultProducts.filter(product => {
                console.log(product.price >= action.payload.minPrice && product.price <= action.payload.maxPrice);
                return product.price >= action.payload.minPrice && product.price <= action.payload.maxPrice;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload.sort((a: Product, b: Product) => b.id - a.id);
            state.defaultProducts = state.products
        });

        builder.addCase(checkoutOrder.fulfilled, (state, action) => {
            state.cart = [];
            localStorage.removeItem('cart');
        });

        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    }
})

export const {
    decreaseQuantity,
    increaseQuantity,
    sortProducts,
    setCurrentProduct,
    addItem,
    decreaseQuantityFromCart,
    removeItem,
    getCart,
    searchProduct,
    filterPrice
} = appSlice.actions;


export default appSlice.reducer;