import React , {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";


export default function Dashboard() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);  // State to store user info
    const [isLoading, setIsLoading] = useState(true);  // State to handle loading
  

    // Fetch user info from the server and set the user info state, if authenticated, else redirect to login page
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${apiUrl}/`, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    console.log('Authenticated');
                    console.log(res.data);
                    setUserInfo(res.data.userInfo);
                        console.log(res.data.userInfo);

                    setIsLoading(false);
                } else {
                    // Redirect to login page if not authenticated
                    console.log('Not authenticated - redirecting to login page');
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.log('Error code - redirecting to login page');
                console.error('Error fetching data', error);
                navigate('/login');
            });
        
    },  [navigate, apiUrl]);

  

    //Render the dashboard content based on the user's access level
    const renderDashboardContent = () => {
       
        switch(userInfo.access_level) {
            case 1 :
                return <AdminDashboard userinfo={userInfo} />;
            case 2 :
                return <ManagerDashboardContent />;
            case 3 :
                return <InstructorDashBoardContent />;
            case 4 :
                return <UserDashboardContent />;
            default:
                return <div>Unauthorized access</div>;
        }
    };
  
    if (isLoading) {
        return <div><h1>Loading...</h1></div>;
    }
  
    return (
        <div>
           
           {renderDashboardContent()}
  
        </div>
    );
  }
  



function ManagerDashboardContent() {
    return <div>Manager Dashboard Content</div>;
}
function InstructorDashBoardContent() {
    return <div>User Dashboard Content</div>;
}

function UserDashboardContent() {
    return <div>User Dashboard Content</div>;
}