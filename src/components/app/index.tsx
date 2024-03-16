import React, {FC, useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from '../e-commerce/home';
import Auth from '../auth/auth';
import Login from '../auth/login';
import Register from '../auth/register';
import {User} from '../../types/user';
import {useSelector} from 'react-redux';
import {userSelector} from '../../store/auth/selector';
import Products from '../e-commerce/products';
import ProductItem from '../e-commerce/product';
import {productSelector} from '../../store/product/selector';
import {Product} from '../../types/product';
import Cart from '../e-commerce/cart/cart';
import Orders from '../e-commerce/orders/orders';
import {useAppDispatch} from '../../store';
import {getUser} from '../../store/auth/slice';
import Profile from '../profile';
import NewProduct from '../e-commerce/new-product';

const App: FC = () => {

    const user: User | null = useSelector(userSelector);
    const product: Product | null = useSelector(productSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser())
    }, [])

    const isLoggedIn = () => {
        return user
    };

    return (
        <Routes>
            <Route path="/auth" element={isLoggedIn() ? <Navigate to="/"/> : <Auth/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
            <Route path="/" element={isLoggedIn() ? <Home/> : <Navigate to="/auth/login"/>}>
                <Route index element={<Navigate to="/products"/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="orders" element={<Orders/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="newProduct" element={<NewProduct/>}/>
                <Route path="product/:id" element={product ? <ProductItem/> : <Navigate to="/products"/>}/>
            </Route>
        </Routes>
    )
}

export default App;