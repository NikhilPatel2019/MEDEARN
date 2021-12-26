//I don't have any IDEA how to B2C Model for now
//Currently it has conflict with the C2C model 

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
// import { Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap";
// import Loader from '../../components/loader';
// import Message from '../../components/message';
// import { listPharmacyProductDetails } from '../../actions/b2cProductActions';

// const PharmacyProductScreen = ({ history, match}) => {
//     const [qty, setQty] = useState(1);

//     const dispatch = useDispatch();

//     const pharmacyProductDetails = useSelector(state => state.pharmacyProductDetails);
//     const { loading, error, pharmacyProducts } = pharmacyProductDetails;

//     useEffect(() => {
        
//           if (!pharmacyProducts._id || pharmacyProducts._id !== match.params.id) {
//             dispatch(listPharmacyProductDetails(match.params.id))
//           }
//     }, [dispatch, match, pharmacyProducts._id])

//     const addToCartHandler = () => {
//         history.push(`/cart/${match.params.id}?qty=${qty}`);
//     }


//     return (
//         <>
//             <Link className='btn btn-light my-3' to='/'>Go Back</Link>
//             {loading ? <Loader /> : error ? (<Message variant="danger">{error}</Message>) : (
//                 <>
//                 <Row>
//                 <Col md={6}>
//                     <Image src={pharmacyProducts.image} alt={pharmacyProducts.name} fluid />
//                 </Col>
//                 <Col md={3}>    
//                     <ListGroup variant='flush'>
//                         <ListGroup.Item>
//                             <h3>{pharmacyProducts.name}</h3>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             Description : {pharmacyProducts.description}
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <h6>Original Price: ₹{pharmacyProducts.originalPrice}</h6>                            
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             Category : {pharmacyProducts.category}
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             Company : {pharmacyProducts.company}
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             Expiry Date: {pharmacyProducts.expiryDate}
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             Product Uploaded At: {pharmacyProducts.uploadDate}
//                         </ListGroup.Item>
//                     </ListGroup>
//                 </Col>
//                 <Col md={3}>
//                     <Card>
//                         <ListGroup variant='flush'>
//                             <ListGroup.Item>
//                                 <Row>
//                                     <Col>
//                                         Price:
//                                     </Col>
//                                     <Col>
//                                         <strong>
//                                         ₹{pharmacyProducts.offeredPrice}
//                                         </strong>
//                                     </Col>
//                                 </Row>
//                             </ListGroup.Item>

//                             <ListGroup.Item>
//                                 <Row>
//                                     <Col>
//                                         Status:
//                                     </Col>
//                                     <Col>
//                                         {pharmacyProducts.isPrescriptionRequired ?
//                                         'Prescription is required for this product so in order to process your order, you need to upload prescription for this product and once your prescription is verified delivery process will begin.' 
//                                         : 'No prescription Required for this Product'}
//                                     </Col>
//                                 </Row>
//                             </ListGroup.Item>
//                             <ListGroup.Item>
//                                 <Button 
//                                         onClick={addToCartHandler}
//                                         className='btn-block' 
//                                         type='button' 
//                                         >
//                                     Add To Cart
//                                 </Button>
//                             </ListGroup.Item>
//                         </ListGroup>
//                     </Card>
//                 </Col>
//             </Row>
//         </>
//     )}      
// </>
//     )
// }

// export default PharmacyProductScreen
