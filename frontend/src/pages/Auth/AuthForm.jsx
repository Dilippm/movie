import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { Box, Button, FormLabel, IconButton, Typography } from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {  useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthForm = ({ onSubmit }) => {
 
  const navigate = useNavigate()
  const [inputs, setInputs] = useState(
    { name: '', email: '', password: '', mobile: '' }
  );
  //const [isSignup, setSignup] = useState(false);
  const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(inputs);
      // Login success
      toast.success('Login successful');
      navigate('/');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        // Display the error message from the backend
        toast.error(err.response.data.error);
      } else {
        // Display a generic error message
        toast.error('An error occurred. Please try again.');
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
    navigate('/')

  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: 20
        }
      }}
      open={open}
      onClose={handleClose}>
      <Box
        sx={{
          ml: 'auto',
          padding: 1
        }}>
        <IconButton onClick={handleClose}>
          <CloseSharpIcon />
        </IconButton>
      </Box>
      <Typography variant='h4' textAlign='center' marginTop={3}>
      LOGIN
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
          <Button sx={{ mt: 2, borderRadius: 10, bgcolor: '#2b2d42' }} type='submit' fullWidth variant='contained'>
           <b>Login</b> 
          </Button>

          <Link
  sx={{
    mt: 2,
    fontSize: 20,
    textDecoration: 'none',
    '&:hover': {
      color: 'red', 
      cursor: 'pointer', },
      textAlign:'center'
  }}
  onClick={() => {
    navigate('/register')
   }}
>
  <b> Register</b>
 
</Link>
         
        </Box>
      </form>
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
    </Dialog>
  );
}

export default AuthForm
