import React from 'react'
import { Navigate } from 'react-router-dom';


function OwnerPublicRoutes(props) {
    if (localStorage.getItem('ownertoken')) {
      console.log("the public route console");
        return <Navigate to="/owner/home" />;
      }
      console.log("return case ");
      return props.children;
}

export default OwnerPublicRoutes