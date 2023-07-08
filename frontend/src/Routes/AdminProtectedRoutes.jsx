import React from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';


function AdminProtectedRoutes(props) {
  <ToastContainer />
  if (localStorage.getItem('admintoken')) {
      return props.children;
    }
    toast.error('You have no account, Please Login');
    return <Navigate to="/admin/admin" />;
}

export default AdminProtectedRoutes
