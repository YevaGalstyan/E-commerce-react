import React, {FC, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import {useSelector} from 'react-redux';
import {ordersSelector} from '../../../store/product/selector';
import {Order} from '../../../types/product';
import {userSelector} from '../../../store/auth/selector';
import {User} from '../../../types/user';
import {Accordion, Card} from 'react-bootstrap';
import {getOrders} from '../../../store/product/api';
import {useAppDispatch} from '../../../store';

const Orders: FC = () => {
    const user: User | null = useSelector(userSelector);
    const orders: Order[] = useSelector(ordersSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getOrders(user?.id))
    }, [])

    return (
        <div className="order_container">
            {orders.length === 0 ? (
                <div className="empty_order">
                    <p>Your currently do not have orders.</p>
                </div>
            ) : (
                <Accordion defaultActiveKey="1">
                    {
                        orders.map(order => (
                            <Accordion.Item key={order.id} eventKey={order.id}>
                                <Accordion.Header>
                                    <div>
                                        Order date: {new Date(order.date).toDateString()}
                                        <span style={{color: 'green', marginLeft: 10}}>Final price: {order.finalPrice}</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {order.items.map(item => (
                                        <Card key={item.product.id}>
                                            <Card.Body>
                                                <Card.Title>{item.product.title}</Card.Title>
                                                <Card.Text>{item.product.price}</Card.Text> <Card.Text>Amount: {item.amount}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))
                    }
                </Accordion>
            )}
        </div>
    )
}

export default Orders;