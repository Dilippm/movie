import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import BaseURL from '../../config';
import Header from '../../components/AdminHeader';
import { getOwnerDetail } from '../../api-helpers/api-helpers';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const OwnerDetails = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const tokenExpirationMiddleware = (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admintoken");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminimage");
      localStorage.removeItem("adminname");
      toast.error("Token expired. Redirecting to login page...");
      navigate("/admin/admin");
    } else {
      throw error;
    }
  };
  const fetchData = async () => {
    try {
      const data = await getOwnerDetail();
      setUsers(data.owners);
      setFilteredUsers(data.owners);
    } catch (error) {
      console.log(error);
      tokenExpirationMiddleware(error);
    }
  };

  const changeOwnerStatus = async (index) => {
    try {
      const ownerId = users[index]._id;
      const token = localStorage.getItem('admintoken');

      const response = await axios.post(
        `${BaseURL}admin/owners/${ownerId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedStatus = response.data.owner.status;

        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers];
          updatedUsers[index].status = updatedStatus;
          return updatedUsers;
        });

        fetchData(); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const filtered = users && users.filter((user) => {
      const nameMatch = user.name && user.name.toLowerCase().includes(searchValue.toLowerCase());
      return nameMatch;
    });
    setFilteredUsers(filtered);
  }, [searchValue, users]);


  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <Box width="100%" height="100%" margin="auto"></Box>
      <Box margin="auto" marginTop={1}>
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Owners</b>
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
              <b>Actions</b>
            </Typography>
          </Box>
          {filteredUsers &&
            filteredUsers.map((users, index) => (
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
                <Typography variant="h5">{users.name}</Typography>
                <Typography variant="h5">{users.phone}</Typography>
                <Typography variant="h5">{users.email}</Typography>

                <Button
                  variant="outlined"
                  onClick={() => changeOwnerStatus(index)}
                  style={{
                    backgroundColor: users.Isapproved ? 'green' : 'red',
                    color: 'white',
                  }}
                >
                  {users.Isapproved ? 'Active' : 'Inactive'}
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default OwnerDetails;
