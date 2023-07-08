import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BaseURL from '../../config';
import { Typography, Container, Box, IconButton } from '@mui/material';
import { Download } from '@mui/icons-material';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import Header from '../Header';
import QRCode from 'qrcode.react';

const ReservationDocument = ({ reservation }) => {


    return (
      <Document>
        <Page style={{ textAlign: 'center', marginTop: '100px' }}>
          <Text variant="h1">{reservation[0].theater}</Text>
          <Text>Movie: {reservation[0].movie}</Text>
          <Text>Date: {reservation[0].date}</Text>
          <Text>Time: {reservation[0].time}</Text>
          <Text>Seats: {reservation[0].seatNumber}</Text>
  
  
        </Page>
      </Document>
    );
  };
  const WalletSuccess = () => {
    const [reservation, setReservation] = useState(null);
    const { id } = useParams();
 
    useEffect(() => {
   
     
      const token = localStorage.getItem('token');
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      axios
        .get(`${BaseURL}user/specificbooking/${id}`, { headers })
        .then(response => {
          const reservationData = response.data;
         
          setReservation(reservationData.bookings);
         
        })
        .catch(error => {
          console.error('Error fetching reservation:', error);
        });
    }, []);
  
  return (
    <>
    <Header />
    <Container maxWidth="md">
      <Box
        mt={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 100%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 700,
          padding: '0 30px',
        }}
      >
        <Typography variant="h4" align="center" mt={4} style={{ fontSize: '4.5rem', color: 'black' }}>
          <b> Payment Successful!</b>
        </Typography>
        {reservation && (
          <Box mt={4} position="relative" display="flex" alignItems="center">
          <div style={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom style={{ fontSize: '3.5rem', color: 'black' }}>
              <b> Reservation Details</b>
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
              Theater: <i>{reservation[0].theater}</i>
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
              Movie: <i> {reservation[0].movie}</i>
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
              Date: <i>{reservation[0].date}</i>
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
              Time: <i>{reservation[0].time}</i>
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
              Seats: <i>{reservation[0].seatNumber}</i>
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <QRCode
              value={`Theater: ${reservation[0].theater}\nMovie: ${reservation[0].movie}\nDate: ${reservation[0].date}\nTime: ${reservation[0].time}\nSeats: ${reservation[0].seatNumber}`}size={200} bgColor="black" fgColor="white"
            />
            <PDFDownloadLink document={<ReservationDocument reservation={reservation} />} fileName="reservation.pdf">
              {({ blob, url, loading, error }) => (
                <IconButton
                  color="secondary"
                  aria-label="Download PDF"
                  style={{ marginLeft: '10px',marginTop:"250px", border: '2px solid black', fontSize: '2rem' }}
                >
                  <Download />
                </IconButton>
              )}
            </PDFDownloadLink>
          </div>
        </Box>
        
        )}
      </Box>
    </Container>
  </>
  )
}

export default WalletSuccess
