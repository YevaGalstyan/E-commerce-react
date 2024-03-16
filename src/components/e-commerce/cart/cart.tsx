import React, {FC} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import {useSelector} from 'react-redux';
import {cartSelector, productsSelector} from '../../../store/product/selector';
import {CartItem, Product} from '../../../types/product';
import {useAppDispatch} from '../../../store';
import {Button, Card} from 'react-bootstrap';
import {checkoutOrder, rewriteProducts} from '../../../store/product/api';
import {decreaseQuantityFromCart, increaseQuantity, removeItem} from '../../../store/product/slice';
import {userSelector} from '../../../store/auth/selector';
import {User} from '../../../types/user';
import {useNavigate} from 'react-router-dom';
import product from '../product';

const Cart: FC = () => {
    const cartList: CartItem[] = useSelector(cartSelector);
    const user: User | null = useSelector(userSelector);
    const productsList: Product[] = useSelector(productsSelector);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleRemove = (product: Product) => {
        dispatch(removeItem(product))
    }

    const handleDecreaseQuantity = (product: Product) => {
        dispatch(decreaseQuantityFromCart(product))
    }

    const handleIncreaseQuantity = (product: Product) => {
        dispatch(increaseQuantity(product))
    }

    const handleCheckout = () => {
        dispatch(checkoutOrder({
            cartItems: cartList,
            userId: user?.id
        })).then((res) => {
            // Decrease product count when new order is placed

            const updatedProducts: Product[] = [];
            const updatedProductsList = [...productsList]; // Create a mutable copy of productsList

            res.payload.items.forEach((boughtItem: CartItem) => {
                updatedProductsList.forEach((product) => {
                    if (product.id === boughtItem.product.id) {
                        const updatedProduct = {
                            ...product,
                            count: product.count - boughtItem.amount
                        };
                        updatedProducts.push(updatedProduct);
                    }
                });
            });

            updatedProducts.forEach((product) => {
                dispatch(rewriteProducts(product));
            })
            navigate('/orders');
        })
    }

    return (
        <div className="cart_container">
            {cartList.length === 0 ? (
                <div className="empty_cart">
                    <p>Your cart is empty. Please add some items to your cart.</p>
                </div>
            ) : (
                cartList.map(item => (
                    <Card style={{display: 'flex', flexDirection: 'row'}} key={item.product.id}>
                        <Card.Img className="cart_img" variant="top" src={item.product.imageUrl}/>
                        <Card.Body>
                            <Card.Title>{item.product.title}</Card.Title>
                            <Card.Text>{item.product.description}</Card.Text>
                            <Card.Text style={{color: 'green'}}>{item.product.price + ' €'}</Card.Text>
                            <div>
                                {item.amount === 1 ? (
                                    <Button onClick={() => handleRemove(item.product)} variant="danger">Remove from Cart</Button>
                                ) : (
                                    <div className="quantity_buttons">
                                        <Button onClick={() => handleDecreaseQuantity(item.product)} variant="outline-secondary">-</Button>
                                        <span className="quantity">{item.amount}</span>
                                        <Button onClick={() => handleIncreaseQuantity(item.product)} variant="outline-secondary">+</Button>
                                    </div>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
            {cartList.length ? <Button onClick={handleCheckout} style={{maxWidth: 300}} variant="success">Checkout</Button> : ''}
        </div>
    )
}

export default Cart;