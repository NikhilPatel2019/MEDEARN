import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import Loader from '../components/loader';
import { listDoctors, deleteDoctor } from '../actions/doctorActions';

const DoctorListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const doctorList = useSelector(state => state.doctorList);
    const { loading, error, doctors } = doctorList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const doctorDelete = useSelector(state => state.doctorDelete);
    const { success: successDelete } = doctorDelete;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listDoctors());
        } else {
            history.push('/login');
        }
        
    }, [dispatch, history, successDelete, userInfo]);

    const deleteHandler = (id) => {
        if(window.confirm('ARY YOU SURE?')){
            dispatch(deleteDoctor(id));
        }
        
    }

    console.log(doctors)

    return(
        <>
            <h1>Doctors</h1>
            {loading ? <Loader /> : error ? <Message variant="danger"></Message>
            :(
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Doctor Name</th>
                            <th>Email</th>
                            <th>Registration Number</th>
                            <th>Registration Date</th>
                            <th>Registered Council</th>
                            <th>DOB</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map(doctor => (
                            <tr key={doctor._id}>
                                <td>{doctor.doctorName}</td>
                                <td><a href={`mailto:${doctor.email}`}>{doctor.email}</a></td>
                                <td>{doctor.registrationNumber}</td>
                                <td>{doctor.registrationDate}</td>
                                <td>{doctor.registeredCouncil}</td>
                                <td>{doctor.dateOfBirth}</td>
                                <td>{doctor.address}</td>
                                <td>{doctor.mobileNumber}</td>
                                <td>
                                    {doctor.isDoctor 
                                    ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                    : (<i className="fas fa-times" style={{color: 'red'}}></i>)}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/doctor/${doctor._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" 
                                            onClick={() => deleteHandler(doctor._id)}>
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

export default DoctorListScreen;