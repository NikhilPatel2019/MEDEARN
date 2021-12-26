import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import Paginate from '../components/paginate';
import { listProducts, deleteProduct } from '../actions/productActions';
// import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    // const productCreate = useSelector((state) => state.productCreate);
    // const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } 
    // = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        // dispatch({ type: PRODUCT_CREATE_RESET });
        dispatch(listProducts('', pageNumber))

        // if(successCreate){
        //     history.push(`/admin/product/${createdProduct._id}/edit`);
        // } else {
        //     dispatch(listProducts('', pageNumber))
        // }
        
    }, [dispatch, history, userInfo, successDelete, pageNumber]);

    const deleteHandler = (id) => {
        if(window.confirm('ARY YOU SURE?')){
           dispatch(deleteProduct(id));
        }
    }

    // const createProductHandler = () => {
    //     dispatch(createProduct());
    // }

    return(
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                {/* <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i>Create Product
                    </Button>
                </Col> */}
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {/* {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}
            {loading ? (<Loader />) : error ? (<Message variant="danger"></Message>)
            :(
                <>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>OFFERED PRICE</th>
                            <th>CATEGORY</th>
                            <th>COMPANY</th>
                            <th>LOCATION</th>
                            <th>EXPIRY DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>₹{product.offeredPrice}</td>
                                <td>{product.category}</td>
                                <td>{product.company}</td>
                                <td>{product.location}</td>
                                <td>{product.expiryDate}</td>
                                <td>
                                    <LinkContainer to={`/user/medicine/${product._id}/edit`}>
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
                <Paginate pages= {pages} page= {page} isAdmin={true}/>
                </>
            )}
        </>
    )
}

export default ProductListScreen;