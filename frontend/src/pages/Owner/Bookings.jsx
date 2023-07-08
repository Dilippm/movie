import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
} from '@mui/material';
import { getBookingsForOwner } from '../../api-helpers/api-helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(3);

  useEffect(() => {
    fetchBookings();
  }, [selectedTheater]);

  const tokenExpirationMiddleware = (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('ownertoken');
      localStorage.removeItem('ownerId');
      localStorage.removeItem('ownerimage');
      localStorage.removeItem('ownername');
      toast.error('Token expired. Redirecting to login page...');
      navigate('/owner/login');
    } else {
      throw error;
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await getBookingsForOwner();

      const sortedBookings = response.bookings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sortedBookings);

      // Extract unique theaters from bookings
      const uniqueTheaters = [...new Set(sortedBookings.map((booking) => booking.theater))];
      setTheaters(uniqueTheaters);
    } catch (error) {
      tokenExpirationMiddleware(error);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSelectedTheater(event.target.value);
  };

  // Apply theater filter
  const filteredBookings = selectedTheater
    ? bookings.filter((booking) => booking.theater === selectedTheater)
    : bookings;

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <ToastContainer />

      <Container maxWidth="80%">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ margin: '30px', marginTop: '50px', marginLeft: '850px' }}
        >
          <b>Bookings</b>
        </Typography>

        {/* Filter by Theater */}
        <Grid container justifyContent="center" margin={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="theater-filter-label">Filter by Theater</InputLabel>
              <Select
                sx={{ width: '30%' }}
                labelId="theater-filter-label"
                id="theater-filter"
                value={selectedTheater}
                onChange={handleChange}
              >
                <MenuItem value="">All Theaters</MenuItem>
                {theaters.map((theater) => (
                  <MenuItem key={theater} value={theater}>
                    {theater}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Bookings */}
        {currentBookings.map((booking) => (
          <Card
            key={booking.id}
            sx={{
              margin: 'auto',
              background: 'linear-gradient(45deg, black, red)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .9)',
              color: 'white',
              marginBottom: '20px',
              width: '80vw',
              height: '200px',
            }}
          >
            <CardContent>
              <Grid container spacing={4} direction="row">
                <Grid item xs={3}>
                  <Typography variant="h6" component="h2" sx={{ fontSize: '30px' }}>
                    <b>Booking ID:</b> {booking._id}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '30px' }} mt={2}>
                    <b>Date:</b> {booking.date}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" sx={{ fontSize: '30px', marginLeft: '60px' }}>
                    <b>Theater:</b> {booking.theater}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '30px', marginLeft: '60px' }} mt={2}>
                    <b>Movie:</b> {booking.movie}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" sx={{ fontSize: '28px', marginLeft: '60px' }}>
                    <b>ShowTime:</b> {booking.time}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '30px', marginLeft: '60px' }} mt={2}>
                    <b>Seats:</b> {booking.seatNumber}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" sx={{ fontSize: '28px', marginLeft: '60px' }}>
                    <b>Amount:</b> ₹{booking.amount}/-
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '30px', marginLeft: '60px' }} mt={2}>
                    <b>User:</b> {booking.user.name}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}

        
<Grid container justifyContent="center" margin={2} marginLeft={"200px"}>
          <Grid item xs={6}>
            <Box marginLeft={"150px"}>
            <Button
             variant='outlined'
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              sx={{color:"black", border:"3px solid black" ,marginRight:"10px"}}
            >
              Previous
            </Button>
          
  {Array.from({ length: Math.ceil(filteredBookings.length / bookingsPerPage) }, (_, index) => (
    <Button
      key={index + 1}
      variant="outlined"
      onClick={() => paginate(index + 1)}
      sx={{
       
        color: currentPage === index + 1 ? "white" : "black",
        border: currentPage === index + 1 ? "3px solid blue" : "3px solid black",
        backgroundColor: currentPage === index + 1 ? "blue":" ",
        margin: "2px",
      }}
    >
      {index + 1}
    </Button>
  ))}


            <Button
            variant='outlined'
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastBooking >= filteredBookings.length}
              sx={{color:"black", border:"3px solid black",marginLeft:"10px"}}
            >
              Next
            </Button>

            </Box>
           
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Bookings;
