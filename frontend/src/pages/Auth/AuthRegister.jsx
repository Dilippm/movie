import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { Box, Button, FormLabel, IconButton, Typography } from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const AuthRegister = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name:'',

    email: '',
    password: '',
    phone:''
  });
  const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data inputs",inputs);
    onSubmit(inputs); 
    navigate('/login');// Pass the inputs object to the onSubmit function
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={open} onClose={handleClose}>
      <Box sx={{ ml: 'auto', padding: 1 }}>
        <IconButton onClick={handleClose}>
          <CloseSharpIcon />
        </IconButton>
      </Box>
      <Typography variant='h4' textAlign='center' marginTop={3}>
       <b>REGISTER</b> 
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box padding={6} display='flex' justifyContent='center' flexDirection='column' width={400} margin='auto'>
        <FormLabel sx={{ mt: 1, mb: 1 }}>Username</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            margin='normal'
            variant='standard'
            type='text'
            name='name'
          />
          <FormLabel sx={{ mt: 1, mb: 1 }}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin='normal'
            variant='standard'
            type='email'
            name='email'
          />
          <FormLabel sx={{ mt: 1, mb: 1 }}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant='standard'
            type='password'
            name='password'
          />
          <FormLabel sx={{ mt: 1, mb: 1 }}>Phone</FormLabel>
          <TextField
            value={inputs.phone}
            onChange={handleChange}
            margin='normal'
            variant='standard'
            type='number'
            name='phone'
          />
          <Button  sx={{ mt: 2, borderRadius: 10, bgcolor: '#2b2d42' }} type='submit' fullWidth variant='contained'>
            Register
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
    navigate('/login')
   }}
>
  <b> Login</b>
 
</Link>
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthRegister;
