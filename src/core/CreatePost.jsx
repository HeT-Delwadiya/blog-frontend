import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TextEditor from "./components/TextEditor";
import { createDraft, createPost } from "./helper/userapi";
import ShowError from "../components/ShowError";
import ShowLoading from "../components/ShowLoading";
import ShowSuccess from "../components/ShowSuccess";

function CreatePost(props) {

       const navigate = useNavigate();
       const user = useSelector(state => state.auth);

       const [postTitle, setPostTitle] = useState("");
       const [postData, setPostData] = useState("<h3>Post content goes here...</h3>");
       const [postDescription, setPostDescription] = useState("");
       const [isLoading, setIsLoading] = useState(false);
       const [error, setError] = useState(false);
       const [success, setSuccess] = useState(false);

       const handlePublish = (event) => {
              event.preventDefault();
              if(postTitle==="" || postData==="" || postData==="<h3>Post content goes here...</h3>" || postDescription==="")
                     return setError("Please enter proper post title, description and body!");
              setIsLoading(true);
              const data = {
                     postTitle,
                     postData,
                     postShortDescription: postDescription,
                     user: user._id
              }
              createPost(user._id, data, user.token)
              .then(res => {
                     if(!res.err) {
                            setSuccess("Post submitted successfully to admin for review!");
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const handleSaveDraft = (event) => {
              event.preventDefault();
              if(postTitle==="" || postData==="" || postData==="<h3>Post content goes here...</h3>" || postDescription==="")
                     return setError("Please write something before saving!");
              setIsLoading(true);
              const data = {
                     draftTitle: postTitle,
                     draftData: postData,
                     draftShortDescription: postDescription,
                     user: user._id
              }
              createDraft(user._id, data, user.token)
              .then(res => {
                     if(!res.err) {
                            setSuccess("Draft saved successfully!");
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
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
                                                 <button type="button" onClick={handlePublish} data-bs-dismiss="modal" className="btn btn-success rounded-3">Publish</button>
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
                            <ShowError error={error} />
                            <ShowLoading isLoading={isLoading} />
                            <ShowSuccess success={success} />
                            <div className="d-flex justify-content-between">
                                   <button className="btn btn-outline-dark mb-4" onClick={(e) => navigate(`/user/${user._id}/profile`)}><i className="fa-solid fa-arrow-left"></i>  Back</button>
                                   <div>
                                          <button className={`btn btn-outline-purple mb-4 me-4 fw-bold ${success && "disabled"}`} onClick={handleSaveDraft}><i class="fa-solid fa-floppy-disk"></i>   Save as Draft</button>
                                          <button className={`btn btn-outline-success mb-4 fw-bold ${success && "disabled"}`} data-bs-toggle="modal" data-bs-target={`#publishPostPop`}><i class="fa-solid fa-upload"></i>   Publish</button>
                                   </div>
                            </div>
                            <div><input className="form-control form-control-lg mb-4 shadow" value={postTitle} onChange={(e) => {setPostTitle(e.target.value); setError(false)}} type="text" placeholder="Post title..." aria-label="post title"/></div>
                            <div><textarea className="form-control form-control mb-4 shadow" value={postDescription} onChange={(e) => {setPostDescription(e.target.value); setError(false)}} type="text" placeholder="Short description of post..." aria-label="post description" rows={5}/></div>
                            <div><TextEditor postData={postData} setPostData={setPostData} setError={setError} /></div>
                     </div>
                     <Footer/>
              </div>
       );
}

export default CreatePost;