import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/header';
import Footer from './components/footer';
import HomeScreen from "./screens/homeScreen";
import ProductScreen from './screens/productScreen';
import PharmacyProductScreen from './screens/pharmacyScreens/pharmacyProductScreen';
import CartScreen from './screens/cartScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import RegisterPharmacyScreen from './screens/registerPharmacyScreen';
import RegisterDoctorScreen from './screens/registerDoctorScreen';
import ProfileScreen from './screens/profileScreen';
import ShippingScreen from './screens/shippingScreen';
import PaymentScreen from './screens/paymentScreen';
import PlaceOrderScreen from './screens/placeorderScreen';
import OrderScreen from './screens/orderScreen';
import OrderListScreen from './screens/orderListScreen';
import UserListScreen from './screens/userListScreen';
import UserEditScreen from './screens/userEditScreen';
import ProductListScreen from './screens/productListScreen';
import ProductEditScreen from './screens/productEditScreen';
import PharmacyListScreen from './screens/pharmacyListScreen';
import PharmacyEditScreen from './screens/pharmacyEditScreen';
import DoctorListScreen from './screens/doctorListScreen';
import DoctorEditScreen from './screens/doctorEditScreen';
import SellMedicineScreen from './screens/sellMedicineScreen';
import UsersMedicineEditScreen from './screens/usersMedicineEditScreen';
import PharmacyDashboard from './screens/pharmacyDashboard';
import DoctorProductScreen from './screens/doctorProductScreen';
import VerifyOrdersListScreen from './screens/verifyOrderListScreen';
import VerifyOrderScreen from './screens/verifyOrderScreen';
import DoctorDashboard from './screens/doctorDashboard';
import VerifyProductsScreen from './screens/verifyProductsScreen';
import SellB2CMedicineScreen from './screens/pharmacyScreens/sellB2CScreen';
import B2CMedicineEditScreen from './screens/pharmacyScreens/b2cProductEditScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* HomeScreen component will be loaded on / path */}
          <Route path='/order/:id'component={OrderScreen} />
          <Route path='/shipping'component={ShippingScreen} />
          <Route path='/payment'component={PaymentScreen} />
          <Route path='/placeorder'component={PlaceOrderScreen} />
          <Route path='/login'component={LoginScreen} />
          <Route path='/register'component={RegisterScreen} />
          <Route path='/registerpharmacy'component={RegisterPharmacyScreen} />
          <Route path='/registerdoctor'component={RegisterDoctorScreen} />
          <Route path='/profile'component={ProfileScreen} />
          <Route path='/product/:id'component={ProductScreen} />
          <Route path='/pharmacyProduct/:id'component={PharmacyProductScreen} />
          <Route path='/cart/:id?'component={CartScreen} />
          <Route path='/admin/userlist'component={UserListScreen} />
          <Route path='/admin/user/:id/edit'component={UserEditScreen} />
          <Route path='/admin/pharmacylist'component={PharmacyListScreen} />
          <Route path='/admin/pharmacy/:id/edit'component={PharmacyEditScreen} />
          <Route path='/admin/doctorlist'component={DoctorListScreen} />
          <Route path='/admin/doctor/:id/edit'component={DoctorEditScreen} />
          <Route path='/admin/productlist'component={ProductListScreen} exact/>
          <Route path='/admin/productlist/:pageNumber'component={ProductListScreen} exact/>
          <Route path='/admin/orderlist'component={OrderListScreen} exact/>
          <Route path='/user/sellmedicine'component={SellMedicineScreen} />
          <Route path='/user/medicine/:id/edit'component={UsersMedicineEditScreen} />
          <Route path='/pharmacy/sellmedicine'component={SellB2CMedicineScreen} exact/>
          <Route path='/pharmacy/medicine/:id/edit'component={B2CMedicineEditScreen} />
          <Route path='/admin/product/:id/edit'component={ProductEditScreen} />
          <Route path='/search/:keyword'component={HomeScreen} exact/>
          <Route path='/page/:pageNumber'component={HomeScreen} exact />
          <Route path='/search/:keyword/:pageNumber'component={HomeScreen} exact />
          <Route path='/doctor/verifyproducts'component={VerifyProductsScreen} exact />
          <Route path='/doctor/verifyorders'component={VerifyOrdersListScreen} exact />
          <Route path='/doctor/product/:id'component={DoctorProductScreen} exact />
          <Route path='/doctor/order/:id'component={VerifyOrderScreen} exact />
          <Route path='/pharmacy'component={PharmacyDashboard} exact />
          <Route path='/doctordashboard'component={DoctorDashboard} exact />
          <Route path='/'component={HomeScreen} exact />
        </Container>
      </main>      
      <Footer />
    </Router>
  );
}

export default App;
