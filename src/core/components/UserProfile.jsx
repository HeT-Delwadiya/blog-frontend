import React from "react";
import { useSelector } from 'react-redux';

function UserProfile(props) {

       const user = useSelector((state) => state.auth);
       const userData = useSelector((state) => state.user);

       return (
              <div>
                     <div className="card mb-5 rounded">
                            <div className="panel px-4">
                                   <div className="panel-body bio-graph-info">
                                          <div className="row fw-bold">
                                                 <div className="bio-row pt-4">
                                                        <p>
                                                               <span>
                                                                      Name: {user.name}
                                                               </span>
                                                        </p>
                                                 </div>
                                                 <div className="bio-row">
                                                        <p>
                                                               <span>
                                                                      Email: {user.email}
                                                               </span>
                                                        </p>
                                                 </div>
                                                 <div className="bio-row">
                                                        <p>
                                                               <span>
                                                                      Country:
                                                                      India
                                                               </span>
                                                        </p>
                                                 </div>
                                                 <div className="bio-row">
                                                        <p>
                                                               <span>
                                                                      Role: {user.role===0 ? "User" : "Admin"}
                                                               </span>
                                                        </p>
                                                 </div>
                                                 <div className="bio-row">
                                                        <p>
                                                               <span>
                                                                      Total
                                                                      posts: {userData.posts.length}
                                                               </span>
                                                        </p>
                                                 </div>
                                                 <div className="bio-row pb-2">
                                                        <p>
                                                               <span>
                                                                      Total
                                                                      drafts: {userData.drafts.length}
                                                               </span>
                                                        </p>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>
       );
}

export default UserProfile;
