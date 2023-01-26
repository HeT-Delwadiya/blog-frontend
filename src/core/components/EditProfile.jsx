import React, { useEffect, useState } from "react";
import ShowLoading from "../../components/ShowLoading";
import ShowError from "../../components/ShowError";
import ShowSuccess from "../../components/ShowSuccess";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from "../../auth";
import {updateAuthData} from "../../state/reducers/authReducers";

function EditProfile(props) {

       const [isLoading, setIsLoading] = useState(false);
       const [error, setError] = useState(false);
       const [success, setSuccess] = useState(false);
       const [data, setData] = useState({
              name: "",
              email: "",
              password: "",
       });

       const dispatch = useDispatch();
       const user = useSelector((state) => state.auth);
       const {name,email,password} = data;

       useEffect(() => {
              setData({ name: user.name, email: user.email})
       }, []);

       const handleChange = name => (event) => {
              event.preventDefault();
              setData({...data, [name] : event.target.value});
              setError(false);
       }

       const handleClick = (event) => {
              event.preventDefault();
              setIsLoading(true);
              
              updateUser(data, user._id, user.token)
              .then(res => {
                     if(!res.error) {
                            //change auth data in store
                            dispatch(updateAuthData({name: res.name, email: res.email}))
                            setIsLoading(false);
                            setSuccess("Profile updated successfully!");
                     } else {
                            setError(res.error);
                            setIsLoading(false);
                     }
              })
              .catch(err => console.log(err) && setIsLoading(false));
       }

       return (
              <div className="row d-flex justify-content-center">
                     <div className="col-md-10 mb-5">
                            <ShowError error={error} />
                            <ShowLoading isLoading={isLoading} />
                            <ShowSuccess success={success} />
                            <div className="card px-5 py-5">
                                   <div className="form-data">
                                          <div className="forms-inputs mb-4">
                                                 <span className="dark-text fw-bold">
                                                        Full name
                                                 </span>
                                                 <input
                                                        type="text"
                                                        className="form-control mt-1"
                                                        value={name}
                                                        onChange={handleChange("name")}
                                                 />
                                          </div>
                                          <div className="forms-inputs mb-4">
                                                 <span className="dark-text fw-bold">
                                                        Email address
                                                 </span>
                                                 <input
                                                        type="email"
                                                        className="form-control mt-1"
                                                        value={email}
                                                        onChange={handleChange("email")}
                                                 />
                                          </div>
                                          <div className="forms-inputs mb-4">
                                                 <span className="dark-text fw-bold">
                                                        Password
                                                 </span>
                                                 <input
                                                        type="password"
                                                        className="form-control mt-1"
                                                        value={password}
                                                        onChange={handleChange("password")}
                                                 />
                                          </div>
                                          <div className="mb-3">
                                                 <button
                                                        className="btn btn-dark w-100 mt-3 fw-bold"
                                                        onClick={handleClick}
                                                 >
                                                        Update
                                                 </button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
       );
}

export default EditProfile;
