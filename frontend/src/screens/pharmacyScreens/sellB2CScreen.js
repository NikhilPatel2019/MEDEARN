import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/message';
import Loader from '../../components/loader';
import { listPharmacyProducts, deletePharmacyProduct, createPharmacyProduct } from '../../actions/b2cProductActions';
import { PHARMACY_PRODUCT_CREATE_RESET } from '../../constants/b2cProductConstants';

const SellPharmacyMedicineScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const pharmacyProductList = useSelector((state) => state.pharmacyProductList);
    const { loading, error, pharmacyProducts } = pharmacyProductList;

    const pharmacyProductDelete = useSelector((state) => state.pharmacyProductDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = pharmacyProductDelete;

    const pharmacyProductCreate = useSelector((state) => state.pharmacyProductCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } 
    = pharmacyProductCreate;

    const pharmacyLogin = useSelector((state) => state.pharmacyLogin);
    const { pharmacyInfo } = pharmacyLogin

    const myUploadedMedicines = pharmacyProducts.filter(pharmacyProducts => 
                              pharmacyProducts.pharmacy === pharmacyInfo._id)

    useEffect(() => {
        dispatch({ type: PHARMACY_PRODUCT_CREATE_RESET });
        

        if(successCreate){
            history.push(`/pharmacy/medicine/${createdProduct._id}/edit`);
        } else {
            dispatch(listPharmacyProducts())
        }
        
    }, [dispatch, history, pharmacyInfo, successDelete, successCreate, createdProduct]);

    const deleteHandler = (id) => {
        if(window.confirm('ARY YOU SURE?')){
           dispatch(deletePharmacyProduct(id));
        }
    }

    const createPharmacyProductHandler = () => {
        dispatch(createPharmacyProduct());
    }

    return(
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Uploaded Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createPharmacyProductHandler}>
                        <i className="fas fa-plus"></i>Sell Medicine
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loading ? (<Loader />) : error ? (<Message variant="danger"></Message>)
            :(
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>ORIGINAL PRICE</th>
                            <th>OFFERED PRICE</th>
                            <th>CATEGORY</th>
                            <th>COMPANY</th>
                            <th>EXPIRY DATE</th>
                            <th>UPLOAD DATE</th>
                            <th>PRESCRIPTION REQ.</th>
                            <th>VERIFIED</th>

                        </tr>
                    </thead>
                    <tbody>
                        {myUploadedMedicines.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>₹{product.offeredPrice}</td>
                                <td>₹{product.originalPrice}</td>
                                <td>{product.category}</td>
                                <td>{product.company}</td>
                                <td>{product.expiryDate}</td>
                                <td>{product.uploadDate}</td>
                                <td>{product.isPrescriptionRequired 
                                    ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                    : (<i className="fas fa-times" style={{color: 'red'}}></i>)}
                                </td>
                                <td>{product.isVerified 
                                    ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                    : (<i className="fas fa-times" style={{color: 'red'}}></i>)}
                                </td>
                                <td>
                                    <LinkContainer to={`/pharmacy/medicine/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" 
                                            onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default SellPharmacyMedicineScreen;