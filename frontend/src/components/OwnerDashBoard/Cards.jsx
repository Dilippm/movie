import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ownerFetchData } from "../../api-helpers/api-helpers"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Cards = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchDataFromBackend();
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
  const fetchDataFromBackend = async () => {
    try {
      const data = await ownerFetchData();
      console.log(data);
      setCardData(data);
     
    } catch (error) {
      tokenExpirationMiddleware(error);
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
       <ToastContainer />
      <Grid item xs={12} sm={4}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              width: '400px',
              height: '200px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              border: '3px solid #ccc',
              textAlign: 'center',
              background: 'linear-gradient(45deg, black, red)',
              color: "white",
           
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" mt={8}>
                <b>Total Revenue: ₹{cardData.total}/-</b>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              width: '400px',
              height: '200px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              border: '3px solid #ccc',
              textAlign: 'center',
              background: 'linear-gradient(45deg, black, red)',
              color: "white"
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" mt={8}>
                <b>No. of Theaters: {cardData.totalTheaters}</b>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              width: '400px',
              height: '200px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              border: '3px solid #ccc',
              textAlign: 'center',
              background: 'linear-gradient(45deg, black, red)',
              color: "white"
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" mt={8}>
                <b>Total Bookings: {cardData.totalBookings}</b>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Cards;
