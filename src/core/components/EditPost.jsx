import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import TextEditor from "../components/TextEditor";
import ShowError from "../../components/ShowError";
import ShowLoading from "../../components/ShowLoading";
import ShowSuccess from "../../components/ShowSuccess";
import { getDraftById, getPostById, publishPostFromDraft, updateDraft, updatePost } from "../helper/userapi";

function EditPost(props) {

       const navigate = useNavigate();
       const user = useSelector(state => state.auth);

       const [postTitle, setPostTitle] = useState("");
       const [postData, setPostData] = useState("<h1>Please wait, loading content...</h1>");
       const [postDescription, setPostDescription] = useState("");
       const [status, setStatus] = useState(false);
       const [isLoading, setIsLoading] = useState(false);
       const [error, setError] = useState(false);
       const [success, setSuccess] = useState(false);

       const loadData = () => {
              if(props.isPost) {
                     getPostById(props.postId)
                     .then(res => {
                            if(!res.err) {
                                   setPostTitle(res.postTitle);
                                   setPostDescription(res.postShortDescription);
                                   setPostData(res.postData);
                                   setStatus(res.isApproved ? "Published" : "Pending approval");
                            }
                            setIsLoading(false);
                     })
                     .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
              } else {
                     getDraftById(user._id, props.postId, user.token)
                     .then(res => {
                            if(!res.err) {
                                   setPostTitle(res.draftTitle);
                                   setPostDescription(res.draftShortDescription);
                                   setPostData(res.draftData);
                            }
                            setIsLoading(false);
                     })
                     .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
              }
              
       }

       useEffect(() => {
              loadData();
       }, []); 

       const handlePublishUpdate = (event) => {
              event.preventDefault();
              setIsLoading(true);
              const data = {
                     postTitle,
                     postShortDescription: postDescription,
                     postData
              }
              updatePost(user._id, props.postId, data, user.token)
              .then(res => {
                     if(!res.err) {
                            setSuccess("Post updated successfully!")
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const handleDraftUpdate = (event) => {
              event.preventDefault();
              setIsLoading(true);
              const data = {
                     draftTitle: postTitle,
                     draftShortDescription: postDescription,
                     draftData: postData
              }
              updateDraft(user._id, props.postId, data, user.token)
              .then(res => {
                     if(!res.err) {
                            setSuccess("Draft updated successfully!")
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const handlePublishPostFromDraft = (event) => {
              event.preventDefault();
              setIsLoading(true);
              const data = {
                     fromInputs: true,
                     postTitle,
                     postShortDescription: postDescription,
                     postData
              }
              publishPostFromDraft(user._id, props.postId, data, user.token)
              .then(res => {
                     if(!res.err) {
                            setSuccess("Post submitted successfully to admin for review!")
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const updatePostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`updatePostPop`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to update this post?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-danger rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handlePublishUpdate} data-bs-dismiss="modal" className="btn btn-success rounded-3">Update</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const publishPostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`publishPostPop`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to publish this post?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-danger rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handlePublishPostFromDraft} data-bs-dismiss="modal" className="btn btn-success rounded-3">Publish</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const updateDraftPopup = () => {
              return (<div>
                     <div className="modal fade" id={`updateDraftPop`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to update this draft?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-danger rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleDraftUpdate} data-bs-dismiss="modal" className="btn btn-success rounded-3">Update</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       return (
              <div>
                     
                     <div className="container">
                            {updatePostPopup()}
                            {publishPostPopup()}
                            {updateDraftPopup()}
                            <ShowError error={error} />
                            <ShowLoading isLoading={isLoading} />
                            <ShowSuccess success={success} />
                            <div className="d-flex justify-content-between">
                                   <button className="btn btn-outline-dark mb-4" onClick={(e) => navigate(`/user/${user._id}/profile`)}><i className="fa-solid fa-arrow-left"></i>  Back</button>
                                   <div>
                                          {!props.isPost && (<button className={`btn btn-outline-purple mb-4 me-4 fw-bold ${success && "disabled"}`} data-bs-toggle="modal" data-bs-target={`#updateDraftPop`} ><i className="fa-solid fa-floppy-disk"></i>   Save Draft</button>)}
                                          {!props.isPost && (<button className={`btn btn-outline-success mb-4 fw-bold ${success && "disabled"}`} data-bs-toggle="modal" data-bs-target={`#publishPostPop`}><i className="fa-solid fa-upload"></i>   Publish</button>)}
                                          {props.isPost && (<button className={`btn btn-outline-success mb-4 fw-bold ${success && "disabled"}`} data-bs-toggle="modal" data-bs-target={`#updatePostPop`}><i className="fa-solid fa-upload"></i>   Publish Update</button>)}
                                   </div>
                            </div>
                            {status && (<span class="badge bg-dark p-2 mb-3"><i class="fa-solid fa-circle-exclamation"></i>  Status:  {status}</span>)}
                            <div><input className="form-control form-control-lg mb-4 shadow" value={postTitle} onChange={(e) => {setPostTitle(e.target.value); setError(false)}} type="text" placeholder="Post title..." aria-label="post title"/></div>
                            <div><textarea className="form-control form-control mb-4 shadow" value={postDescription} onChange={(e) => {setPostDescription(e.target.value); setError(false)}} type="text" placeholder="Short description of post..." aria-label="post description" rows={5}/></div>
                            <div><TextEditor postData={postData} setPostData={setPostData} setError={setError} /></div>
                     </div>
                     
              </div>
       );
}

export default EditPost;