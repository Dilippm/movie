import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/OwnerHeader';
import { GetTheatres, AddTheatre } from '../../api-helpers/api-helpers';
import AddTheatreForm from '../../components/Theatre/AddTheatreForm';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={pageNumber === currentPage ? 'contained' : 'outlined'}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
    </Box>
  );
};

const Theater = () => {
  const navigate = useNavigate();
  const [theatre, setTheatre] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [open, setOpen] = useState(false); 

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetTheatres();
        setTheatre(data);
      } catch (error) {
        tokenExpirationMiddleware(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);
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
  const handleAddTheatre = async (theatreData) => {
    try {
      const response = await AddTheatre(theatreData);
      console.log(response);
      
      setTheatre([...theatre, response]);
      toast.success('Theatre Added Successfully');
      handleClose()
    } catch (error) {
      console.error('Failed to add theatre:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTheatres = theatre
    .filter((theatreItem) =>
      theatreItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(theatre.length / itemsPerPage);

  return (
    <>
      <ToastContainer />
      <Header />

      <Box>
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Theatres</b>
        </Typography>
        <Box marginTop={4} marginLeft={3}>
          <AddTheatreForm onAddTheatre={handleAddTheatre} onClose={handleClose} />
        </Box>
        <Box width={'40%'} margin={'auto'} border={"3px solid white"} >
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
         
          />
        </Box>
        <Box width={'80%'} margin={'auto'}>
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    padding={2}
    marginTop={2}
    marginLeft={5}
    marginBottom={'50px'}
    height={'150px'}
  >
    <Box flex={1}>
      <Typography variant="h4">
        <b>Name</b>
      </Typography>
    </Box>
    <Box flex={1}>
      <Typography variant="h4">
        <b>Seats</b>
      </Typography>
    </Box>
    <Box flex={1.25}>
      <Typography variant="h4">
        <b>Show </b>
      </Typography>
    </Box>
    <Box flex={1}>
      <Typography variant="h4">
        <b>Price</b>
      </Typography>
    </Box>
    <Box flex={1}>
      <Typography variant="h4">
        <b>Movie</b>
      </Typography>
    </Box>
    <Box flex={0.75}>
      <Typography variant="h4">
        <b>Actions</b>
      </Typography>
    </Box>
  </Box>

  {currentTheatres.map((theatreItem, index) => (
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
      <Box flex={1}>
        <Typography variant="h5"paddingLeft={4}>
          <b>{theatreItem.name}</b>
        </Typography>
      </Box>
      <Box flex={1}>
        <Typography variant="h5"paddingLeft={4}>
          <b>{theatreItem.seats}</b>
        </Typography>
      </Box>
      <Box flex={1}>
        {theatreItem.showTimings.map((timing, index) => (
          <Typography key={index} variant="h5">
            <b> {timing.startTime}</b>
          </Typography>
        ))}
      </Box>
      <Box flex={0.9}>
        <Typography variant="h5" paddingLeft={4}>
          <b>{theatreItem.price}</b>
        </Typography>
      </Box>
      <Box flex={1}>
        <Typography variant="h5"paddingLeft={4}>
          <b>{theatreItem.movies}</b>
        </Typography>
      </Box>
      <Box flex={0.75} textAlign="center">
        <Button variant="contained" onClick={() => navigate(`/owner/edit_theatre/${theatreItem._id}`)}>
          Edit
        </Button>
      </Box>
    </Box>
  ))}

  <Box display="flex" justifyContent="center" marginTop={4}>
    <Button
      style={{ marginRight: '5px' }}
      variant="contained"
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      Previous
    </Button>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    <Button
      style={{ marginLeft: '5px' }}
      variant="contained"
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      Next
    </Button>
  </Box>
</Box>

      </Box>
    </>
  );
};

export default Theater;
