import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ user, children }) {
       return user && user._id ? children : <Navigate to="/login" />;
}

export default PrivateRoute;