import React from "react";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute({ user = null, redirectPath = '/' }) {
    return !user ? <Navigate to={redirectPath} replace /> : <Outlet />;
}


export default ProtectedRoute;
