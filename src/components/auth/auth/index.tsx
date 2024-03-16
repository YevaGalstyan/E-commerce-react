import React, {FC, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import {useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import {initialPage} from '../../../types/user';

const Auth: FC = () => {
    const initialState: initialPage = 'login'
    const [currentPage, setCurrentPage] = useState<string>(initialState);
    const navigate = useNavigate();

    const handleButtonClick = (route: string) => {
        setCurrentPage(route);
        navigate(route);
    };

    const loginVariant = currentPage === 'register';

    return (
        <div className="auth_container">
            <div className="auth_content">
                <div className="auth_buttons">
                    <Button variant={!loginVariant ? 'primary' : 'light'} onClick={() => handleButtonClick('login')}>Login</Button>{' '}
                    <Button variant={loginVariant ? 'primary' : 'light'} onClick={() => handleButtonClick('register')}>Register</Button>{' '}
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Auth;