import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { refreshUsersList, removeUser } from "../../state/reducers/adminReducers";
import { deleteUser } from "../helper/adminapis";

function UserCard(props) {

       const navigate = useNavigate();

       const dispatch = useDispatch();
       const adminData = useSelector(state => state.admin);
       const user = useSelector((state) => state.auth);

       const handleDeleteUser = (event) => {
              event.preventDefault();
              deleteUser(user._id, props.user._id, user.token)
              .then(res => {
                     if(!res.err) {
                            dispatch(removeUser(props.user._id));
                            dispatch(refreshUsersList());
                     }
              })
              .catch(err => console.log(err))
       }

       const deletePostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`deleteUserPop${props.user?._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to remove this user?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleDeleteUser} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Remove</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       return (
              <div>
                     {deletePostPopup()}
                     <div className="card shadow mb-2">
                            <div className="d-flex justify-content-between p-3">
                                   <div className="d-inline align-items-center fw-bold">
                                          <div className="">Name: {props.user.name}</div>
                                          <div className="">Email: {props.user.email}</div>
                                   </div>
                                   <div className="d-inline row">
                                          <div className="col-12 mb-2"><button className="btn btn-outline-purple btn-sm w-100 fw-bold" onClick={() => props.setDisplayUser(props.user._id)}>View</button></div>
                                          <div className="col-12"><button className="btn btn-outline-danger btn-sm w-100 fw-bold" data-bs-toggle="modal" data-bs-target={`#deleteUserPop${props.user?._id}`} >Remove</button></div>
                                   </div>
                            </div>
                     </div>
              </div>
       );
}

export default UserCard;