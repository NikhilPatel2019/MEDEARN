import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import FormContainer from '../components/formContainer';
import { login } from '../actions/userActions';
import { loginPharmacy } from '../actions/pharmacyActions';
import { loginDoctor } from '../actions/doctorActions';

const LoginScreen = ( {location, history} ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userProfile, setUserProfile] = useState('Buyer and Seller');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    console.log(userInfo)

    const pharmacyLogin = useSelector(state => state.pharmacyLogin);
    const { loading: pharmacyLoading, error: pharmacyError, pharmacyInfo } = pharmacyLogin;

    const doctorLogin = useSelector(state => state.doctorLogin);
    const { loading: doctorLoading, error: doctorError, doctorInfo } = doctorLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';
    // console.log(redirect);

    useEffect(() => {
        if (pharmacyInfo){
            history.push("/pharmacy");
        } else if(doctorInfo){
            history.push("/doctordashboard");
        }else if(userInfo){
            history.push(redirect);
            } 
    }, [history, userInfo, pharmacyInfo, doctorInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //Dispatch Login
        if(userProfile === 'Buyer and Seller'){
            dispatch(login(email,password))
        } else if(userProfile === 'Pharmacy'){
            dispatch(loginPharmacy(email,password))
        } else if ( userProfile === 'Doctor(Verifier)') {
            dispatch(loginDoctor(email,password))
        }
        
    }
    
    return(
        <FormContainer className="mt-5">
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {pharmacyError && <Message variant='danger'>{pharmacyError}</Message>}
            {pharmacyLoading && <Loader />}
            {doctorError && <Message variant='danger'>{doctorError}</Message>}
            {doctorLoading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Label>Select User Profile</Form.Label>
                <Form.Control as="select" value={userProfile} onChange={(e) => setUserProfile(e.target.value)}>
                    <option>Buyer and Seller</option>
                    <option>Pharmacy</option>
                    <option>Doctor(Verifier)</option>
                </Form.Control>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} 
                                  onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} 
                                  onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">Sign In</Button>

                <Row className="py-3">
                    <Col> New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                        Register Here
                                        </Link>
                    </Col>
                </Row>

                <Row className="py-3">
                    <Col> New Pharmacy? <Link to={redirect ? `/registerpharmacy?redirect=${redirect}` : '/registerpharmacy'}>
                                        Register Here
                                        </Link>
                    </Col>
                </Row>

                <Row className="py-3">
                    <Col> New Doctor? <Link to={redirect ? `/registerdoctor?redirect=${redirect}` : '/registerdoctor'}>
                                        Register Here
                                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen;