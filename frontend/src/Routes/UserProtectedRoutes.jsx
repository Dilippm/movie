import React from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';



function UserProtectedRoutes(props) {
    <ToastContainer />
    if (localStorage.getItem('token')) {
        return props.children;
      }
      toast.error('You have no account, Please Login');
      return <Navigate to="/" />;
}

export default UserProtectedRoutes