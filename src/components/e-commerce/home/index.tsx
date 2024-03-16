import React, {FC, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import {Container, Nav, Navbar, NavDropdown, NavLink} from 'react-bootstrap';
import {Link, Outlet} from 'react-router-dom';
import {useAppDispatch} from '../../../store';
import {logOut} from '../../../store/auth/slice';
import {getCart} from '../../../store/product/slice';
import {useSelector} from 'react-redux';
import {userSelector} from '../../../store/auth/selector';
import {User} from '../../../types/user';

const Home: FC = () => {
    const dispatch = useAppDispatch();
    const user: User | null = useSelector(userSelector)
    const handleLogOut = () => {
        dispatch(logOut())
    }

    useEffect(() => {
       dispatch(getCart())
    }, [])

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/products">E-Commerce App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse style={{justifyContent: 'space-between'}}  id="basic-navbar-nav">
                        <Nav activeKey={location.pathname} className="me-auto">
                            <Nav.Link as={Link} to="/products" href="/products">Products</Nav.Link>
                            <Nav.Link as={Link} to="/cart" href="/cart">Cart</Nav.Link>
                            <Nav.Link as={Link} to="/orders" href="/orders">Orders</Nav.Link>
                        </Nav>
                        <Nav activeKey={location.pathname} className="me-auto">
                            <Nav.Link as={Link} to="/profile" href="/profile">{user?.firstName + ' ' + user?.lastName}</Nav.Link>
                            {user?.isAdmin ?
                                <NavDropdown title="Admin" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/newProduct" href="/newProduct">Add Product</NavDropdown.Item>
                                </NavDropdown> : ''}
                            <Nav.Link as={Link} to="/auth/login" onClick={handleLogOut}>Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet/>
        </div>
    )
}

export default Home;