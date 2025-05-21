import React from "react";
import { Navigate } from "react-router-dom";
import token from "../config/token";

const RoleBaseRoutes = ({ children, allowedRoles }) => {
  const role = sessionStorage.getItem("role");

  if (!token.BE_TOKEN) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RoleBaseRoutes;
