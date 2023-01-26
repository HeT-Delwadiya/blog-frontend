import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from "./core/Home";
import Login from "./core/Login";
import Register from "./core/Register";
import PrivateRoute from "./auth/PrivateRoute";
import Post from "./core/Post";
import UserDashboard from "./core/UserDashboard";
import CreatePost from "./core/CreatePost";
import EditUserPost from "./core/EditUserPost";
import EditUserDraft from "./core/EditUserDraft";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import ViewPost from "./admin/components/ViewPost";

function RoutesManager(props) {

       const user = useSelector((state) => state.auth);

       return (
              <BrowserRouter>
                     <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/post/:postId" element={<Post />} />
                            <Route path="/user/:userId/profile" element={<PrivateRoute user={user} ><UserDashboard /></PrivateRoute>} />
                            <Route path="/post/new" element={<PrivateRoute user={user} ><CreatePost /></PrivateRoute>} />
                            <Route path="/user/:userId/post/:postId/edit" element={<PrivateRoute user={user} ><EditUserPost /></PrivateRoute>} />
                            <Route path="/user/:userId/draft/:draftId/edit" element={<PrivateRoute user={user} ><EditUserDraft /></PrivateRoute>} />
                            <Route path="/admin/:userId/profile" element={<AdminRoute user={user} ><AdminDashboard /></AdminRoute>} />
                            <Route path="/admin/:userId/post/:postId/view" element={<AdminRoute user={user} ><ViewPost /></AdminRoute>} />
                     </Routes>
              </BrowserRouter>
       );
}

export default RoutesManager;
