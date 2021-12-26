import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import FormContainer from '../components/formContainer';
import { RegisterPharmacy } from '../actions/pharmacyActions';
import axios from 'axios';

const RegisterScreen = ( {location, history} ) => {
    const [pharmacyName, setPharmacyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [license, setLicense] = useState('');
    const [ownerImage, setOwnerImage] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState('');

    const dispatch = useDispatch();

    const pharmacyRegister = useSelector(state => state.pharmacyRegister);
    const { loading, error, pharmacyInfo } = pharmacyRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';
    // console.log(redirect)

    useEffect(() => {
        if(pharmacyInfo){
            history.push("/pharmacy");
        }
    }, [history, pharmacyInfo, redirect])

    const uploadLicenseHandler = async(e) => {
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

            setLicense(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    const uploadOwnerHandler = async(e) => {
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

            setOwnerImage(data);
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
            dispatch(RegisterPharmacy(pharmacyName, email, password, ownerName, mobileNumber, license, ownerImage, 
                                      address))
        }       
    }
    
    return(
        <FormContainer>
            <h1>Register Pharmacy</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='pharmacyName'>
                    <Form.Label>Pharmacy Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value={pharmacyName} 
                                  onChange={(e) => setPharmacyName(e.target.value)}>
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

                <Form.Group controlId='ownerName'>
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Owner Name" value={ownerName} 
                                  onChange={(e) => setOwnerName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='license'>
                        <Form.Label>License Image</Form.Label>
                        <Form.Control type="text" placeholder="Upload License Image URL" value={license} 
                                      onChange={(e) => setLicense(e.target.value)}>
                        </Form.Control>
                        <Form.File id="image-file" label="Choose File" custom onChange={uploadLicenseHandler}>
                        {uploading && <Loader />}
                        </Form.File>
                </Form.Group>

                <Form.Group controlId='ownerImage'>
                        <Form.Label>Owners Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter Owners Image URL" value={ownerImage} 
                                      onChange={(e) => setOwnerImage(e.target.value)}>
                        </Form.Control>
                        <Form.File id="image-file" label="Choose File" custom onChange={uploadOwnerHandler}>
                        {uploading && <Loader />}
                        </Form.File>
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