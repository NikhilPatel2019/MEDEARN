import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import { logoutPharmacy } from '../actions/pharmacyActions';
import { logoutDoctor } from '../actions/doctorActions';
import { Route } from 'react-router-dom';
import SearchBox from './searchBox';


const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;  
  
  const pharmacyLogin = useSelector(state => state.pharmacyLogin);
  const {  pharmacyInfo } = pharmacyLogin;

  const doctorLogin = useSelector(state => state.doctorLogin);
  const {  doctorInfo } = doctorLogin;

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout());
}

const pharmacylogoutHandler = () => {
  dispatch(logoutPharmacy());
}

const doctorlogoutHandler = () => {
  dispatch(logoutDoctor());
}

    return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>

          {/* ============================================================================================== */}
          {/* Below code of CONDITIONS will direct to different routes according to different INFOrmation
          = IF doctor is Logged in then to /doctordashboard route
          = IF pharmacy is Logged in then to /pharmacydashboard route
          = AND if there is no doctor or pharmacy INFO then it wil go to / route(i.e localhost:3000) */}
          {doctorInfo 
              ? (
                <LinkContainer to='/doctordashboard'>
                  <Navbar.Brand >MedEarn</Navbar.Brand>
                </LinkContainer>
                )
              : pharmacyInfo ? (
                  <LinkContainer to='/pharmacydasboard'>
                      <Navbar.Brand >MedEarn</Navbar.Brand>
                  </LinkContainer>
              )
              : (
                <LinkContainer to='/'>
                  <Navbar.Brand >MedEarn</Navbar.Brand>
                </LinkContainer>
                )
          }
          {/* ============================================================================================== */}
          
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* SEARCHBOX AND CART */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">     
              <LinkContainer to='/cart'>
                <Nav.Link >
                  <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
              </LinkContainer>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

          {/* ============================================================================================== */}
          {/* According to login information(User Profile) Dropdown  will be displayed according to it
          Normal User, Pharmacies And Doctors all of them will have different options in DROPDOWN */}
              {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/user/sellmedicine">
                   <NavDropdown.Item>Sell Medicine</NavDropdown.Item>
                 </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Sign Out</NavDropdown.Item>
                  </NavDropdown>
              ):  (pharmacyInfo) ? (
                      <NavDropdown title={pharmacyInfo.name} id="pharmacymenu">
                          <LinkContainer to="/pharmacyprofile">
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/pharmacy/sellmedicine">
                              <NavDropdown.Item>Sell Medicines</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/pharmacy/orders">
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={pharmacylogoutHandler}>Sign Out</NavDropdown.Item>
                      </NavDropdown>
                    ) :
                    (doctorInfo) ? (
                      <NavDropdown title={doctorInfo.name} id="doctormenu">
                          <LinkContainer to="/doctorprofile">
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/doctor/verifyproducts">
                              <NavDropdown.Item>Verify Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/doctor/verifyorders">
                              <NavDropdown.Item>Verify Orders</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={doctorlogoutHandler}>Sign Out</NavDropdown.Item>
                      </NavDropdown>
                    ) :
              <LinkContainer to='/login'>
                <Nav.Link >
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              </LinkContainer>
              }
          {/* ============================================================================================== */}

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* IF THE USER IS ADMIN */}
              {userInfo && userInfo.isAdmin && (
                 <NavDropdown title='Admin' id="adminmenu">
                 <LinkContainer to="/admin/userlist">
                   <NavDropdown.Item>Users</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to="/admin/productlist">
                   <NavDropdown.Item>Products</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to="/admin/orderlist">
                   <NavDropdown.Item>Orders</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to="/admin/pharmacylist">
                   <NavDropdown.Item>Pharmacies</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to="/admin/doctorlist">
                   <NavDropdown.Item>Doctors</NavDropdown.Item>
                 </LinkContainer>
               </NavDropdown>
              )}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    </header>
  )
}

export default Header
