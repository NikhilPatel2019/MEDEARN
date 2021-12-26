import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Row, Col } from "react-bootstrap";
import Product from '../components/product';
// import PharmacyProduct from '../components/pharmacyProduct';
import Message from '../components/message';
import Loader from '../components/loader';
import Paginate from '../components/paginate';
import { listProducts } from '../actions/productActions';
import { listPharmacyProducts } from '../actions/b2cProductActions';
import Meta from '../components/meta';
import ProductCarousel from '../components/productCarousel';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    // const pharmacyProductList = useSelector(state => state.pharmacyProductList);
    // const { loading: b2cloading, error: b2cerror, pharmacyProducts, page:pharmacyPage, pages: pharmacyPages } = pharmacyProductList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));    
        dispatch(listPharmacyProducts(keyword, pageNumber));    
    }, [dispatch, keyword, pageNumber])

    const verifiedProducts = products.filter(product => product.isVerified === true );
    // console.log(verifiedProducts)

    return (
        <>
          <Meta /> 
            { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Go Back</Link> }            
           <h1>Latest Products</h1> 
           {loading ? (<Loader />) 
                    : error ? (<Message variant='danger'>{error}</Message>) 
                    : (
                        <>
                         <Row>
                            {verifiedProducts.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages= {pages} page= {page} keyword= {keyword ? keyword : ''} />
                        </>
           )}

            {/* <h1>B2C Products</h1> 
           {b2cloading ? (<Loader />) 
                    : b2cerror ? (<Message variant='danger'>{b2cerror}</Message>) 
                    : (
                        <>
                         <Row>
                            {pharmacyProducts.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4}>
                                    <PharmacyProduct product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages= {pharmacyPages} page= {pharmacyPage} keyword= {keyword ? keyword : ''} />
                        </>
           )} */}
           
        </> 
    )
}

export default HomeScreen
