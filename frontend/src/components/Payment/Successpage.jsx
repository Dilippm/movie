import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        <Text variant="h1">{reservation.theatreName}</Text>
        <Text>Movie: {reservation.movieName}</Text>
        <Text>Date: {reservation.Date}</Text>
        <Text>Time: {reservation.Time}</Text>
        <Text>Seats: {reservation.SeatsSelected}</Text>


      </Page>
    </Document>
  );
};

const SuccessPage = () => {
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('reservationId');
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${BaseURL}user/reservations/${id}`, { headers })
      .then(response => {
        const reservationData = response.data;
        setReservation(reservationData.reservation);


        const bookingDetails = { bookingDetails: reservationData.reservation };
        axios.post(`${BaseURL}user/userbooking/${userId}`, bookingDetails)
          .then(response => {
            console.log('Booking details saved successfully:', response.data);
          })
          .catch(error => {
            console.error('Error saving booking details:', error);
          });
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
                Theater: <i>{reservation.theatreName}</i>
              </Typography>
              <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
                Movie: <i> {reservation.movieName}</i>
              </Typography>
              <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
                Date: <i>{reservation.Date}</i>
              </Typography>
              <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
                Time: <i>{reservation.Time}</i>
              </Typography>
              <Typography variant="subtitle1" gutterBottom style={{ fontSize: '2.5rem', marginLeft: '80px' }}>
                Seats: <i>{reservation.SeatsSelected}</i>
              </Typography>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <QRCode
                value={`Theater: ${reservation.theatreName}\nMovie: ${reservation.movieName}\nDate: ${reservation.Date}\nTime: ${reservation.Time}\nSeats: ${reservation.SeatsSelected}`}size={200} bgColor="black" fgColor="white"
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
  );
};

export default SuccessPage;
