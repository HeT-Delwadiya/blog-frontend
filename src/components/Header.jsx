/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetAuthData } from "../state/reducers/authReducers";
import { logout } from '../auth';
import { resetUserData } from "../state/reducers/userReducers";
import {resetAdminData} from "../state/reducers/adminReducers";

function Header(props) {

       const dispatch = useDispatch();
       const user = useSelector((state) => state.auth);
       
       return (
              <div className="mb-5">
                     <nav className={props.stickToTop ? "navbar navbar-expand-lg navbar-dark dark-bg fixed-top" : "navbar navbar-expand-lg navbar-dark dark-bg"} id="mainNav">
                     <div className="container px-4">
                            <a className="navbar-brand" href="/" style={{fontSize: "2rem", fontWeight: "700"}}>
                                   <span className="theme-text">Blog</span>Api
                            </a>
                            <button
                                   className="navbar-toggler"
                                   type="button"
                                   data-bs-toggle="collapse"
                                   data-bs-target="#navbarResponsive"
                                   aria-controls="navbarResponsive"
                                   aria-expanded="false"
                                   aria-label="Toggle navigation">
                                   <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                   <ul className="navbar-nav ms-auto justify-content-center">
                                          <li className="nav-item m-2">
                                                 <Link to={"/"} className="none-a" style={{fontSize: "1.5rem", fontWeight: window.location.pathname==="/" ? "800" : "400", color: window.location.pathname==="/" ? "#892cdc" : "#fff"}}>Home</Link>
                                          </li>

                                          {user && user._id==="" && (<><li className="nav-item ms-4 mt-2">
                                                 <Link to={"/register"} className="none-a" style={{fontSize: "1.5rem", fontWeight: window.location.pathname==="/register" ? "800" : "400", color: window.location.pathname==="/register" ? "#892cdc" : "#fff"}}>Register</Link>
                                          </li>
                                          <li className="nav-item ms-4 mt-2">
                                                 <Link to={"/login"} className="none-a" style={{fontSize: "1.5rem", fontWeight: window.location.pathname==="/login" ? "800" : "400", color: window.location.pathname==="/login" ? "#892cdc" : "#fff"}}>Login</Link>
                                          </li></>)}

                                          {user && user._id!=="" && (<li className="nav-item ms-4 mt-2">
                                                 <Link to={`/user/${user._id}/profile`} className="none-a" style={{fontSize: "1.5rem", fontWeight: window.location.pathname===`/user/${user._id}/profile` ? "800" : "400", color: window.location.pathname===`/user/${user._id}/profile` ? "#892cdc" : "#fff"}}>{user.name}</Link>
                                          </li>)}

                                          {user && user.role===33 && (<li className="nav-item ms-4 mt-2">
                                                 <Link to={`/admin/${user._id}/profile`} className="none-a" style={{fontSize: "1.5rem", fontWeight: window.location.pathname===`/admin/${user._id}/profile` ? "800" : "400", color: window.location.pathname===`/admin/${user._id}/profile` ? "#892cdc" : "#fff"}}>Admin Dashboard</Link>
                                          </li>)}

                                          {user && user._id!=="" && (<li className="nav-item ms-4">
                                                 <a className="nav-link text-white none-a" onClick={() => {
                                                        logout( () => {
                                                               dispatch(resetAuthData());
                                                               dispatch(resetUserData());
                                                               user && user?.role===33 && dispatch(resetAdminData());
                                                               return <Navigate to={"/"}/>
                                                        })}} target="_blank" style={{fontSize: "1.5rem", fontWeight: "400"}} rel="noreferrer">
                                                        Logout
                                                 </a>
                                          </li>)}


                                          <li className="nav-item ms-4">
                                                 <a className="nav-link text-white none-a" href="https://github.com/HeT-Delwadiya" target="_blank" style={{fontSize: "1.5rem", fontWeight: "400"}} rel="noreferrer">
                                                        About
                                                 </a>
                                          </li>
                                   </ul>
                            </div>
                     </div>
                     </nav>
              </div>
       );
}

export default Header;