import React , {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
// import { Alert } from "bootstrap";


export default function Dashboard() {
    
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);  // State to store user info
    const [isLoading, setIsLoading] = useState(true);  // State to handle loading
  
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/')
            .then((res) => {
                if (res.status === 200) {
                    console.log('Authenticated');
                    console.log(res.data);
                    setUserInfo(res.data.userInfo);
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
        
    }, [navigate]);
  
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
            localStorage.removeItem('userInfo'); // Clear user info from local storage
            setUserInfo(null);  // Update local state
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Failed to log out, please try again.');
        }
    };
  
  
  
    if (isLoading) {
        return <div><h1>Loading...</h1></div>;
    }
  
    return (
        <div>
            {userInfo ? (
                <h1>Welcome {userInfo.name} {userInfo.surname}! Your email is {userInfo.email}</h1>
            ) : (
                <h1>You are not logged in.</h1>
            )}
  
            <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
  
        </div>
    );
  }
  