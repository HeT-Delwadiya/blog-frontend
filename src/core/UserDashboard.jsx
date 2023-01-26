import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ShowLoading from "../components/ShowLoading";
import ShowError from "../components/ShowError";
import UserNav from './components/UserNav';
import UserProfile from "./components/UserProfile";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { setUserData } from "../state/reducers/userReducers";
import {getUserById} from "./helper/userapi";
import EditProfile from "./components/EditProfile";
import UserPostsList from "./components/UserPostsList";
import UserDraftsList from "./components/UserDraftsList";
import _ from "lodash";

function UserDashboard(props) {

       const {userId} = useParams();
       const [activeTab, setActiveTab] = useState("profile");
       const [isLoading, setIsLoading] = useState(true);
       const [error, setError] = useState(false);
       const dispatch = useDispatch();
       const user = useSelector((state) => state.auth);
       const userData = useSelector((state) => state.user);
       

       const getUserData = () => {
              getUserById(userId, user.token)
              .then(res => {
                     if(!res.err) {
                            const data = {
                                   posts: _.reverse(res.posts),
                                   drafts: _.reverse(res.drafts)
                            }
                            dispatch(setUserData(data));
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       useEffect(() => {
              getUserData();
       }, []);

       const footerPos = () => {
              if(activeTab==="profile")
                     return true
              if(activeTab==="posts" && userData.posts.length<3)
                     return true
              if(activeTab==="drafts" && userData.drafts.length<3)
                     return true
              return false
       }

       return (
              <div>
                     <Header />
                            <div className="container my-5">
                                   <ShowLoading isLoading={isLoading} />
                                   <ShowError error={error} />
                                   <div className="row">
                                          <div className="col-md-3">
                                                 <UserNav activeTab={activeTab} setActiveTab={setActiveTab} />
                                          </div>
                                          <div className="col">
                                                 {activeTab==="profile" && <UserProfile />}
                                                 {activeTab==="edit" && <EditProfile/>}
                                                 {activeTab==="posts" && <UserPostsList />}
                                                 {activeTab==="drafts" && <UserDraftsList /> }
                                          </div>
                                   </div>
                            </div>
                            
                     <Footer small={footerPos()} />
              </div>
       );
}

export default UserDashboard;