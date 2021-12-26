import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import FormContainer from '../components/formContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const UsersMedicineEditScreen = ( {match, history} ) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [originalPrice, setOriginalPrice] = useState(0);
    const [offeredPrice, setOfferedPrice] = useState(0);
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [mfgDate, setMfgDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(false);
    console.log(isPrescriptionRequired);
    const [prescriptionImage, setPrescriptionImage] = useState('');

    const [uploading, setUploading] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/user/sellmedicine')
        } else {
            if(!product.name  || product._id !== productId){
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name);
                setDescription(product.description);
                setOriginalPrice(product.originalPrice);
                setOfferedPrice(product.offeredPrice);
                setLocation(product.location);
                setImage(product.image);
                setCategory(product.category);
                setCompany(product.company);
                setMfgDate(product.mfgDate);
                setExpiryDate(product.expiryDate);
                setUploadDate(product.uploadDate);
                setCountInStock(product.countInStock);
                setIsPrescriptionRequired(product.isPrescriptionRequired);
                setPrescriptionImage(product.prescriptionImage)
            }
        }            
    }, [dispatch, history, productId, product, successUpdate]);

    const uploadFileHandler = async(e) => {
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

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    const uploadPrescriptionFileHandler = async(e) => {
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

            setPrescriptionImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId, name, description, originalPrice, offeredPrice, location, image, category, company,
            mfgDate, expiryDate,  uploadDate, countInStock, isPrescriptionRequired, prescriptionImage
        }))   
    }
    
    return(
            <>
                <Link to='/user/sellmedicine' className="btn btn-light my-3"> Go Back</Link>

                <FormContainer>   
                <h1>Enter Details</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Name" value={name} 
                                      onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" value={description} 
                                      onChange={(e) => setDescription(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='originalPrice'>
                        <Form.Label>Original Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter Original Price" value={originalPrice} 
                                      onChange={(e) => setOriginalPrice(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='offeredPrice'>
                        <Form.Label>Offered Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter Offered Price" value={offeredPrice} 
                                      onChange={(e) => setOfferedPrice(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='location'>
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" value={location} 
                                      onChange={(e) => setLocation(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter Image URL" value={image} 
                                      onChange={(e) => setImage(e.target.value)}>
                        </Form.Control>
                        <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}>
                        {uploading && <Loader />}
                        </Form.File>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter Category" value={category} 
                                      onChange={(e) => setCategory(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='company'>
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" placeholder="Enter Company" value={company} 
                                      onChange={(e) => setCompany(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='mfgDate'>
                        <Form.Label>Manufacturing Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Manufacturing Date" value={mfgDate} 
                                      onChange={(e) => setMfgDate(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='expiryDate'>
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Expiry Date" value={expiryDate} 
                                      onChange={(e) => setExpiryDate(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='uploadDate'>
                        <Form.Label>Upload Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Upload Date" value={uploadDate} 
                                      onChange={(e) => setUploadDate(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>CountInStock</Form.Label>
                        <Form.Control type="number" placeholder="Enter CountInStock" value={countInStock} 
                                      onChange={(e) => setCountInStock(e.target.value)}>
                        </Form.Control>
                    </Form.Group>  

                    <Form.Group controlId='isPrescriptionrequired'>
                        <Form.Check type="checkbox" label="Is Prescription Required" checked={isPrescriptionRequired} 
                                      onChange={(e) => setIsPrescriptionRequired(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>

                    {isPrescriptionRequired && (
                        <Form.Group controlId='image'>
                            <Form.Label>Prescription Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter Image URL" value={prescriptionImage} 
                                      onChange={(e) => setPrescriptionImage(e.target.value)}>
                            </Form.Control>
                            <Form.File id="image-file" label="Choose File" custom 
                                       onChange={uploadPrescriptionFileHandler}>
                        {uploading && <Loader />}
                            </Form.File>
                        </Form.Group>
                    )}

                    <Button type="submit" variant="primary">Update</Button>
                </Form>
                )}
                
                </FormContainer>
            </>
    )
}

export default UsersMedicineEditScreen;