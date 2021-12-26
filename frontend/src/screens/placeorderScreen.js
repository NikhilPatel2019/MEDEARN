import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import CheckOutSteps from '../components/checkoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    console.log(cart.cartItems)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    //Calculate Prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.offeredPrice * item.qty, 0));
    cart.exchangePrice = 0;
    cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.exchangePrice) + Number(cart.taxPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            exchangeAddress: cart.exchangeAddress,
            paymentMethod: cart.paymentMethod.paymentMethod,
            itemsPrice: cart.itemsPrice,
            exchangePrice: cart.exchangePrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }));
    }

    return (
        <>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>exchange</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.exchangeAddress.address}, {cart.exchangeAddress.city} 
                                {cart.exchangeAddress.postalCode}, {cart.exchangeAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod.paymentMethod}
                            </p>    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>   
                            {cart.cartItems.length === 0 
                                      ? <Message>Your cart is empty</Message>
                                      :(
                                        <ListGroup variant="flush">
                                            {cart.cartItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded>
                                                            </Image>
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} X ₹{item.offeredPrice} = 
                                                            ₹{item.qty * item.offeredPrice}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                      )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Exchange</Col>
                                    <Col>₹{cart.exchangePrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₹{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cart.cartItems === 0}
                                        onClick={placeOrderHandler}>
                                            Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen;