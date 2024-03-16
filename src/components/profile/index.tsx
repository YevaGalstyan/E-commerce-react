import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {User} from '../../types/user';
import {userSelector} from '../../store/auth/selector';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import {Button, Form} from 'react-bootstrap';
import {editUser} from '../../store/auth/api';
import {useAppDispatch} from '../../store';

const Profile: FC = () => {
    const user: User | null = useSelector(userSelector);
    const initialUser = user || {
        id: 0,
        password: '',
        firstName: '',
        lastName: '',
        imageUrl: '',
        email: '',
        phone: '',
        isAdmin: false,
    }
    const [currentUser, setUser] = useState(initialUser);
    const dispatch = useAppDispatch();

    const handleUserChange = (value: any, key: string) => {
        setUser({
            ...currentUser,
            [key]: value,
        });
    }

    const submit = () => {
        dispatch(editUser({id: user?.id, updatedUserData: currentUser}))
    }

    return (
        <div className="profile">
            <div className="profile_picture">
                <img src={user?.imageUrl}/>
            </div>
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
                    <Form.Check type="checkbox" label="Switch to Admin"
                                checked={currentUser.isAdmin}
                                onChange={(event) =>
                                    handleUserChange(event.target.checked, 'isAdmin')}/>
                </Form.Group>

                <Button onClick={submit}
                        variant="success" type="button">
                    Save
                </Button>
            </Form>
        </div>
    )
}
export default Profile;