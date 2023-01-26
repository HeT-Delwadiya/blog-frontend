import React, { useState } from 'react';
import _ from "lodash";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { removeDraft, removePost, setUserData } from "../../state/reducers/userReducers";
import { deleteDraft, deletePost, getUserById, publishDraftToPost } from "../helper/userapi";
import { updatePendingPostToPublished, removePublishedPost, refreshPendingPostsList, refreshPublishedPostsList } from "../../state/reducers/adminReducers";
import { approvePost } from "../../admin/helper/adminapis";


function UserPostCard(props) {

       const navigate = useNavigate();
       const user = useSelector((state) => state.auth);
       const dispatch = useDispatch();

       const handleDeletePost = (event) => {
              event.preventDefault();
              if(props.isPost) {
                     deletePost(user._id, props.post._id, user.token)
                     .then(res => {
                            if(!res.err)
                                   props.isAdminControl ? props.isPublished ? dispatch(refreshPublishedPostsList()) : dispatch(refreshPendingPostsList()) : dispatch(removePost(props.post._id))
                     })
                     .catch(err => console.log(err))
              } else {
                     deleteDraft(user._id, props.post._id, user.token)
                     .then(res => {
                            if(!res.err)
                                   dispatch(removeDraft(props.post._id))
                     })
                     .catch(err => console.log(err))
              }
              
       }

       const handlePublishPost = (event) => {
              event.preventDefault();
              publishDraftToPost(user._id, props.post._id, user.token)
              .then(res => {
                     if(!res.err) {
                            getUserById(user._id, user.token)
                            .then(res => {
                                   if(!res.err) {
                                          dispatch(setUserData(res));
                                   }
                            })
                            .catch(err => console.log(err))
                     }
              })
              .catch(err => console.log(err))
       } 

       const handleApprovePost = (event) => {
              event.preventDefault();
              approvePost(user._id, props.post._id, user.token)
              .then(res => {
                     if(!res.err) {
                            dispatch(updatePendingPostToPublished(props.post._id))
                     }
              })
              .catch(err => console.log(err))
       }

       const deletePostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`deletePostPop${props.post?._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to delete this {props.isPost ? "post" : "draft"}?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleDeletePost} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Delete</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const publishPostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`publishPostPop${props.post?._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to publish this draft?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-danger rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handlePublishPost} data-bs-dismiss="modal" className="btn btn-success rounded-3">Publish</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const approvePostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`approvePostPop${props.post?._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to approve this post?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-danger rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleApprovePost} data-bs-dismiss="modal" className="btn btn-success rounded-3">Publish</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       return (
              <div className="card mb-2 shadow"> 
                     {deletePostPopup()}
                     {publishPostPopup()}
                     {approvePostPopup()}
                     <div className="d-flex justify-content-between p-3">
                            <div>
                                   <div className="d-flex align-items-center">
                                          <h5 className="card-title fw-bold">{props.isPost ? props.post?.postTitle : props.post?.draftTitle}</h5>
                                          {props.isPost && (<span class={props.post.isApproved ? "badge bg-success ms-3 mb-2": "badge bg-dark ms-3 mb-2"}>{props.post.isApproved ? "Published" : "Pending approval"}</span>)}
                                   </div>
                                   <p className="card-text fw-bolder me-3" dangerouslySetInnerHTML={{ __html: props.isPost ? _.truncate(props.post?.postShortDescription, {'length': 300,'separator': ' '}) : _.truncate(props.post?.draftShortDescription, {'length': 300,'separator': ' '}) }}></p>
                            </div>
                            {!props.isAdmin && (<div className="d-inline row">
                                   {props.isApprovable && <div className="col-12 mb-2"><button className="btn btn-outline-purple btn-sm w-100 fw-bold" onClick={() => navigate(`/admin/${user._id}/post/${props.post._id}/view`)}>View</button></div>}
                                   {!props.isApprovable && (<div className="col-12 mb-2"><button className="btn btn-outline-purple btn-sm w-100 fw-bold" onClick={() => props.isPost ? navigate(`/user/${user._id}/post/${props.post._id}/edit`) : navigate(`/user/${user._id}/draft/${props.post._id}/edit`)}>Edit</button></div>)}
                                   {!props.isPost && (<div className="col-12 mb-2"><button className="btn btn-outline-success btn-sm w-100 fw-bold" data-bs-toggle="modal" data-bs-target={`#publishPostPop${props.post?._id}`}>Publish</button></div>)}
                                   {props.isApprovable && (<div className="col-12 mb-2"><button className="btn btn-outline-success btn-sm w-100 fw-bold" data-bs-toggle="modal" data-bs-target={`#approvePostPop${props.post?._id}`} >Approve</button></div>)}
                                   <div className="col-12"><button className="btn btn-outline-danger btn-sm w-100 fw-bold" data-bs-toggle="modal" data-bs-target={`#deletePostPop${props.post?._id}`} >Delete</button></div>
                            </div>)}
                     </div>
              </div>
       );
}

export default UserPostCard;