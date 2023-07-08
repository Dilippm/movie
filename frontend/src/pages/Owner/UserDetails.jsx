import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/AdminHeader';
import { getusersOwner } from '../../api-helpers/api-helpers';
import TextField from '@mui/material/TextField';

const UserDetails = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 2; 

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = (page) => {
    getusersOwner(page, limit)
      .then((data) => {
        setUsers(data.users);
        setFilteredUsers(data.users);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        tokenExpirationMiddleware(err);
        console.log(err)
      });
  };

  const tokenExpirationMiddleware = (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("ownertoken");
      localStorage.removeItem("ownerId");
      localStorage.removeItem("ownerimage");
      localStorage.removeItem("ownername");
      toast.error("Token expired. Redirecting to login page...");
      navigate("/owner/login");
    } else {
      throw error;
    }
  };

  useEffect(() => {
    const filtered = users.filter((user) => {
      const nameMatch =
        user.name &&
        user.name.toLowerCase().includes(searchValue.toLowerCase());

      return nameMatch;
    });
    setFilteredUsers(filtered);
  }, [searchValue, users]);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
    <ToastContainer />
 
      <Header />
      <Box width="100%" height="100%" margin="auto"></Box>
      <Box margin="auto" marginTop={1}>
        <Typography
          variant="h3"
          padding={2}
          textAlign="center"
          bgcolor="#900C3F"
          color="white"
        >
          <b>All Users</b>
        </Typography>
        <Box width={'30%'} height={'80%'} margin="auto" marginTop={4}>
          <TextField
            sx={{
              input: {
                color: 'white',
                border: '3px solid black',
                borderRadius: 30,
                backgroundColor: 'black',
                width: '500px',
                height: '40px',
              },
            }}
            variant="standard"
            placeholder="Search By Name "
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </Box>

        <Box width={'80%'} margin={'auto'} marginTop={'80px'}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            marginTop={2}
            marginBottom={'50px'}
            height={'150px'}
            backgroundColor={'rgba(211, 211, 211, 0.3)'} 
          >
            <Typography variant="h4">
              <b>Name</b>
            </Typography>
            <Typography variant="h4">
              <b>Phone</b>
            </Typography>
            <Typography variant="h4">
              <b>Email</b>
            </Typography>

            <Typography variant="h4">
              <b>Status</b>
            </Typography>
          </Box>
          {filteredUsers &&
            filteredUsers.map((user, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={2}
                marginTop={2}
                marginBottom={'80px'}
                bgcolor="#f5f5f5"
                height={'150px'}
              >
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="h5">{user.phone}</Typography>
                <Typography variant="h5">{user.email}</Typography>

                <Button
                  variant="outlined"
                
                  style={{
                    backgroundColor: user.status ? 'green' : 'red',
                    color: 'white',
                  }}
                >
                  {user.status ? 'Active' : 'Inactive'}
                </Button>
              </Box>
            ))}
        </Box>
        <Box display="flex" justifyContent="center" marginTop={4} marginBottom={3} >
          {currentPage > 1 && (
            <Button sx={{margin:"10px", width:"100px",height:"40px" }}
              variant="contained"
              color="primary"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
          )}
          {currentPage < totalPages && (
            <Button sx={{margin:"10px", width:"100px" }}
              variant="contained"
              color="primary"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UserDetails;
