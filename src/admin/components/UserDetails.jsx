import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getUser } from "../helper/adminapis";
import UserPostCard from "../../core/components/UserPostCard";
import { useNavigate } from "react-router";

function UserDetails(props) {

       const user = useSelector(state => state.auth);
       const [userData, setUserData] = useState({});
       const navigate = useNavigate();

       const loadUser = () => {
              getUser(user._id, props.userId, user.token)
              .then(res => {
                     if(!res.err) {
                            setUserData(res);
                     }
              })
              .catch(err => console.log(err))
       }

       useEffect(() => {
              loadUser();
       }, []);

       return (
              <div>
                     <button className="btn btn-outline-dark mb-4" onClick={(e) => props.setDisplayUser(false)}><i className="fa-solid fa-arrow-left"></i>  Back</button>
                     <div className="mb-4 mt-3 ms-1 fw-bold"><span className="theme-bg p-2 text-white rounded-3 mb-5">User Details:</span></div>
                     <div className="card">
                            <div className="fw-bold p-3 ms-3">
                                   <div className="mb-2">Name: {userData?.name}</div>
                                   <div className="mb-2">Email: {userData?.email}</div>
                                   <div className="mb-2">Total posts: {userData?.posts?.length}</div>
                                   <div className="mb-2">Total drafts: {userData?.drafts?.length}</div>
                            </div>
                     </div>

                     <div className="mb-4 mt-5 ms-1 fw-bold"><span className="theme-bg p-2 text-white rounded-3 mb-5">User Posts:</span></div>
                     {userData?.posts?.map((post) => <UserPostCard key={post._id} post={post} isPost={true} isAdmin={true} />) }
                     {userData?.posts?.length<1 && <h3 className="text-center">No posts available.</h3>}

                     <div className="mb-4 mt-5 ms-1 fw-bold"><span className="theme-bg p-2 text-white rounded-3 mb-5">User Drafts:</span></div>
                     {userData?.drafts?.map((draft) => <UserPostCard key={draft._id} post={draft} isPost={false} isAdmin={true} />) }
                     {userData?.drafts?.length<1 && <h3 className="text-center">No drafts available.</h3>}
              </div>
       );
}

export default UserDetails;