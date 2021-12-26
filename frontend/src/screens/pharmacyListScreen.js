import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import { listPharmacies, deletePharmacy } from '../actions/pharmacyActions';

const PharmacyListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const pharmacyList = useSelector(state => state.pharmacyList);
    const { loading, error, pharmacies } = pharmacyList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const pharmacyDelete = useSelector(state => state.pharmacyDelete);
    const { success: successDelete } = pharmacyDelete;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listPharmacies());
        } else {
            history.push('/login');
        }
        
    }, [dispatch, history, successDelete, userInfo]);

    const deleteHandler = (id) => {
        if(window.confirm('ARY YOU SURE?')){
            dispatch(deletePharmacy(id));
        }
        
    }

    return(
        <>
            <h1>Pharmacies</h1>
            {loading ? <Loader /> : error ? <Message variant="danger"></Message>
            :(
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Pharmacy Name</th>
                            <th>Owner Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>License</th>
                            <th>Owner Image</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pharmacies.map(pharmacy => (
                            <tr key={pharmacy._id}>
                                <td>{pharmacy.pharmacyName}</td>
                                <td>{pharmacy.ownerName}</td>
                                <td><a href={`mailto:${pharmacy.email}`}>{pharmacy.email}</a></td>
                                <td>{pharmacy.address}</td>
                                <td>{pharmacy.mobileNumber}</td>
                                {/* <td>{pharmacy.license}</td> */}
                                {/* <td>{pharmacy.ownerImage}</td> */}
                                <td></td>
                                <td></td>
                                <td>
                                    {pharmacy.isPharmacy 
                                    ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                    : (<i className="fas fa-times" style={{color: 'red'}}></i>)}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/pharmacy/${pharmacy._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" 
                                            onClick={() => deleteHandler(pharmacy._id)}>
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

export default PharmacyListScreen;