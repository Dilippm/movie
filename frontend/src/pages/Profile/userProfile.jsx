import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {Box, Button, FormLabel, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import {ToastContainer, toast} from 'react-toastify';
import {UserProfiles, updateUserProfile} from "../../api-helpers/api-helpers";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {
    const [state, setState] = useState({user: {}});
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();
    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
      };
      const validateEmail = (email) => {
      
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
       
        return emailPattern.test(email);
      };
      
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await UserProfiles();

                setState(res);
                setImageUrl(res.user.image);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValidPhone = validatePhone(state.user.phone);
        const isValidEmail = validateEmail(state.user.email);

        if (!isValidPhone) {
            toast.error("Phone number must have 10 digits");
            return;
        }
    
        if (!isValidEmail) {
            toast.error("Please enter a valid email address");
            return;
        }
        try {
            const resData = await updateUserProfile(state.user, imageFile);
            if (resData) {
                toast.success("Profile updated successfully");
               

                navigate('/profile');
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
            navigate('/profile');
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    };

    const handleImageChange = (event) => {
        const file = event
            .target
            .files[0];

        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setImageUrl(null);
        }
    };

    return (
        <> < Header /> 
        <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={3}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90vh'
                }}>
                <Box
                    sx={{
                        width: 500,
                        height: 750,
                        backgroundColor: '#eeeeee',
                        border: "5px solid white",
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                    }}>
                    <Typography variant='h4' textAlign='center' marginTop={3}>
                        <b>PROFILE</b>
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box
                            padding={6}
                            display='flex'
                            justifyContent='center'
                            flexDirection='column'
                            width={400}
                            margin='auto'>
                            {
                                imageUrl
                                    ? (
                                        <label htmlFor="imageInput">
                                            <img
                                                src={imageUrl}
                                                alt="Profile"
                                                style={{
                                                    width: '50%',
                                                    height: '50%',
                                                    marginTop: '10px',
                                                    margin: 'auto',
                                                    cursor: 'pointer',
                                                    marginLeft: '90px'
                                                }}/>
                                            <input
                                                id="imageInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                style={{
                                                    display: 'none'
                                                }}/>
                                        </label>
                                    )
                                    : (
                                        <label htmlFor="imageInput">
                                            <div
                                                style={{
                                                    width: '50%',
                                                    height: '50%',
                                                    margin: 'auto',
                                                    cursor: 'pointer'
                                                }}>
                                                <AccountCircleIcon
                                                    style={{
                                                        fontSize: '200px'
                                                    }}/>
                                            </div>
                                            <input
                                                id="imageInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                style={{
                                                    display: 'none'
                                                }}/>
                                        </label>
                                    )
                            }

                            <FormLabel
                                sx={{
                                    mt: 1,
                                    mb: 1
                                }}>Username</FormLabel>
                            <TextField
                                value={state.user.name}
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
                                value={state.user.email}
                                onChange={handleChange}
                                margin='normal'
                                variant='standard'
                                type='email'
                                name='email'/>

                            <FormLabel
                                sx={{
                                    mt: 1,
                                    mb: 1
                                }}>Phone</FormLabel>
                            <TextField
                                value={state.user.phone}
                                onChange={handleChange}
                                margin='normal'
                                variant='standard'
                                type='number'
                                name='phone'/>
                            <TextField
                                value={`Wallet: ₹${state.user.wallet}/-`}
                                margin="normal"
                                variant="standard"
                                type="text"
                                name="Wallet"
                                InputProps={{
                                    readOnly: true
                                }}/>

                            <Button
                                sx={{
                                    mt: 4,
                                    borderRadius: 10,
                                    bgcolor: '#2b2d42'
                                }}
                                type='submit'
                                fullWidth="fullWidth"
                                variant='contained'>
                                <b>Update</b>
                            </Button>
                        </Box>
                    </form>
                </Box>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick="closeOnClick"
                    rtl={false}
                    pauseOnFocusLoss="pauseOnFocusLoss"
                    draggable="draggable"
                    pauseOnHover="pauseOnHover"/>
            </Box>
        </Box>
    </>
    );
}

export default UserProfile;
