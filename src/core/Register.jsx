import React, {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { authenticate, isAuthenticated, registerUser } from '../auth/index';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthData } from "../state/reducers/authReducers";
import { Navigate } from 'react-router-dom';
import ShowLoading from "../components/ShowLoading";
import ShowError from "../components/ShowError";

function Register(props) {

       const [data, setData] = useState({
              name: "",
              email: "",
              password: "",
       });
       const [error, setError] = useState(false);
       const [isLoading, setIsLoading] = useState(false);
       const [redirect, setRedirect] = useState(false);

       const dispatch = useDispatch();
       const user = useSelector((state) => state.auth);

       const {name,email,password} = data;

       useEffect(() => {
              user && user._id!=="" && setRedirect(true)
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, []);

       const handleChange = name => (event) => {
              event.preventDefault();
              setData({...data, [name] : event.target.value});
              setError(false);
       }

       const handleClick = (event) => {
              event.preventDefault();
              if(name==="" || email==="" || password==="")
                     return setError("Please enter valid name, email and password!");
              setIsLoading(true);
              
              //handle register process
              registerUser(data)
              .then(res => {
                     if(!res.Message) {
                            authenticate(res, () => {
                                   const jsonData = isAuthenticated();
                                   const data = {
                                          _id: jsonData._id,
                                          role: jsonData.role,
                                          name: jsonData.name,
                                          email: jsonData.email,
                                          token: jsonData.token
                                   }
                                   dispatch(setAuthData(data));
                            });
                            setIsLoading(false);
                            setRedirect(true);
                     } else {
                            setError(res.Message);
                            setIsLoading(false);
                     }
              })
              .catch(err => console.log(err) && setIsLoading(false));
       }

       const redirectToHome = () => {
              if(redirect) {
                     return <Navigate to={"/"} />
              }
       }

       return (
              <div>
                     <Header/>
                            <div className="container">
                                   <div className="row d-flex justify-content-center">
                                          <div className="col-md-6 mb-5">
                                                 <ShowError error={error} />
                                                 <ShowLoading isLoading={isLoading} />
                                                 {redirectToHome()}
                                                 <div className="card px-5 py-5 my-5">
                                                        <div className="form-data">
                                                               <div className="forms-inputs mb-4"> 
                                                                      <span className="dark-text fw-bold">Full name</span> 
                                                                      <input type="text" onChange={handleChange("name")} value={name} className="form-control mt-1"/>
                                                               </div>
                                                               <div className="forms-inputs mb-4"> 
                                                                      <span className="dark-text fw-bold">Email address</span> 
                                                                      <input type="email" onChange={handleChange("email")} value={email} className="form-control mt-1"/>
                                                               </div>
                                                               <div className="forms-inputs mb-4"> 
                                                                      <span className="dark-text fw-bold">Password</span> 
                                                                      <input type="password" onChange={handleChange("password")} value={password} className="form-control mt-1"/>
                                                               </div>
                                                               <div className="mb-3"> 
                                                                      <button className="btn btn-dark w-100 mt-3 fw-bold" onClick={handleClick}>Register</button> 
                                                               </div>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     <Footer/>
              </div>
       );
}

export default Register;