import { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/formContainer';
import CheckOutSteps from '../components/checkoutSteps';
import { saveExchangeAddress } from '../actions/cartAction'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { exchangeAddress } = cart;

    const [address, setAddress] = useState(exchangeAddress.address);
    const [city, setCity] = useState(exchangeAddress.city);
    const [postalCode, setPostalCode] = useState(exchangeAddress.postalCode);
    const [country, setCountry] = useState(exchangeAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveExchangeAddress({address, city, postalCode, country}));
        history.push('/payment');
    }

    return(
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Exchange Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Exchange Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter your decided exchange address" 
                                  value={address} required
                                  onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter City" value={city} required
                                  onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Postal Code" value={postalCode} required
                                  onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter Country" value={country} required
                                  onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;