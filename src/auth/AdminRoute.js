import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ user, children }) {
       return user && user.role===33 ? children : <Navigate to="/login" />;
}

export default AdminRoute;