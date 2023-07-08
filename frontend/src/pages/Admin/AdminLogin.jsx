import React, { useState } from 'react';
import { Box, Button, FormLabel, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import {useDispatch} from "react-redux"
import {  useNavigate } from "react-router-dom";
import { adminLogin } from '../../api-helpers/api-helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {adminActions } from "../../store"


const AdminLogin = () => {
  const dispatch= useDispatch();

  const navigate = useNavigate()
  const [inputs, setInputs] = useState(
    {  email: '', password: '' }
  );
  //const [isSignup, setSignup] = useState(false);
//   const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const resData = await adminLogin(inputs); 
   
    if (resData) {
      dispatch(adminActions.login())
      localStorage.setItem("adminId",resData.id,resData.token)
      localStorage.setItem("adminname",resData.name)
      localStorage.setItem("adminimage",resData.image)
      // Login success
      toast.success(resData.message);
      navigate('/admin/home');
    } 
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data && err.response.data.error) {
      toast.error(err.response.data.error); 
    } else {
      toast.error('An error occurred. Please try again.'); 
  }
}
  }
  

  return (
 
     <Box sx={{  display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
     }}>
  <Box
    sx={{
      width: 500,
      height: 400,
      backgroundColor: '#eeeeee',
      
    }}
  >
     <Typography variant='h4' textAlign='center' marginTop={3}>
     <b>Admin- LOGIN</b> 
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display='flex'
          justifyContent='center'
          flexDirection='column'
          width={400}
          margin='auto'>
         
          <FormLabel
            sx={{
              mt: 1,
              mb: 1
            }}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin='normal'
            variant='standard'
            type='email'
            name='email' />
          <FormLabel
            sx={{
              mt: 1,
              mb: 1
            }}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant='standard'
            type='password'
            name='password' /> 
          <Button sx={{ mt: 4, borderRadius: 10, bgcolor: '#2b2d42' }} type='submit' fullWidth variant='contained'>
            Login
          </Button>

        
         
        </Box>
      </form>
  </Box>
  <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
</Box>

    
   
  
  )
}

export default AdminLogin
