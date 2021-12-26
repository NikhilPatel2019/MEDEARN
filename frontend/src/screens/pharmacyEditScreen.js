import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import FormContainer from '../components/formContainer';
import { getPharmacyDetails, updatePharmacy } from '../actions/pharmacyActions';
import { PHARMACY_UPDATE_RESET } from '../constants/pharmacyConstants';

const PharmacyEditScreen = ( {match, history} ) => {
    const pharmacyId = match.params.id;

    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isPharmacy, setIsPharmacy] = useState(false);

    const dispatch = useDispatch();

    const pharmacyDetails = useSelector(state => state.pharmacyDetails);
    const { loading, error, pharmacy } = pharmacyDetails;
    console.log(pharmacy)

    const pharmacyUpdate = useSelector(state => state.pharmacyUpdate);
    const { loading: loadingUpdate, error:errorUpdate, success: successUpdate } = pharmacyUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: PHARMACY_UPDATE_RESET});
            history.push('/admin/pharmacylist');
        } else {
            if(!pharmacy.pharmacyName  || pharmacy._id !== pharmacyId){
                dispatch(getPharmacyDetails(pharmacyId))
            } else {
                setEmail(pharmacy.email);
                setAddress(pharmacy.address);
                setMobileNumber(pharmacy.mobileNumber);
                setIsPharmacy(pharmacy.isPharmacy);
            }
        }
    }, [dispatch, history, pharmacyId, pharmacy, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePharmacy({_id: pharmacyId, email, address, mobileNumber, isPharmacy}));             
    }
    
    return(
            <>
                <Link to='/admin/pharmacylist' className="btn btn-light my-3"> Go Back</Link>

                <FormContainer>   
                <h1>Edit Pharmacy</h1>
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
                        <Form.Label>Address</Form.Label>
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
    
                    <Form.Group controlId='isPharmacy'>
                        <Form.Check type="checkbox" label="Is Pharmacy" checked={isPharmacy} 
                                      onChange={(e) => setIsPharmacy(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>
    
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
                )}
                
                </FormContainer>
            </>
    )
}

export default PharmacyEditScreen;