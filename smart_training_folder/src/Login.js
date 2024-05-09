import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; 
import React , {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from 'axios'


const Login = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [values, setValues] = useState(
        {
            staffNumber: '',
            password: ''
        });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;



    useEffect(() => {
        const checkCookie = async () => {
            try {
                const res = await axios.get(`${apiUrl}/check-cookie`);
                if (res.status === 200 && res.data.result === 'success') {
                    console.log('Cookie found, redirecting to /');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error checking cookie', error);
            }
        };

        checkCookie();
    });
    


    const handleSubmit = async (e) => { 
        e.preventDefault();
        console.log("CLIENT request to Login");
        try {
            const res = await axios.post(`${apiUrl}/login`, values);
                //if response is 200, redirect to the / page
                //else pop out a alert password or staff number is incorrect
                if (res.status === 200 && res.data.result === 'success') {
                    console.log('Login successful');
                    navigate('/');
                } else {
                    console.log('Login failed');
                   
                }
        }   catch (error) { 
            alert('Some Server Error Occured, Please try again later');
            console.error('Error logging in', error);
        }

        
    }


    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100'>
            <div className='row rounded-4 bg-white shadow box-area'> 
               
                <div className='col-md-6  d-flex justify-content-center align-items-center flex-column left-box'>
                    
                    <img src="/amu_logo.png" alt="Logo" className="logo rounded-circle shadow"/>
                    
                    <div className='overlay'>
                       
                        <h2 className='text-center mt-5 text-white'>Welcome</h2>
                        <p className=' text-center text-white'>Smart Training Folder</p>
                    </div>
                </div>
                    <div className='col-md-6 right-box'>
                        <div className='row align-items-center'>
                             <div className=' header-text text-center mb-4 mt-4'>
                                <h2>Login</h2>
                               
                            </div>
                           
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="staffNumber" className="form-label" id='staffNumberID' >Staff Number </label>
                                    <input onChange={(e) =>setValues({ ...values, staffNumber: e.target.value })} type="text" className="form-control form-control-lg bg-light fs-6" placeholder='Staff Number' id="staffNumber" aria-describedby="staffNumberHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label" id='passwordID' >Password</label>
                                    <input onChange={(e) =>setValues({ ...values, password: e.target.value })} type="password" className="form-control form-control-lg bg-light fs-6" placeholder='Password' id="password"/>
                                </div>

                                <div className=" input-group mb-5 d-flex justify-content-between">
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="check1ID"/>
                                    <label className="form-check-label" htmlFor="check1ID">Remember me</label>
                                </div>
                                    <div className="mb-3 forgot">
                                          <a href="#" className="text-decoration-none">Forgot Password?</a>
                                    </div>
                                </div>

                                
                                <button type="submit" className="btn mb-5 btn-primary shadow w-100">Login</button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Login;
