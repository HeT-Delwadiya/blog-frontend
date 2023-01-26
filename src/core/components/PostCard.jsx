import React from 'react';
import _ from "lodash";
import { useNavigate } from 'react-router';

function PostCard(props) {

       const navigate = useNavigate();

       return (
              <div>
                     <div className="card m-3 shadow">
                            <div className="card-body">
                                   <h5 className="card-title fw-bold">{props.post.postTitle}</h5>
                                   <p className="card-text fw-bolder" dangerouslySetInnerHTML={{ __html: _.truncate(props.post.postShortDescription, {'length': 300,'separator': ' '}) }}></p>
                                   <button onClick={(e) =>{e.preventDefault(); return navigate(`/post/${props.post._id}`)}} className="btn btn-outline-dark">Read More</button>
                            </div>
                     </div>
              </div>
       );
}

export default PostCard;