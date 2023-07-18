import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { getBookingsForAdmin } from '../../api-helpers/api-helpers';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      localStorage.removeItem('admintoken');
      localStorage.removeItem('adminId');
      localStorage.removeItem('adminimage');
      localStorage.removeItem('adminname');
      toast.error('Token expired. Redirecting to login page...');
      navigate('/admin/admin');
    } else {
      throw error;
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await getBookingsForAdmin();
      const sortedBookings = response.bookings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBookings(sortedBookings);

      // Extract unique theaters from bookings
      const uniqueTheaters = [...new Set(sortedBookings.map((booking) => booking.theater))];
      setTheaters(uniqueTheaters);
    } catch (error) {
      console.log(error);
      tokenExpirationMiddleware(error);
    }
  };

  const handleChange = (event) => {
    setSelectedTheater(event.target.value);
    setCurrentPage(1); // Reset current page when the theater filter is changed
  };

  // Filter bookings based on selected theater
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
      <Container maxWidth="lg">
        <ToastContainer />
        <Typography
          variant="h3"
          padding={2}
          textAlign="center"
          bgcolor="#900C3F"
          color="white"
          margin="40px"
        >
          <b>All Bookings</b>
        </Typography>

        {/* Filter by Theater */}
        <Grid container justifyContent="center" margin={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="theater-filter-label">Filter by Theater</InputLabel>
              <Select
                sx={{ width: '100%' }}
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
              width: '100%',
              height: 'auto',
              minHeight: '150px',
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Grid container spacing={4} direction="row">
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontSize: { xs: '16px', sm: '20px' } }}
                  >
                    <b>Booking ID:</b> {booking.bookingId ? booking.bookingId : booking._id}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontSize: { xs: '16px', sm: '20px' } }}
                    mt={2}
                  >
                    <b>Date:</b> {booking.date}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontSize: { xs: '16px', sm: '20px' },
                      marginLeft: { sm: '60px' },
                    }}
                    mt={2}
                  >
                    <b>Theater:</b> {booking.theater}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontSize: { xs: '16px', sm: '20px' },
                      marginLeft: { sm: '60px' },
                    }}
                    mt={2}
                  >
                    <b>Movie:</b> {booking.movie}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontSize: { xs: '16px', sm: '20px' },
                      marginLeft: { sm: '60px' },
                    }}
                  >
                    <b>ShowTime:</b> {booking.time}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontSize: { xs: '16px', sm: '20px' },
                      marginLeft: { sm: '60px' },
                    }}
                  >
                    <b>Seats:</b> {booking.seatNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontSize: { xs: '16px', sm: '20px' },
                      marginLeft: { sm: '60px' },
                    }}
                  >
                    <b>Amount:</b> ₹{booking.amount}/-
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontSize: { xs: '16px', sm: '20px' },
                      marginLeft: { sm: '60px' },
                    }}
                  >
                    <b>User:</b> {booking.user.name}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}

        <Grid container justifyContent="center" margin={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                variant="outlined"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                sx={{ color: 'black', border: '3px solid black', marginRight: '10px' }}
              >
                Previous
              </Button>

              {Array.from({ length: Math.ceil(filteredBookings.length / bookingsPerPage) }, (_, index) => (
                <Button
                  key={index + 1}
                  variant="outlined"
                  onClick={() => paginate(index + 1)}
                  sx={{
                    color: currentPage === index + 1 ? 'white' : 'black',
                    border: currentPage === index + 1 ? '3px solid blue' : '3px solid black',
                    backgroundColor: currentPage === index + 1 ? 'blue' : '',
                    margin: '2px',
                  }}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outlined"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastBooking >= filteredBookings.length}
                sx={{ color: 'black', border: '3px solid black', marginLeft: '10px' }}
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
