import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/message';
import Loader from '../../components/loader';
import FormContainer from '../../components/formContainer';
import { listPharmacyProductDetails, updatePharmacyProduct } from '../../actions/b2cProductActions';
import { PHARMACY_PRODUCT_UPDATE_RESET } from '../../constants/b2cProductConstants';

const PharmacyProductEditScreen = ( {match, history} ) => {
    const productId = match.params.id;
    console.log(productId)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [originalPrice, setOriginalPrice] = useState(0);
    const [offeredPrice, setOfferedPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [image, setImage] = useState('');
    const [isPrescriptionRequired, setIsPrescriptionRequired] = useState('');
    const [uploading, setUploading] = useState('');

    const dispatch = useDispatch();

    const pharmacyProductDetails = useSelector(state => state.pharmacyProductDetails);
    const { loading, error, pharmacyProducts } = pharmacyProductDetails;

    const pharmacyProductUpdate = useSelector(state => state.pharmacyProductUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = pharmacyProductUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: PHARMACY_PRODUCT_UPDATE_RESET})
            history.push('/pharmacy/sellmedicine')
        } else {
            if(!pharmacyProducts.name  || pharmacyProducts._id !== productId){
                dispatch(listPharmacyProductDetails(productId))
            } else {
                setName(pharmacyProducts.name);
                setDescription(pharmacyProducts.description);
                setOriginalPrice(pharmacyProducts.originalPrice);
                setOfferedPrice(pharmacyProducts.offeredPrice);
                setCategory(pharmacyProducts.category);
                setCompany(pharmacyProducts.company);
                setUploadDate(pharmacyProducts.uploadDate);
                setExpiryDate(pharmacyProducts.expiryDate);
                setImage(pharmacyProducts.image);
                setIsPrescriptionRequired(pharmacyProducts.isPrescriptionRequired);
            }
        }            
    }, [dispatch, history, productId, pharmacyProducts, successUpdate]);

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

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePharmacyProduct({
            _id: productId, name, description, originalPrice, offeredPrice, category, company, uploadDate,
            expiryDate, image, isPrescriptionRequired
        }))   
    }
    
    return(
            <>
                <Link to='/pharmacy/sellmedicine' className="btn btn-light my-3"> Go Back</Link>

                <FormContainer>   
                <h1>Edit Product</h1>
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

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter Category" value={category} 
                                      onChange={(e) => setCategory(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='company'>
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="text" placeholder="Enter Company name" value={company} 
                                      onChange={(e) => setCompany(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='uploadDate'>
                        <Form.Label>Upload Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Upload Date" value={uploadDate} 
                                      onChange={(e) => setUploadDate(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='expiryDate'>
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Expiry Date" value={expiryDate} 
                                      onChange={(e) => setExpiryDate(e.target.value)}>
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

                    <Form.Group controlId='isPrescriptionRequired'>
                        <Form.Check type="checkbox" label="Is Prescription Required" checked={isPrescriptionRequired} 
                                      onChange={(e) => setIsPrescriptionRequired(e.target.checked)}>
                        </Form.Check>
                    </Form.Group>
    
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
                )}
                
                </FormContainer>
            </>
    )
}

export default PharmacyProductEditScreen;