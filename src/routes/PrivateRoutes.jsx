import React from "react";
import { Navigate } from "react-router-dom";
import token from "../config/token";

const PrivateRoutes = ({ children }) => {

  if (!token.BE_TOKEN) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoutes;
