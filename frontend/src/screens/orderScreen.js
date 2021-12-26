import { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader'
import Meta from '../components/meta.js';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions.js'
import { updateBuyerPrescription } from '../actions/productActions.js'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { PRODUCT_BUYER_VERIFICATION_UPLOAD_REQUEST } from '../constants/productConstants'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [buyerPrescriptionImage, setBuyerPrescriptionImage] = useState('');
    const [uploading, setUploading] = useState('');

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    console.log(order)

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver, success: successDeliver } = orderDeliver

    const buyerPrescriptionUpload = useSelector(state => state.buyerPrescriptionUpload);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = buyerPrescriptionUpload;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo)


    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num*100) / 100).toFixed(2)
        }

        // Calculate Price
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.offeredPrice * item.qty, 0))
    }
    
    useEffect(() => {   
        if(!userInfo){
            history.push('/login');
        }

        if(successUpdate) {
            dispatch({type: PRODUCT_BUYER_VERIFICATION_UPLOAD_REQUEST})
        }else {
            // setBuyerPrescriptionImage(order.orderItems.buyerPrescriptionImage)
        }
        
        if( !order || successPay || successDeliver || order._id !== orderId ){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        }         
    }, [dispatch, history, userInfo, orderId, successPay, successDeliver, successUpdate, order])

    const payHandler = () => {
        dispatch(payOrder(order))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const submitHandler = (productId) => event => {
        event.preventDefault();
        updateBuyerPrescription({  _id: productId, buyerPrescriptionImage })
           
    }

    const uploadPrescriptionHandler = async(e) => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config);

            setBuyerPrescriptionImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    return loading 
    ? <Loader /> 
    : error 
    ? <Message variant='danger'>{error}</Message> 
    : <> 
    <Meta title='Order' />
        <h1> Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Exchange Address</h2>
                        <p><strong>Name: </strong> {order.buyer.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.buyer.email}`}>{order.buyer.email}</a></p>
                        <p>    
                            <strong>Address: </strong>
                            {order.exchangeAddress.address}{' , '}
                            {order.exchangeAddress.city}{' , '}
                            {order.exchangeAddress.postalCode}{' , '}
                            {order.exchangeAddress.country}
                        </p>
                        {order.isDelivered 
                        ? <Message variant='success'>Delivered on {order.deliveredAt} </Message> 
                        : <Message variant='danger'>Not Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item> 
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid 
                        ? <Message variant='success'>Paid on {order.paidAt} </Message> 
                        : <Message variant='danger'>Not Paid</Message>}
                    </ListGroup.Item>
                
                    <ListGroup.Item>
                        <h2>Order Item</h2>
                        {order.orderItems.length === 0 
                        ? <Message>Order is empty</Message> 
                        : (
                            <Card>
                            
                                {order.orderItems.map((item, index) => (
                                    <ListGroup variant='flush'>
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={3}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>                                                
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ₹{item.offeredPrice} = ₹{item.qty * item.offeredPrice}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>Seller Name: </Col>
                                            <Col>{item.sellerName}</Col>
                                        </Row>

                                        <Row>
                                            <Col>Seller Email: </Col>
                                            <Col>{item.sellerEmail}</Col>
                                        </Row>

                                        <Row>
                                            <Col>Verified buy: </Col>
                                            <Col>{item.verifierName}</Col>
                                        </Row>

                                        <Row>
                                            <Col>Verifier Email: </Col>
                                            <Col>{item.verifierEmail}</Col>
                                        </Row>

                                        {item.buyerPrescriptionImage && (
                                            <Row>
                                            <Col>My Prescription: </Col>
                                            <Col>{item.buyerPrescriptionImage}</Col>
                                        </Row>
                                        )}

{loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                                        {!item.isPrescriptionRequired 
                                            ? (<Alert variant="info">
                                                    No Prescription Required for this product
                                                </Alert>
                                                )
                                            : (
                                                
                                                <Form onSubmit={submitHandler(item._id)}>            
                <Form.Group controlId='buyerPrescriptionImage'>
                        <Form.Label>Prescription Image: </Form.Label>
                        <Form.Control type="text" placeholder="Enter Image URL" value={buyerPrescriptionImage} 
                                      onChange={(e) => setBuyerPrescriptionImage(e.target.value)}>
                        </Form.Control>
                        <Form.File id="image-file" label="Choose File" custom onChange={uploadPrescriptionHandler}>
                        {uploading && <Loader />}
                        </Form.File>
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
                </Form>
                                            )}
                                    </ListGroup.Item>
                                     </ListGroup>
                                ))}
                   
                    </Card>
                    )}
                </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col> ₹{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col> ₹{order.exchangePrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col> ₹{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col> ₹{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {loadingPay && <Loader />}
                        
                        {userInfo && !order.isPaid && order.isOrderVerified &&(
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={payHandler}>
                                    Mark as Paid
                                </Button>
                            </ListGroup.Item>
                        )}

                        {loadingDeliver && <Loader />}
                        {userInfo && order.isPaid && !order.isDelivered &&(
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                    Mark as delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>            
                
                <Card>
                    {!order.isOrderVerified && (
                        <Alert variant="warning">
                            <h5>
                              You will be able to mark this Order, 
                              Paid and deliverd once given order is verified
                            </h5>
                        </Alert>
                    )}
                </Card>

                {!order.isOrderVerified && order.orderVerifiedBy && (
                    <Card variant="danger">
                        This Product is marked as Invalid.
                    </Card>
                )}

            </Col>
        </Row>
    </>
}

export default OrderScreen