import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';


const Login = () => {
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
                           
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="staffNumber" className="form-label">Staff Number</label>
                                    <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder='Staff Number' id="staffNumber" aria-describedby="staffNumberHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder='Password' id="exampleInputPassword1"/>
                                </div>

                                <div className=" input-group mb-5 d-flex justify-content-between">
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                    <div className="mb-3 forgot">
                                          <a href="#" className="text-decoration-none">Forgot Password?</a>
                                    </div>
                                </div>

                                
                                <button type="submit" className="btn mb-5 btn-primary w-100">Login</button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Login;
