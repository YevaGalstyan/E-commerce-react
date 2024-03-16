import { createSelector } from '@reduxjs/toolkit';
import {RootState} from '../index';

export const selector = (state: RootState) => state.product;

export const productsSelector = createSelector(selector, (product) => product.products);
export const cartSelector = createSelector(selector, (product) => product.cart);
export const productSelector = createSelector(selector, (product) => product.currentProduct);
export const ordersSelector = createSelector(selector, (product) => product.orders);




