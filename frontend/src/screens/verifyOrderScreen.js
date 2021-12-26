import { useEffect } from 'react'; 
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader'
import Meta from '../components/meta.js';
import { getOrderDetails, verifiedOrder, notVerifiedOrder } from '../actions/orderActions.js'
import { ORDER_VERIFIED_RESET, ORDER_NOT_VERIFIED_RESET } from '../constants/orderConstants'

const VerifyOrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    console.log(order)

    const orderVerified = useSelector(state => state.orderVerified)
    const { loading:loadingVerify, success: successVerify } = orderVerified

    const orderNotVerified = useSelector(state => state.orderNotVerified)
    const { loading:loadingNotVerified, success: successNotVerified } = orderNotVerified

    const doctorLogin = useSelector(state => state.doctorLogin)
    const { doctorInfo } = doctorLogin
    console.log(doctorInfo)


    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num*100) / 100).toFixed(2)
        }

        // Calculate Price
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.offeredPrice * item.qty, 0))
    }
    
    useEffect(() => {   
        if(!doctorInfo){
            history.push('/login')
        }
        
        if( !order || successVerify || successNotVerified || order._id !== orderId ){
            dispatch({ type: ORDER_VERIFIED_RESET })
            dispatch({ type: ORDER_NOT_VERIFIED_RESET })
            dispatch(getOrderDetails(orderId))
        }         
    }, [dispatch, history, doctorInfo, orderId, successVerify, successNotVerified, order])

    const orderVerifiedHandler = () => {
        dispatch(verifiedOrder(order))
    }

    const orderNotVerifiedHandler = () => {
        dispatch(notVerifiedOrder(order))
    } 

    return loading 
    ? <Loader /> 
    : error 
    ? <Message variant='danger'>{error}</Message> 
    : <> 
    <Meta title='Order' />
    <Link className='btn btn-light my-3' to='/doctor/verifyorders'>Go Back</Link>
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

                                        {!item.isPrescriptionRequired 
                                            ? (<Alert variant="info">
                                                    No Prescription Required for this product
                                                </Alert>
                                                )
                                            : (
                                                <p>Buyer prescription HERE</p>
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

                        {loadingVerify && <Loader />}
                            {(order.isOrderVerified) 
                                ? (<Message variant="success">Verified By: {order.orderVerifiedBy}</Message>)
                                : (
                                    <ListGroup.Item>
                                        <Row>
                                            <Button 
                                                onClick={orderVerifiedHandler}
                                                className='btn-block' 
                                                type='button' 
                                                variant="success">
                                                Mark Order as Verified
                                            </Button>
                                        </Row>
                                    </ListGroup.Item>
                                    )}

                            {loadingNotVerified && <Loader />}
                            {(!order.isOrderVerified) && (
                                <ListGroup.Item>
                                <Button 
                                        onClick={orderNotVerifiedHandler}
                                        className='btn-block' 
                                        type='button'
                                        variant="warning" >
                                    Mark Order Invalid
                                </Button>
                            </ListGroup.Item>
                            )}

                            {(!order.isOrderVerified && order.orderVerifiedBy) && (
                                <p>Order Marked Invalid by: {order.orderVerifiedBy}</p>
                            )}

                    </ListGroup>
                </Card>               
            </Col>
        </Row>
    </>
}

export default VerifyOrderScreen