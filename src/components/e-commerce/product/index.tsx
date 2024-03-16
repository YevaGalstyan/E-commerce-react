import React, {FC} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import {useSelector} from 'react-redux';
import {cartSelector, productSelector} from '../../../store/product/selector';
import {CartItem, Product} from '../../../types/product';
import {Breadcrumb, Button, NavLink} from 'react-bootstrap';
import {addItem, decreaseQuantity, increaseQuantity, setCurrentProduct} from '../../../store/product/slice';
import {useAppDispatch} from '../../../store';
import {Link} from 'react-router-dom';

const ProductItem: FC = () => {
    const productItem: Product | null = useSelector(productSelector);
    const cartList: CartItem[] = useSelector(cartSelector);
    const dispatch = useAppDispatch();

    const handleDecreaseQuantity = () => {
        dispatch(decreaseQuantity(productItem))
    }

    const handleIncreaseQuantity = () => {
        dispatch(increaseQuantity(productItem))
    }

    const handleAddProduct = () => {
        dispatch(addItem(productItem))
    }

    return (
        <div className="product_item_container">
            <Breadcrumb>
                <Breadcrumb.Item linkProps={{ to: '/products' }} linkAs={Link} href="/products">Product List</Breadcrumb.Item>
                <Breadcrumb.Item active>{productItem?.title}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="product_item">
                <div className="product_img">
                    <img src={productItem?.imageUrl}/>
                </div>

                <div className="product_details_container">
                    <h3>{productItem?.title}</h3>
                    <div className="product_details">
                        <span style={{maxWidth: 500}}>{productItem?.description}</span>
                        <span style={{color: 'orange'}}>Currently Available: {productItem?.count}</span>
                    </div>
                    <span style={{color: 'green'}}>{productItem?.price + ' €'}</span>
                    <div>
                        {!cartList.find(item => item.product.id === productItem?.id) ? <Button onClick={() => handleAddProduct()} variant="success">Add to Cart</Button> :
                            <div className="quantity_buttons">
                                <Button onClick={() => handleDecreaseQuantity()} variant="outline-secondary">-</Button>
                                <span className="quantity">{cartList.find(item => item.product.id === productItem?.id)?.amount}</span>
                                <Button onClick={() => handleIncreaseQuantity()} variant="outline-secondary">+</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;