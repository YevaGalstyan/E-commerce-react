import React, {FC, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home/style.scss'
import {Button, Card, Form} from 'react-bootstrap';
import {CartItem, Product} from '../../../types/product';
import {useSelector} from 'react-redux';
import {cartSelector, productsSelector} from '../../../store/product/selector';
import {useAppDispatch} from '../../../store';
import {getProducts} from '../../../store/product/api';
import {addItem, decreaseQuantity, increaseQuantity, searchProduct, setCurrentProduct, sortProducts} from '../../../store/product/slice';
import {useNavigate} from 'react-router-dom';
import Filters from './filters';

const Products: FC = () => {

    const productsList: Product[] = useSelector(productsSelector);
    const dispatch = useAppDispatch();
    const cartList: CartItem[] = useSelector(cartSelector);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const handleDecreaseQuantity = (product: Product) => {
        dispatch(decreaseQuantity(product))
    }

    const handleIncreaseQuantity = (product: Product) => {
        dispatch(increaseQuantity(product))
    }

    const handleProductDetails = (product: Product) => {
        navigate('/product/' + product.id)
        dispatch(setCurrentProduct(product))
    }

    const handleAddProduct = (product: Product) => {
        dispatch(addItem(product))
    }

    return (
        <div className="product_list_container">
            <Filters products={productsList}/>

            <div className="product_list">
                {productsList.map(product => (
                    <Card key={product.id}>
                        <Card.Img className="card_img" onClick={() => handleProductDetails(product)} variant="top" src={product.imageUrl}/>
                        <Card.Body>
                            <Card.Title className="title">{product.title}</Card.Title>
                            <Card.Text className="movie_information">
                                {product.price + ' €'}
                            </Card.Text>
                            <Card.Text className="movie_information">
                                Currently Available: {product.count}
                            </Card.Text>
                            <div>
                                {!cartList.find(item => item.product.id === product.id) ? <Button onClick={() => handleAddProduct(product)} variant="success">Add to Cart</Button> :
                                    <div className="quantity_buttons">
                                        <Button onClick={() => handleDecreaseQuantity(product)} variant="outline-secondary">-</Button>
                                        <span className="quantity">{cartList.find(item => item.product.id === product.id)?.amount}</span>
                                        <Button onClick={() => handleIncreaseQuantity(product)} variant="outline-secondary">+</Button>
                                    </div>
                                }
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

        </div>
    )
}

export default Products;