import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Header from '../../components/Header';
import BaseURL from '../../config';
import PayButton from '../../components/Payment/PayButton';
import { walletBooking } from '../../api-helpers/api-helpers';
const Bookings = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [reservationDetails, setReservationDetails] = useState(null);
  const [wallet,setWallet] =useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(`${BaseURL}user/reservations/${id}`, { headers });
       
        setReservationDetails(response.data.reservation);
        setWallet(response.data.wallet)

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch reservation details', error);
        setIsLoading(false);
      }
    };

    fetchReservationDetails();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!reservationDetails) {
    return <p>Failed to fetch reservation details</p>;
  }
  const handleBookButton = async () => {
    try {
      
      const booked = await walletBooking(id);
     
      if (booked) {
        navigate(`/wallet-success/${booked.savedBooking._id}`);
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  

  return (
    <div>
      <Header />
      <Typography variant="h4" marginTop={8} padding={2} textAlign="center" bgcolor="#900C3F" color="white">
        <b> Booking</b>
      </Typography>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="70vh" >
      <Card style={{ width: '500px', height: '550px', border: '3px solid #000', boxShadow: '10px 20px 4px rgba(0, 0, 0, 0.5)',backgroundColor:"#ECD5BB" }}>
          <CardContent >
            <Typography style={{marginBottom:"20px",marginTop:"10px"}} variant="h5" component="h2" align="center">
             <b>Theater:<i style={{color:"#3D0C02"}}>{reservationDetails.theatreName}</i> </b> 
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}}  variant="h5" component="h2" align="center">
             <b> Movie:  <i style={{color:"#3D0C02"}}>{reservationDetails.movieName}</i></b>
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}}  variant="h5" component="h2" align="center">
             <b>Date: <i style={{color:"#3D0C02"}}>{reservationDetails.Date}</i></b> 
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}} variant="h5" component="h2" align="center">
             <b>Time:<i style={{color:"#3D0C02"}}>{reservationDetails.Time}</i>  </b> 
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}}  variant="h5" component="h2" align="center">
             <b>Seats Selected: <i>{reservationDetails.SeatsSelected.join(', ')}</i> </b>
            </Typography>
            <br />
            <Typography style={{marginBottom:"20px"}}  variant="h5" component="h2" align="center">
             <b>Price:<i style={{marginBottom:"20px"}}>{reservationDetails.price}</i> </b> 
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
  variant="contained"
  style={{
    marginLeft: '50px',
    marginTop: '20px',
    height: '60px',
    width: '160px',
    backgroundColor: wallet < reservationDetails.price ? 'grey' : 'purple',
    fontSize: '18px',
    color: 'white',
    cursor: wallet < reservationDetails.price?'not-allowed':'pointer',
    borderRadius: '20px',
    transition: 'background-color 0.3s',
  }}
  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'purple'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = wallet < reservationDetails.price ? 'red' : 'purple'}
  onClick={handleBookButton}
  disabled={wallet < reservationDetails.price}
>
  wallet: ₹{wallet}/-
</Button>


  <PayButton reservationDetails={reservationDetails} />
</div>


          </CardContent>
          
        </Card>
      </Box>
    </div>
  );
};

export default Bookings;
