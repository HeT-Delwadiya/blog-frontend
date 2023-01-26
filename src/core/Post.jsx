/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addComment, getPostById, removeComment } from './helper/userapi';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";
import ShowLoading from "../components/ShowLoading";
import ShowError from "../components/ShowError";

function Post(props) {

       const {postId} = useParams();

       const [post, setPost] = useState({});
       const [isLoading, setIsLoading] = useState(true);
       const [error, setError] = useState(false);
       const [commentInput, setCommentInput] = useState("");
       const [commentId, setCommentId] = useState(false);
       const [authorName, setAuthorName] = useState(false);
       const [visible, setVisible] = useState(false);

       const user = useSelector((state) => state.auth);

       const fetchPost = () => {
              getPostById(postId)
              .then(res => {
                     if(!res.err) {
                            setPost({...res, comments: _.reverse(res.comments)});
                            setAuthorName(res?.user?.name);
                     }
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       useEffect(() => {
              fetchPost();
       }, [postId]);

       const handleChange = (event) => {
              event.preventDefault();
              setCommentInput(event.target.value);
              setError(false);
       }

       const handlePostComment = (event) => {
              event.preventDefault();
              if(commentInput==="") {
                     window.scrollTo({
                            top: 0, 
                            behavior: 'smooth'
                     });
                     return setError("Please write something in comment box before posting!")
              }
              setIsLoading(true);
              const data = {
                     commentId: uuidv4(),
                     commentUser: user._id,
                     commentText: commentInput,
                     commentUserName: user.name
              }
              addComment(user._id, postId, data, user.token)
              .then(res => {
                     if(!res.err)
                            setPost({...res, comments: _.reverse(res.comments)});
                     setIsLoading(false);
                     setCommentInput("");
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const handleDeleteComment = (event) => {
              event.preventDefault();
              setIsLoading(true);
              removeComment(user._id, postId, {commentId:commentId}, user.token)
              .then(res => {
                     if(!res.err)
                            setPost({...res, comments: _.reverse(res.comments)});
                     setIsLoading(false);
              })
              .catch(err => console.log(err) && setError("Something went wrong!") && setIsLoading(false))
       }

       const deleteComPopup = () => {
              return (<div>
                     <div className="modal fade" id={`deleteComPop${post._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                   <div className="modal-content">
                                          <div className="modal-header">
                                                 <h5 className="modal-title" id="exampleModalLabel">Alert!</h5>
                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body fw-bolder">
                                                 Are you sure, you want to delete this comment?
                                          </div>
                                          <div className="modal-footer">
                                                 <button type="button" className="btn btn-success rounded-3" data-bs-dismiss="modal">No</button>
                                                 <button type="button" onClick={handleDeleteComment} data-bs-dismiss="modal" className="btn btn-danger rounded-3">Delete</button>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </div>);
       }

       const toggleVisible = () => {
              const scrolled = document.documentElement.scrollTop;
              if (scrolled > 300){
                     setVisible(true)
              } 
              else if (scrolled <= 300){
                     setVisible(false)
              }
       }

       const scrollToTop = () =>{
              window.scrollTo({
                     top: 0, 
                     behavior: 'smooth'
              });
       }
            
       window.addEventListener('scroll', toggleVisible);

       return (
              <div>
                     <Header />
                            {post?._id && (<>
                                   <div className="container">
                                          {deleteComPopup()}
                                          <ShowError error={error} />
                                          <ShowLoading isLoading={isLoading} />
                                          <div aria-label="breadcrumb text-black">
                                                 <ol className="breadcrumb">
                                                        <li className="breadcrumb-item" aria-current="page"><p className="none-a theme-text fw-bold">{authorName?.toUpperCase()}</p></li>
                                                        <li className="breadcrumb-item fw-bolder" aria-current="page">{moment(post?.createdAt).format('MMMM Do YYYY')}</li>
                                                        <li className="breadcrumb-item fw-bolder" aria-current="page">{post?.comments.length}  comments</li>
                                                 </ol>
                                          </div>
                                          <h1>{post?.postTitle}</h1>
                                          <div className="card shadow mt-5 mb-5 p-5 fs-3 fw-bolder">
                                                 <div dangerouslySetInnerHTML={{ __html: post?.postData }}></div>
                                          </div>

                                          {!user?._id && (<div class="alert alert-warning text-center fw-bold" role="alert">Please <Link to={"/login"} className="fw-bold">login</Link> or <Link to={"/register"} className="fw-bold">register</Link> to post comments.</div>)}

                                          {(user?._id || post.comments.length>0) && (<h2 className="ms-2 mb-5">Comments: </h2>)}
                                          {user?._id && <div className="my-3">
                                                 <form className="d-flex align-items-end mb-5" role="search">
                                                        <textarea className="form-control" value={commentInput} onChange={handleChange} id="floatingInput" placeholder="write comment here..." rows="5" ></textarea>
                                                        <button onClick={handlePostComment} className="btn btn-dark shadow m-3 fw-bold" style={{maxHeight: "50px"}}>Comment</button>
                                                 </form>
                                          </div>}

                                          <div className="mb-5">
                                                 {post?.comments.map((comment) => <div key={comment.commentId} className="card mt-3 shadow">
                                                        <div className="card-header fw-bold">
                                                               <Link className="none-a theme-text" to={`/user/${comment.commentUser}/profile`}>{comment.commentUserName}</Link>
                                                        </div>
                                                        <div className="card-body">
                                                               <div className="d-flex justify-content-between">
                                                                      <blockquote className="blockquote mb-0 fw-bolder">
                                                                             <p className="text-wrap">{comment.commentText}</p>
                                                                      </blockquote>
                                                                      {comment.commentUser === user._id && (<button onClick={() => setCommentId(comment.commentId)} className="btn btn-dark rounded-3" data-bs-toggle="modal" data-bs-target={`#deleteComPop${post._id}`}><i className="fa-solid fa-trash-can"></i></button>)}
                                                               </div>
                                                        </div>
                                                 </div>)}
                                          </div>
                                   </div>
                            </>)}
                            <div className="text-end">
                                   <button onClick={scrollToTop} className="btn theme-bg text-dark rounded-3 text-center position-fixed bottom-0 end-0 mb-5 me-5 shadow-lg border border-dark" style={{fontWeight:"600", display: visible? "":"none"}}><i class="fa-solid fa-angle-up" style={{color: "#fff"}}></i></button>
                            </div>
                     <Footer />
              </div>
       );
}

export default Post;