import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
function ProtectedUser() {
  const hasToken = JSON.parse(localStorage.getItem('token'))
  // console.log("tokenp",hasToken);
  if (!hasToken) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
}

export default ProtectedUser;