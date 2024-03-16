import React, {FC, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {User} from '../../../types/user';
import {useAppDispatch} from '../../../store';
import {authenticateUser} from '../../../store/auth/api';
import {useSelector} from 'react-redux';
import {errorSelector, userSelector} from '../../../store/auth/selector';
import {useNavigate} from 'react-router-dom';

const Login: FC = () => {

    const initialState: User = {
        id: 0,
        password: 'YevaGalstyan',
        firstName: '',
        lastName: '',
        imageUrl: '',
        email: 'yeva.galstyan@gmail.com',
        phone: '',
        isAdmin: false,
    }
    const navigate = useNavigate();
    const user: User | null = useSelector(userSelector);
    const error: string = useSelector(errorSelector);
    const dispatch = useAppDispatch();
    const [currentUser, setUser] = useState(initialState);
    const handleUserChange = (e: any, key: string) => {
        const value = e.target.value;
        setUser({
            ...currentUser,
            [key]: value,
        });
    }

    const isFormValid = () => {
        return currentUser.email.trim() !== '' && currentUser.password.trim() !== '';
    };

    const submit = () => {
        dispatch(authenticateUser(currentUser)).then(res => {
            if(user) {
                navigate('/products')
            }
        })
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                              value={currentUser.email}
                              onChange={(event) => handleUserChange(event, 'email')}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              value={currentUser.password}
                              onChange={(event) => handleUserChange(event, 'password')}/>
                <Form.Text>{error}</Form.Text>
            </Form.Group>

            <Button disabled={!isFormValid()} onClick={submit}
                    variant="success" type="button">
                Login
            </Button>
        </Form>
    )
}

export default Login;