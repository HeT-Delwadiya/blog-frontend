import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { authenticate, loginUser, isAuthenticated } from '../auth/index';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthData } from "../state/reducers/authReducers";
import { Navigate } from 'react-router-dom';
import ShowLoading from "../components/ShowLoading";
import ShowError from "../components/ShowError";

function Login(props) {

       const [data, setData] = useState({
              email: "",
              password: "",
       });
       const [error, setError] = useState(false);
       const [isLoading, setIsLoading] = useState(false);
       const [redirect, setRedirect] = useState(false);

       const dispatch = useDispatch();
       const user = useSelector((state) => state.auth);

       const {email,password} = data;

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
              if(email==="" || password==="")
                     return setError("Please enter valid email and password!");
              setIsLoading(true);

              //handle login process
              loginUser(data)
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
                     return <Navigate to={"/"}/>
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
                                                                      <span className="dark-text fw-bold">Email address</span> 
                                                                      <input onChange={handleChange("email")} value={email} type="email" className="form-control mt-1"/>
                                                               </div>
                                                               <div className="forms-inputs mb-4"> 
                                                                      <span className="dark-text fw-bold">Password</span> 
                                                                      <input onChange={handleChange("password")} value={password} type="password" className="form-control mt-1"/>
                                                               </div>
                                                               <div className="mb-3"> 
                                                                      <button onClick={handleClick} className="btn btn-dark w-100 mt-3 fw-bold">Login</button> 
                                                               </div>
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     <Footer small={true} />
              </div>
       );
}

export default Login;