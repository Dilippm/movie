import React from 'react'
import { Navigate } from 'react-router-dom';


function AdminPublicRoutes(props) {
    if (localStorage.getItem('admintoken')) {
      console.log("the public route console");
        return <Navigate to="/admin/home" />;
      }
      console.log("return case ");
      return props.children;
}

export default AdminPublicRoutes