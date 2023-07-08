import React from 'react'
import { Navigate } from 'react-router-dom';


function UserPublicRoutes(props) {
    if (localStorage.getItem('token')) {
      console.log("the public route console");
        return <Navigate to="/" />;
      }
      console.log("return case ");
      return props.children;
}

export default UserPublicRoutes