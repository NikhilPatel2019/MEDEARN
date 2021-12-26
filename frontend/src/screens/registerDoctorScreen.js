import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import FormContainer from '../components/formContainer';
import { RegisterDoctor } from '../actions/doctorActions';
import axios from 'axios';

const RegisterScreen = ( {location, history} ) => {
    const [doctorName, setDoctorName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [registeredCouncil, setRegisteredCouncil] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [doctorImage, setDoctorImage] = useState('');
    
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState('');

    const dispatch = useDispatch();

    const doctorRegister = useSelector(state => state.doctorRegister);
    const { loading, error, doctorInfo } = doctorRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';
    // console.log(redirect)

    useEffect(() => {
        if(doctorInfo){
            history.push("/doctordashboard");
        }
    }, [history, doctorInfo, redirect])

    const uploadDoctorHandler = async(e) => {
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

            setDoctorImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match");
        } else{
            dispatch(RegisterDoctor(doctorName, email, password, registrationNumber, registrationDate, 
                                    registeredCouncil, dateOfBirth, address, mobileNumber, doctorImage))
        }       
    }
    
    return(
        <FormContainer>
            <h1>Register as a Doctor</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='doctorName'>
                    <Form.Label>Doctor Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Full Name" value={doctorName} 
                                  onChange={(e) => setDoctorName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

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

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} 
                                  onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='registrationNumber'>
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control type="name" placeholder="Enter Registration Number" value={registrationNumber} 
                                  onChange={(e) => setRegistrationNumber(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='registrationDate'>
                    <Form.Label>Registration Date</Form.Label>
                    <Form.Control type="name" placeholder="Enter Registration Date" value={registrationDate} 
                                  onChange={(e) => setRegistrationDate(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='registeredCouncil'>
                    <Form.Label>Registered Council</Form.Label>
                    <Form.Control type="name" placeholder="Enter Registered Council" value={registeredCouncil} 
                                  onChange={(e) => setRegisteredCouncil(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='dateOfBirth'>
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control type="name" placeholder="Enter Date Of Birth" value={dateOfBirth} 
                                  onChange={(e) => setDateOfBirth(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address" value={address} 
                                      onChange={(e) => setAddress(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='mobileNumber'>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter Mobile Number" value={mobileNumber} 
                                      onChange={(e) => setMobileNumber(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='doctorImage'>
                        <Form.Label>Doctor Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter doctors Image URL" value={doctorImage} 
                                      onChange={(e) => setDoctorImage(e.target.value)}>
                        </Form.Control>
                        <Form.File id="image-file" label="Choose File" custom onChange={uploadDoctorHandler}>
                        {uploading && <Loader />}
                        </Form.File>
                </Form.Group>

                <p>
                    Note- Your entered details will be verified via Indian Medical Registry Search, so enter
                    Name, Registration Number, Registration Date and Registred Council Carefully. If you are 
                    not verified  your account will be deleted. Also Please wait until the verification, once
                    you are verified mail will be sent to you and your previlages to user doctor features will be
                    activated. 
                    
                </p>

                <Button type="submit" variant="primary">Register</Button>

                <Row className="py-3">
                    <Col> Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                        Sign In
                                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;