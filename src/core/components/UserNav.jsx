import React from 'react';
import { useNavigate } from "react-router";

function UserNav(props) {
       
       const navigate = useNavigate();

       return (<>
                     <ul className="list-group mb-3 shadow">
                            <li className={props.activeTab==="profile" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("profile")}>My profile</li>
                            <li className={props.activeTab==="edit" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("edit")}>Edit profile</li>
                            <li className={props.activeTab==="posts" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("posts")}>My posts</li>
                            <li className={props.activeTab==="drafts" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("drafts")}>My drafts</li>
                     </ul>
                     <ul className="list-group my-3 shadow">
                            <li className="fw-bold text-center btn btn-dark" onClick={() => navigate("/post/new")}><i className="fa-solid fa-plus"></i>   Create new post</li>
                     </ul>
              </>
       );
}

export default UserNav;