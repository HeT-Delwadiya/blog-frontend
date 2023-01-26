import React from 'react';

function AdminNav(props) {
       return (<>
              <ul className="list-group mb-3 shadow">
                     <li className={props.activeTab==="profile" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("profile")}>My profile</li>
                     <li className={props.activeTab==="edit" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("edit")}>Edit profile</li>
                     <li className={props.activeTab==="users" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("users")}>All Users</li>
                     <li className={props.activeTab==="published_posts" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("published_posts")}>Published Posts</li>
                     <li className={props.activeTab==="pending_posts" ? "list-group-item fw-bold text-center active-tab" : "list-group-item fw-bolder text-center" } onClick={() => props.setActiveTab("pending_posts")}>Pending Posts</li>
              </ul>
       </>);
}

export default AdminNav;