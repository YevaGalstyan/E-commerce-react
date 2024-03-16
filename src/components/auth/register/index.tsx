import React, {FC, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from 'react-bootstrap';
import {User} from '../../../types/user';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../store';
import {createUser} from '../../../store/auth/api';
import {useSelector} from 'react-redux';
import {errorSelector, userSelector} from '../../../store/auth/selector';

const Register: FC = () => {

    const initialState: User = {
        id: 0,
        password: '',
        firstName: '',
        lastName: '',
        imageUrl: '',
        email: '',
        phone: '',
        isAdmin: false,
    }
    const [currentUser, setUser] = useState(initialState);
    const navigate = useNavigate();
    const user: User | null = useSelector(userSelector);
    const error: string = useSelector(errorSelector);
    const dispatch = useAppDispatch();

    const handleUserChange = (value: any, key: string) => {
        setUser({
            ...currentUser,
            [key]: value,
        });
    }

    const isFormValid = () => {
        return currentUser.email.trim() !== '' && currentUser.password.trim() !== ''
            && currentUser.firstName.trim() !== '' && currentUser.lastName.trim() !== ''
            && currentUser.phone.trim() !== '';
    };

    const submit = () => {
        dispatch(createUser(currentUser)).then(res => {
            if(user) {
                navigate('/')
            }
        })
    }

    return (
        <Form>
            <Form.Group className="mb-1" controlId="formName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First name"
                              value={currentUser.firstName}
                              onChange={(event) => handleUserChange(event.target.value, 'firstName')}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last name"
                              value={currentUser.lastName}
                              onChange={(event) => handleUserChange(event.target.value, 'lastName')}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                              value={currentUser.email}
                              onChange={(event) => handleUserChange(event.target.value, 'email')}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="nubmer" placeholder="Enter phone"
                              value={currentUser.phone}
                              onChange={(event) => handleUserChange(event.target.value, 'phone')}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              value={currentUser.password}
                              onChange={(event) => handleUserChange(event.target.value, 'password')}/>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formImage">
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text" placeholder="Enter Image URL"
                              value={currentUser.imageUrl}
                              onChange={(event) => handleUserChange(event.target.value, 'imageUrl')}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Register as Amdin"
                            checked={currentUser.isAdmin}
                            onChange={(event) =>
                                handleUserChange(event.target.checked, 'isAdmin')}/>
                <Form.Text>{error}</Form.Text>
            </Form.Group>

            <Button disabled={!isFormValid()} onClick={submit}
                    variant="success" type="button">
                Register
            </Button>
        </Form>
    )
}

export default Register;