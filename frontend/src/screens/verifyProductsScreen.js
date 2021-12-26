import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import { listProducts } from '../actions/productActions';

const ProductListScreen = ({ history, match }) => {

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const doctorLogin = useSelector((state) => state.doctorLogin);
    const { doctorInfo } = doctorLogin;

    //This is for ony the products which requires prescription
    //But without Verfier information order will not be created
    //So all product will need to be verified
    // const verifyProducts = products.filter(product => product.isPrescriptionRequired === true)
    // console.log(verifyProducts)

    useEffect(() => {       
            dispatch(listProducts())
    }, [dispatch, history, doctorInfo]);

    return(
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
            </Row>
            {loading ? (<Loader />) : error ? (<Message variant="danger"></Message>)
            :(
                <>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>OFFERED PRICE</th>
                            <th>ORIGINAL PRICE</th>
                            <th>CATEGORY</th>
                            <th>COMPANY</th>
                            <th>MANUFACTURING DATE</th>
                            <th>EXPIRY DATE</th>
                            <th>SELLER NAME</th>
                            <th>VERIFIED</th>
                            <th>VERIFIED BY</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>₹{product.offeredPrice}</td>
                                <td>₹{product.originalPrice}</td>
                                <td>{product.category}</td>
                                <td>{product.company}</td>
                                <td>{product.mfgDate}</td>
                                <td>{product.expiryDate}</td>
                                <td>{product.sellerName}</td>
                                <td>{product.isVerified
                                        ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                        : (<i className="fas fa-times" style={{color: 'red'}}></i>)}
                                </td>
                                <td>{product.verifierName}</td> 
                                <td>
                                    <LinkContainer to={`/doctor/product/${product._id}`}>
                                        <Button variant="light" className="btn-sm">
                                            View Product 
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                </>
            )}
        </>
    )
}

export default ProductListScreen;