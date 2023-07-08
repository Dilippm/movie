import React, {useState} from 'react';
import {Box, Button, FormLabel, Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";

import {OwnerSignup} from '../../api-helpers/api-helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const OwnerRegister = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState(
        {name: '', email: '', password: '', phone: ''}
    );
    // const [isSignup, setSignup] = useState(false);   const [open, setOpen] =
    // useState(true);
    const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const resData = await OwnerSignup(inputs); 
     
          if (resData) {
            // Login success
            toast.success(resData.message);
            navigate('/owner/login');
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
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
            <Box
                sx={{
                    width: 500,
                    height: 600,
                    backgroundColor: '#eeeeee'
                }}>
                <Typography variant='h4' textAlign='center' marginTop={3}>
                   <b>THEATER - REGISTER</b> 
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
                            }}>Name</FormLabel>
                        <TextField
                            value={inputs.name}
                            onChange={handleChange}
                            margin='normal'
                            variant='standard'
                            type='text'
                            name='name'/>

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
                            name='email'/>
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
                            name='password'/>
                        <FormLabel
                            sx={{
                                mt: 1,
                                mb: 1
                            }}>Phone No.</FormLabel>
                        <TextField
                            value={inputs.phone}
                            onChange={handleChange}
                            variant='standard'
                            type='number'
                            name='phone'/>
                        <Button
                            sx={{
                                mt: 4,
                                borderRadius: 10,
                                bgcolor: '#2b2d42'
                            }}
                            type='submit'
                            fullWidth="fullWidth"
                            variant='contained'>
                            Register
                        </Button>
                        <Link
  sx={{
    mt: 3,
    fontSize: 20,
    textDecoration: 'none',
    '&:hover': {
      color: 'red', 
      cursor: 'pointer', },
      textAlign:'center'
  }}
  onClick={() => {
    navigate('/owner')
   }}
>
  <b> Login</b>
 
</Link>

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

export default OwnerRegister
