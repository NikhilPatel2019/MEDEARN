import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import FormContainer from '../components/formContainer';
import { getDoctorDetails, updateDoctor } from '../actions/doctorActions';
import { DOCTOR_UPDATE_RESET } from '../constants/doctorConstants';

const DoctorEditScreen = ( {match, history} ) => {
    const doctorId = match.params.id;

    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);

    const dispatch = useDispatch();

    const doctorDetails = useSelector(state => state.doctorDetails);
    const { loading, error, doctor } = doctorDetails;

    const doctorUpdate = useSelector(state => state.doctorUpdate);
    const { loading: loadingUpdate, error:errorUpdate, success: successUpdate } = doctorUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: DOCTOR_UPDATE_RESET});
            history.push('/admin/doctorlist');
        } else {
            if(!doctor.doctorName || doctor._id !== doctorId){
                dispatch(getDoctorDetails(doctorId))
            } else {
                setEmail(doctor.email);
                setAddress(doctor.address);
                setMobileNumber(doctor.mobileNumber);
                setIsDoctor(doctor.isDoctor);
            }
        }
    }, [dispatch, history, doctorId, doctor, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateDoctor({_id: doctorId, email, address, mobileNumber, isDoctor}));             
    }
    
    return(
            <>
                <Link to='/admin/doctorlist' className="btn btn-light my-3"> Go Back</Link>

                <FormContainer>   
                <h1>Edit Doctor</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
    
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} 
                                      onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='address'>
                        <Form.Label>Present Address</Form.Label>
                        <Form.Control type="name" placeholder="Enter Address" value={address} 
                                      onChange={(e) => setAddress(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='mobileNumber'>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter Mobile Number" value={mobileNumber} 
                                      onChange={(e) => setMobileNumber(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='isDoctor'>
                        <Form.Check type="checkbox" label="I have verified all the details provided by doctor on
                         Indian Medical Registry  and hence verify this doctor" checked={isDoctor} 
                                      onChange={(e) => setIsDoctor(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>
    
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
                )}
                
                </FormContainer>
            </>
    )
}

export default DoctorEditScreen;