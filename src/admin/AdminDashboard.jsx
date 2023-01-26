import _ from "lodash";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ShowError from "../components/ShowError";
import ShowLoading from "../components/ShowLoading";
import { getUserById } from "../core/helper/userapi";
import { setUserData } from "../state/reducers/userReducers";
import AdminNav from "./components/AdminNav";
import AdminProfile from "./components/AdminProfile";
import EditProfile from "../core/components/EditProfile";
import ListUsers from "./ListUsers";
import PublishedPosts from "./PublishedPosts";
import PendingPosts from "./PendingPosts";

function AdminDashboard(props) {

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

       return (
              <div>
                     <Header />
                            <div className="container my-5">
                                   <ShowLoading isLoading={isLoading} />
                                   <ShowError error={error} />
                                   <div className="row">
                                          <div className="col-md-3">
                                                 <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
                                          </div>
                                          <div className="col">
                                                 {activeTab==="profile" && <AdminProfile/>}
                                                 {activeTab==="edit" && <EditProfile />}
                                                 {activeTab==="users" && <ListUsers/>}
                                                 {activeTab==="published_posts" && <PublishedPosts/>}
                                                 {activeTab==="pending_posts" && <PendingPosts/>}
                                          </div>
                                   </div>
                            </div>
                            
                     <Footer small={activeTab==="profile" && true} />
              </div>
       );
}

export default AdminDashboard;