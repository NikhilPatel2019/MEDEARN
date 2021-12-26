import { Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DoctorDashboard = () => {
    return (
        <div>
            <h1>Welcome to MedEarn</h1>
            <h3>
            <Badge variant="warning">
                We are Working on Dashboard. Till then use the classy dropdown menu to 
            </Badge>
            </h3>

            <LinkContainer to="/doctorprofile">
                <h1><Badge variant="primary">View Profile</Badge></h1>
            </LinkContainer>

            <LinkContainer to="/doctor/verifproducts">
                
                <h1><Badge variant="primary">Verify Products</Badge></h1>
            </LinkContainer>

            <LinkContainer to="/doctor/verifyorders">
                <h1><Badge variant="primary">Verify Orders</Badge></h1>
            </LinkContainer>

            <h3>
            <Badge variant="success">
                or just click on the above headings
            </Badge>
            </h3>
        </div>
    )
}

export default DoctorDashboard;