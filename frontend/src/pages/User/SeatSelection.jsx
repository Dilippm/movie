import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Body from '../../components/Seat/Body';
import { Box, Typography, Button } from '@mui/material';
import { fetchDataByTheatreId,theatreReserve } from '../../api-helpers/api-helpers';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import moment from 'moment';

const SeatSelection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = dayjs();
  const tomorrow = dayjs().add(3, 'day');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowTiming, setSelectedShowTiming] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataByTheatreId(id);
        setData(response);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setSelectedSeats([]); 
  }, [data]);

  const handleSeatsSelected = (selectedSeats) => {
    setSelectedSeats(selectedSeats);
  };

  const handleShowTimingClick = (startTime) => {
    setSelectedSeats([]);
    
    setSelectedShowTiming(startTime);
  };

  const handleDateChange = (date) => {
    setSelectedSeats([]);
    setSelectedDate(date);
  };

  const handleContinueClick = async () => {
    
    if (!selectedShowTiming) {
      toast.error('Please select a show timing.');
      return;
    }
  
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat.');
      return;
    }
 
    
    
    

    const theatreName = data.name;
    const movieName = data.movies;
    const Date = selectedDate.format('YYYY-MM-DD');
    const showTime = selectedShowTiming;
    const totalPrice = data.price * selectedSeats.length;
    const seatsSelected = selectedSeats.map((seat) => String(seat));
    const payload = {
      theatreName,
      movieName,
      Date,
      Time: showTime,
      seatsSelected, 
      SeatsSelected: selectedSeats,
      price: totalPrice,
    };

    try {
      const reservation = await theatreReserve(payload);
     
      if (reservation) {
    
        let id = reservation.reservationData._id
        navigate(`/booking/${id}`);
      }
    } catch(error) {  
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Header />
      <ToastContainer />
      <Box sx={{ margin: '50px', display: 'flex', justifyContent: 'center',  width: "500px", marginLeft: "700px" }}>
        <Typography variant="h6" sx={{ marginRight: '10px', paddingTop: '4px' }}>
          <b>Show Timings:</b>
        </Typography>
        {data.showTimings.map((showTiming, index) => (
         <Button
         sx={{
           marginLeft: '50px',
           border: '1px solid brown',
           width: '100px',
           height: '75px',
           color: 'white',
           backgroundColor: 'black',
           '&:hover': { backgroundColor: '#9e0b38' },
          
         }}
         key={index}
         variant="contained"
         onClick={() => handleShowTimingClick(showTiming.startTime)}
         disabled={
           selectedDate.isSame(moment(), 'day') &&
           moment(showTiming.startTime, 'hh:mm A').isBefore(moment(), 'minute')
         }
       >
         <b>{showTiming.startTime}</b>
       </Button>
       
        ))}
      </Box>

      <hr style={{ boxShadow: '10px 20px 0px rgba(10, 0, 20, 0.7)' }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '50px'}}>
        <div
          style={{
            width: '2px',
            backgroundColor: '#000',
            marginLeft: "50px",
            marginRight: '50px',
            boxShadow: '10px 20px 0px rgba(10, 0, 20, 0.7)'
          }}
        ></div>
        <Box sx={{ width: '75%', maxWidth: '75vw', marginLeft: '50px' ,justifyContent:"center" }}>
          <h1 style={{ marginLeft: '400px' }}>Screen This way</h1>
          <br />
          <br />
          <div style={{  marginBottom: "30px" }}>
            <Body data={data} selectedShowTiming={selectedShowTiming} selectedDate={selectedDate} onSeatsSelected={handleSeatsSelected} />
          </div>
          <hr style={{ boxShadow: '10px 20px 0px rgba(10, 0, 20, 0.7)', marginBottom: "30px" }}></hr>
        </Box>
        <div
          style={{
            width: '2px',
            backgroundColor: '#000',
            marginRight: '150px',
            boxShadow: '10px 20px 0px rgba(10, 0, 20, 0.7)'
          }}
        ></div>
        <Box
          sx={{
            marginTop: "150px",
            marginRight: '150px',
            width: '25%',
            height: '700px',
            border: '1px solid black',
            backgroundColor: '#e9e9e9',
            color: '#000',
            boxShadow: '10px 20px 0px rgba(10, 0, 20, 0.7)',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Typography variant="h4">
            {' '}
            <b>Theatre: <i style={{ color: '#3f4652' }}>{data.name}</i></b>{' '}
          </Typography>
          <Typography variant="h4">
            {' '}
            <b> Movie: <i style={{ color: '#3f4652' }}>{data.movies}</i></b>
          </Typography>
          <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                maxDate={tomorrow}
                disablePast
                views={['year', 'month', 'day']}
              
              />
            </DemoContainer>
          </LocalizationProvider>

          </Box>
          
          <Typography variant="h4" marginTop="20px">
            {' '}
            <b>Seats Selected:</b>{' '}
            <i style={{ color: '#3f4652', fontWeight: 'bolder', fontSize: "30px"}}>{selectedSeats.join(', ')}</i>{' '}
          </Typography>
          <Typography variant="h4"  marginTop="20px">
            {' '}
            <b>Show Timing:</b>{' '}
            <i style={{ color: '#3f4652', fontWeight: 'bolder' }}>{selectedShowTiming}</i>{' '}
          </Typography>
          <Typography variant="h4">
            <b>Price:</b>{' '}
            <i style={{ color: '#3f4652' }}>₹ {data.price * selectedSeats.length}/-</i>
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#d1064e',
              color: '#fff',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#9e0b38',
              },
            }}
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SeatSelection;
