import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Loader from '../components/loader';
import Message from '../components/message';
import { listProductDetails, verifyProduct, notVerifyProduct } from '../actions/productActions';
import { PRODUCT_VERIFIED_RESET, PRODUCT_NOT_VERIFIED_RESET } from '../constants/productConstants'

const DoctorProductScreen = ({ history, match}) => {
    const dispatch = useDispatch();      

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    
    const productVerified = useSelector(state => state.productVerified)
    const { loading:loadingVerify, success: successVerify } = productVerified

    const productNotVerified = useSelector(state => state.productNotVerified)
    const { loading:loadingNotVerified, success: successNotVerified } = productNotVerified

    useEffect(() => {
          if (!product._id || successVerify || successNotVerified || product._id !== match.params.id) {
            dispatch({ type: PRODUCT_VERIFIED_RESET })
            dispatch({ type: PRODUCT_NOT_VERIFIED_RESET })
            dispatch(listProductDetails(match.params.id))
          }
    }, [dispatch, match, product._id, successVerify, successNotVerified])

    const prescriptionVerifiedHandler = () => {
        dispatch(verifyProduct(product))
    }

    const prescriptionNotVerifiedHandler = () => {
        dispatch(notVerifyProduct(product))
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/doctor/verifyproducts'>Go Back</Link>
            {loading ? <Loader /> : error ? (<Message variant="danger">{error}</Message>) : (
                <>
                <Row>
                <Col md={6}>
                    <h3>{product.name}</h3>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={6}>
                
                    <Card>
                        <ListGroup variant='flush'>
                            {product.isPrescriptionRequired && (
                                <ListGroup.Item>
                                    <h4>Prescription:</h4>
                                <Row>
                                <Image src={product.prescriptionImage} alt={product.prescriptionImage} fluid />                                  
                                </Row>
                            </ListGroup.Item>
                            )}
                            

                            {loadingVerify && <Loader />}
                            {(product.isVerified) 
                                ? (<Message variant="success">Verified By: {product.verifierName}</Message>)
                                : (
                                    <ListGroup.Item>
                                        <Row>
                                            <Button 
                                                onClick={prescriptionVerifiedHandler}
                                                className='btn-block' 
                                                type='button' 
                                                variant="success">
                                                Mark Product Verified
                                            </Button>
                                        </Row>
                                    </ListGroup.Item>
                                    )}
                                    
                           {loadingNotVerified && <Loader />}
                            {(!product.isVerified) && (
                                <ListGroup.Item>
                                <Button 
                                        onClick={prescriptionNotVerifiedHandler}
                                        className='btn-block' 
                                        type='button'
                                        variant="warning" >
                                    Mark Product Unverified
                                </Button>
                            </ListGroup.Item>
                            )}
    
                            
                            
                        </ListGroup>
                    </Card>                    
                </Col>
            </Row>
            <Row>
            <Col md={7}>    
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <strong>Seller: {product.sellerName}</strong>                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Email: <a href={`mailto:${product.sellerEmail}`}>{product.sellerEmail}</a> 
                            </strong>                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description : {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Original Price : ₹{product.originalPrice}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Offered Price : ₹{product.offeredPrice}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Location : {product.location}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Category : {product.category}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Company : {product.company}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            MFG. Date: {product.mfgDate}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Expiry Date: {product.expiryDate}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Upload Date: {product.uploadDate}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </>
    )}
    </>
)}      

export default DoctorProductScreen
