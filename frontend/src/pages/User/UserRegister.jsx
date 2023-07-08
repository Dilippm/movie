import React, {useState} from 'react';
import axios from 'axios';
import BaseURL from '../../config'
import {Box, Button, FormLabel, Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";
import Header from '../../components/Header'
import {sendUserRegister} from '../../api-helpers/api-helpers';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import {useDispatch} from "react-redux"
import {userActions} from "../../store"
import 'react-toastify/dist/ReactToastify.css';
import styles from "./styles.module.css";

const UserRegister = () => {
    const dispatch= useDispatch();
    const navigate = useNavigate()
    const [inputs, setInputs] = useState(
        {name: '', email: '', password: '', phone: ''}
    );
    const [msg, setMsg] = useState("");
   
    const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const resData = await sendUserRegister(inputs); 
          if (resData) {
            // Login success
            setMsg(resData.message);
            toast.success(resData.message);
            //navigate('/login');
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
        /**Google signup */
        async function googleSuccess(response) {
            const decoded = jwt_decode(response.credential);
         
          
            const user = {
              name: decoded.name,
              email: decoded.email,
              password: decoded.sub,
              image: decoded.picture
            };
       
            try {
              const respo = await axios.post(`${BaseURL}user/google_login`, { user });
          
           
        
              
            if(respo){
              
              dispatch(userActions.login());
                // localStorage.setItem("user".respo.data.id);
                 localStorage.setItem("token", respo.data.token);
                 localStorage.setItem('userId', respo.data.existingUser._id);
                 localStorage.setItem('name', respo.data.existingUser.name);
                
                toast.success(respo.data.message);
                navigate("/"); 
            }
                // Redirect to the login page
             
            } catch (error) {
                toast.error(error.response.data.message)
            }
          }
          
        function googleError(response) {
            console.log('error', response);
        }

    return (
        <> < Header /> <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}> 
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>
        <Box
            sx={{
                width: 500,
                height: 650,
                backgroundColor: '#eeeeee'
            }}>
            <Typography variant='h4' textAlign='center' marginTop={3}>
               <b>REGISTER</b> 
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
                       
						{msg && <div className={styles.success_msg}>{msg}</div>}
                    <Button
                        sx={{
                            mt: 4,
                            borderRadius: 10,
                            bgcolor: '#2b2d42'
                        }}
                        type='submit'
                        fullWidth="fullWidth"
                        variant='contained'>
                      <b>Register</b>  
                    </Button>
                    <Box sx={{ fontSize: '24px', marginLeft:'70px',marginTop:"24px"  }}>
  <GoogleLogin
    className="my-button"
    onSuccess={googleSuccess}
    onError={googleError}
    shape="pill"
    size="large"
  />
</Box>
                    
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
navigate('/login')
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
    </Box> </>
        
    )
}

export default UserRegister
