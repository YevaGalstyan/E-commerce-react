import { createSelector } from '@reduxjs/toolkit';
import {RootState} from '../index';

export const selector = (state: RootState) => state.user;

export const userSelector = createSelector(selector, (user) => user.user);

export const errorSelector = createSelector(selector, (user) => user.authenticationError);
