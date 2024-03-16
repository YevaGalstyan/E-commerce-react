import React, {FC, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import {Button, Form} from 'react-bootstrap';
import {Product} from '../../../types/product';
import {useAppDispatch} from '../../../store';
import {addProduct} from '../../../store/product/api';
import {useNavigate} from 'react-router-dom';


const NewProduct: FC = () => {

    const initialProduct: Product = {
        id: 0,
        title: '',
        description: '',
        imageUrl: '',
        count: 1,
        price: 0,
    }
    const [product, setProduct] = useState(initialProduct);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleUserChange = (value: any, key: string) => {
        setProduct({
            ...product,
            [key]: value,
        });
    }

    const submit = () => {
        dispatch(addProduct(product)).then(res => {
            setProduct(initialProduct)
            navigate('/products')
        })
    }

    return (
        <div className="new_product_container">
            <h5>Add product</h5>
            <Form>
                <Form.Group className="mb-1" controlId="formName">
                    <Form.Label>Product title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title"
                                  value={product.title}
                                  onChange={(event) => handleUserChange(event.target.value, 'title')}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formDescription">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control placeholder="Enter Description"
                                  as="textarea" rows={3}
                                  value={product.description}
                                  onChange={(event) => handleUserChange(event.target.value, 'description')}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formCount">
                    <Form.Label>Product count</Form.Label>
                    <Form.Control type="number" placeholder="Enter count"
                                  value={product.count}
                                  onChange={(event) => handleUserChange(event.target.value, 'count')}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formPrice">
                    <Form.Label>Product price</Form.Label>
                    <Form.Control type="number" placeholder="Enter price"
                                  value={product.price}
                                  onChange={(event) => handleUserChange(event.target.value, 'price')}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formImage">
                    <Form.Label>Product Image Url</Form.Label>
                    <Form.Control type="text" placeholder="Enter Image URL"
                                  value={product.imageUrl}
                                  onChange={(event) => handleUserChange(event.target.value, 'imageUrl')}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Button onClick={submit}
                        variant="success" type="button">
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default NewProduct;