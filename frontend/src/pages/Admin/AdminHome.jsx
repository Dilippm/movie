import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../../components/AdminHeader';
import { adminFetchData, adminChartFetch } from "../../api-helpers/api-helpers"
import Linechart from '../../components/AdminDashBoard/charts/Linechart';
import BarChart from '../../components/AdminDashBoard/charts/BarChart';
import MovieCards from '../../components/AdminDashBoard/cards/MovieCards';
import TheaterCards from '../../components/AdminDashBoard/cards/TheaterCards';

const AdminHome = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDataFromBackend();
    fetchChartDataFromBackend();
  });

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

  const fetchDataFromBackend = async () => {
    try {
      const data = await adminFetchData();
      setCardData(data);
    } catch (error) {
      console.log(error);
      tokenExpirationMiddleware(error);
    }
  };

  const fetchChartDataFromBackend = async () => {
    try {
      const chart = await adminChartFetch();
      setChartData(chart.dailyRevenueArray);
    } catch (error) {
      console.log(error);
      // tokenExpirationMiddleware(error);
    }
  };

  const transformedChartData = [
    {
      id: 'Revenue',
      data: chartData.map((item, index) => ({ x: item.date, y: item.revenue })),
    },
  ];

  return (
    <>
      <AdminHeader />
      <ToastContainer />
      <Grid container spacing={2}>
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
                color:"white"
                
                
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
                color:"white"
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" mt={8}>
                  <b>Total Bookings: {cardData.totalUsers}</b>
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
                color:"white"
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" mt={8}>
                  <b>Total Owners: {cardData.totalOwners}</b>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={8}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '60vw',
        height: '80vh',
        margin: 'auto',
        marginTop: '100px',
        marginRight: '465px',
        marginLeft:"30px",
        border: '3px solid black',
        marginBottom: '40px',
        backgroundColor: 'whitesmoke',
      }}
    >
      <Typography variant="h5" component="div" mt={8} pl={4}>
        <b>Revenue Chart</b>
      </Typography>
      <Linechart data={transformedChartData} width="80%" height="80%" />
    </Box>
  </Grid>
  <Grid item xs={4}>
  <Box
    sx={{
   
      height: '80vh',
      margin: 'auto',
      marginTop: '100px',
      marginRight: '30px',
      display: 'grid',
      gridTemplateRows: '1fr 1fr', 
    }}
  >
    <Box
      sx={{
        border: '2px solid black', 
        background: 'linear-gradient(45deg, black, red)',
        color:"white",
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        marginBottom:"10px"
      }}
    >
      <MovieCards/>
    </Box>
    <Box
      sx={{
        border: '3px solid black', 
        background: 'linear-gradient(45deg, black, red)',
        color:"white",
      }}
    >
     <TheaterCards/>
    </Box>
  </Box>
</Grid>

        <Grid item xs={12} >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '60vw',
              height: '80vh',
              margin: 'auto',
              marginTop: '100px',
              marginRight:"495px",
              border: '3px solid black',
              marginBottom: "40px",
              backgroundColor:"whitesmoke"
             
            }}
          >
            <Typography variant="h5" component="div" mt={8} pl={4}>
              <b>Movie Chart</b>
            </Typography>
          
            <BarChart width="80%" height="80%"  />

          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminHome;
