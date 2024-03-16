import React, {FC, useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home/style.scss'
import {filterPrice, searchProduct, sortProducts} from '../../../store/product/slice';
import {useAppDispatch} from '../../../store';
import {Product} from '../../../types/product';

interface FiltersProps {
    products: Product[];
}

const Filters: FC<FiltersProps> = ({ products }) => {
    const dispatch = useAppDispatch()

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);


    useEffect(() => {
        if (products.length > 0) {
            const maxPrice = Math.max(...products.map(product => product.price));
            setMaxValue(maxPrice);
        }
    }, []);

    const handleMinChange = (event: any) => {
        const value = parseInt(event.target.value);
        setMinValue(value);
    };

    const handleMaxChange = (event: any) => {
        const value = parseInt(event.target.value);
        setMaxValue(value);
    };

    const handleApplyFilter = () => {
        dispatch(filterPrice({minPrice: minValue, maxPrice: maxValue}))
    };

    const handleChange = (id: string) => {
        dispatch(sortProducts(id))
    }
    const handleSearch = (e: any) => {
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div className="product_list_header">
            <Form className="price_range">
                <span>Price from:</span>
                <Form.Control type="number" value={minValue} onChange={handleMinChange}/>
                <span>To:</span>
                <Form.Control type="number" value={maxValue} onChange={handleMaxChange}/>
                <Button variant="primary" onClick={handleApplyFilter}>Apply</Button>
            </Form>
            <div style={{display: 'flex', gap: 20}}>
                <Form>
                    <Form.Control
                        onInput={(e) => handleSearch(e)}
                        placeholder="Search"
                        aria-label="Username"
                        aria-describedby="basic-addon1"/>
                </Form>
                <Form>
                    <Form.Select onChange={(e) => handleChange(e.target.value)} aria-label="Default select example">
                        <option>Sort by</option>
                        <option value="1">Price Ascending</option>
                        <option value="2">Price Descending</option>
                    </Form.Select>
                </Form>
            </div>
        </div>
    )
}

export default Filters