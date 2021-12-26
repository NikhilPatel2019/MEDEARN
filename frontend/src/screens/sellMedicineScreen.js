import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import { listProducts, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const SellMedicineScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } 
    = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin

    const myUploadedMedicines = products.filter(product => product.seller === userInfo._id)

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        

        if(successCreate){
            history.push(`/user/medicine/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts())
        }
        
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct]);

    // const deleteHandler = (id) => {
    //     if(window.confirm('ARY YOU SURE?')){
    //        dispatch(deleteProduct(id));
    //     }
    // }

    const createProductHandler = () => {
        dispatch(createProduct());
    }

    return(
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Uploaded Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
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
                            <th>OFFERED PRICE</th>
                            <th>CATEGORY</th>
                            <th>COMPANY</th>
                            <th>LOCATION</th>
                            <th>EXPIRY DATE</th>
                            <th>PRESCRIPTION REQUIRED</th>
                            <th>VERIFICATION</th>
                            <th>VERIFIED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myUploadedMedicines.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>₹{product.offeredPrice}</td>
                                <td>{product.category}</td>
                                <td>{product.company}</td>
                                <td>{product.location}</td>
                                <td>{product.expiryDate}</td>
                                <td>{product.isPrescriptionRequired
                                        ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                        : (<i className="fas fa-times" style={{color: 'red'}}></i>)}
                                </td>
                                <td>{product.isPrescriptionRequired
                                        ? product.isVerified
                                            ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                            : (<i className="fas fa-times" style={{color: 'red'}}></i>)
                                        : <p>-</p>}
                                </td>

                                <td>{product.isVerified
                                            ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                            : (<i className="fas fa-times" style={{color: 'red'}}></i>)
                                    }
                                </td>
                                
                                <td>
                                    {!product.isVerified && (
                                        <LinkContainer to={`/user/medicine/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    )}
                                    
                                    {/* <Button variant="danger" className="btn-sm" 
                                            onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                    </Button> */} 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default SellMedicineScreen;