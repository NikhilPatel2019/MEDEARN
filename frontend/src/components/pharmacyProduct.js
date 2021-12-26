import React from 'react'
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

// import Rating from './rating';

const PharmacyProduct = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded' >
            <Link to={`/pharmacyProduct/${product._id}`} >
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/pharmacyProduct/${product._id}`} >
                    <Card.Title as='div' >
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                
                <Card.Text as='h6'>
                    Category : {product.category}
                </Card.Text>

                <Card.Text as='h6'>
                    Company : {product.company}
                </Card.Text>

                <Card.Text as='h6'>
                    Expiry Date: {product.expiryDate}
                </Card.Text>

                <Card.Text as='h6'>
                    Original Price: {product.originalPrice}
                </Card.Text>

                {/* <Card.Text as='div'>
                    
                    <Rating 
                    value={product.rating}
                    text={`${product.numReviews} reviews`} 
                    />
                </Card.Text> */}

                <Card.Text as='h3'>
                ₹{product.offeredPrice}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PharmacyProduct
