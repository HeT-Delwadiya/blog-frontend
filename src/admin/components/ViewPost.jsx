import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import TextEditor from "../../core/components/TextEditor";
import ShowError from "../../components/ShowError";
import ShowLoading from "../../components/ShowLoading";
import ShowSuccess from "../../components/ShowSuccess";
import { getDraftById, getPostById } from "../../core/helper/userapi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { approvePost, deletePost } from "../helper/adminapis";

function ViewPost(props) {

       const navigate = useNavigate();
       const user = useSelector(state => state.auth);
       const {postId} = useParams();

       const [postTitle, setPostTitle] = useState("");
       const [postData, setPostData] = useState("<h1>Please wait, loading content...</h1>");
       const [postDescription, setPostDescription] = useState("");
       const [status, setStatus] = useState(false);
       const [isLoading, setIsLoading] = useState(false);
       const [error, setError] = useState(false);
       const [success, setSuccess] = useState(false);

       const loadData = () => {
              getPostById(postId)
              .then(res => {
                     if(!res.err) {
                            setPostTitle(res.postTitle);
                            setPostDescription(res.postShortDescription);
                            setPostData(res.postData);
                            setStatus(res.isApproved ? "Approved" : "Pending approval");
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
              
       }

       useEffect(() => {
              loadData();
       }, []);

       const handleApprovePost = (event) => {
              event.preventDefault();
              approvePost(user._id, postId, user.token)
              .then(res => {
                     if(!res.err) {
                            setStatus("Approved");
                            setSuccess("Post approved successfully!");
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const handleDeletePost = (event) => {
              event.preventDefault();
              deletePost(user._id, postId, user.token) 
              .then(res => {
                     if(!res.err) {
                            setStatus("Deleted");
                            setSuccess("Post deleted successfully!");
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const publishPostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`approvePostPop`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                 <button type="button" onClick={handleApprovePost} data-bs-dismiss="modal" className="btn btn-success rounded-3">Approve</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const deletePostPopup = () => {
              return (<div>
                     <div className="modal fade" id={`deletePostPop`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to delete this post?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-danger rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleDeletePost} data-bs-dismiss="modal" className="btn btn-success rounded-3">Approve</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       return (
              <div>
                     <Header/>
                     <div className="container">
                            {publishPostPopup()}
                            {deletePostPopup()}
                            <ShowError error={error} />
                            <ShowLoading isLoading={isLoading} />
                            <ShowSuccess success={success} />
                            <div className="d-flex justify-content-between">
                                   <button className="btn btn-outline-dark mb-4" onClick={(e) => navigate(`/admin/${user._id}/profile`)}><i className="fa-solid fa-arrow-left"></i>  Back</button>
                                   <div>
                                          <button className={`btn btn-outline-success mb-4 me-3 fw-bold ${success && "disabled"}`} data-bs-toggle="modal" data-bs-target={`#approvePostPop`}><i class="fa-solid fa-check"></i>   Approve Post</button>
                                          <button className={`btn btn-outline-danger mb-4 fw-bold ${success && "disabled"}`} data-bs-toggle="modal" data-bs-target={`#deletePostPop`}><i class="fa-solid fa-trash-can"></i>   Delete Post</button>
                                   </div>
                            </div>
                            {status && (<span class="badge bg-dark p-2 mb-3"><i class="fa-solid fa-circle-exclamation"></i>  Status:  {status}</span>)}
                            <div><input className="form-control form-control-lg mb-4 shadow" value={postTitle} onChange={(e) => {setPostTitle(e.target.value); setError(false)}} type="text" placeholder="Post title..." aria-label="post title"/></div>
                            <div><textarea className="form-control form-control mb-4 shadow" value={postDescription} onChange={(e) => {setPostDescription(e.target.value); setError(false)}} type="text" placeholder="Short description of post..." aria-label="post description" rows={5}/></div>
                            <div><TextEditor postData={postData} setPostData={setPostData} setError={setError} /></div>
                     </div>
                     <Footer/>
              </div>
       );
}

export default ViewPost;