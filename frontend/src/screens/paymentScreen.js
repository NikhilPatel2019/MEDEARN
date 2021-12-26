import { useState } from 'react';
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/formContainer';
import CheckOutSteps from '../components/checkoutSteps';
import { savePaymentMethod } from '../actions/cartAction'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { exchangeAddress } = cart;

    if(!exchangeAddress){
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod({paymentMethod}));
        history.push('/placeorder');
    }

    return(
        <FormContainer>
            <CheckOutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                
                <Col>

                    <Form.Check type="radio" label="Cash on delivery" id="cod" name="paymentMethod"
                                value="cod" checked onChange={(e) => setPaymentMethod(e.target.value)}>  

                    </Form.Check>

                    {/* Paypal kam nathi kartu amna error ave che etle pachi try karis */}
                    {/* <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod"
                                value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}>  

                    </Form.Check> */}

                    {/* If you want to add another payment method uncomment this and edit it
                    <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod"
                                value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}>  

                    </Form.Check> */}
                </Col>
                </Form.Group>    
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;