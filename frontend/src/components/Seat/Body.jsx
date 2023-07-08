import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseURL from '../../config';

const Body = ({ data, onSeatsSelected, selectedShowTiming, selectedDate }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showTimeSeats, setShowTimeSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  let date = selectedDate.format('YYYY-MM-DD');
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = localStorage.getItem('userId');
        const response = await axios.get(`${BaseURL}user/reservedseats/${id}`, {
          params: {
            movie: data.movies,
            theatre: data.name,
            date,
            time: selectedShowTiming,
          },
        });
       
        const reservedSeats = response.data.reservedSeats.flat() || [];
        
        setReservedSeats(reservedSeats);
      } catch (error) {
        console.log('Error fetching selected seats:', error);
      }
    };

    fetchData();
  }, [data.movies, data.name, date, selectedShowTiming]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = localStorage.getItem('userId');
        const bookedSeatsResponse = await axios.get(`${BaseURL}booking/reservedseats/${id}`, {
          params: {
            movie: data.movies,
            theatre: data.name,
            date,
            time: selectedShowTiming,
          },
        });
       
        const bookedSeats = bookedSeatsResponse.data.bookedSeats.flat() || [];
console.log("seatdbooked",bookedSeats);
       
        setBookedSeats(bookedSeats);
      } catch (error) {
        console.log('Error fetching selected seats:', error);
      }
    };

    fetchData();
  }, [data.movies, data.name, date, selectedShowTiming]);

  useEffect(() => {
    const showTimeSeats =
      data.showTimings.find((showTiming) => showTiming.startTime === data.selectedShowTiming)?.seats || [];
    setSelectedSeats(showTimeSeats);
    setShowTimeSeats(showTimeSeats);
  }, [data.showTimings, data.selectedShowTiming]);

  useEffect(() => {
    setSelectedSeats([]);
    setShowTimeSeats([]);
  }, [data]);

  const totalseats = data.seats;

  const rows = 10;
  const columns = Math.ceil(totalseats / rows);

  const handleSeatClick = (seat) => {
    const isSelected = selectedSeats.includes(seat);
    const isReserved = reservedSeats.includes(seat);
    const isBooked = bookedSeats.includes(seat);
    const isDisabled = isReserved || isBooked;
  
    if (!isDisabled) {
      const updatedSelectedSeats = isSelected
        ? selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
        : [...selectedSeats, seat];
  
      setSelectedSeats(updatedSelectedSeats);
      onSeatsSelected(updatedSelectedSeats);
    }
  };
  

  const renderSeats = () => {
    const seats = [];
  
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        const seatIndex = (row - 1) * columns + col;
        if (seatIndex > totalseats) {
          break;
        }
  
        const seat = `${String.fromCharCode(64 + row)}${col}`;
        const isSelected = selectedSeats.includes(seat);
        const isReserved = reservedSeats.includes(seat);
        const isBooked = bookedSeats.includes(seat);
        const isDisabled = isReserved || isBooked;
  
        seats.push(
          <div
            key={seat}
            onClick={() => handleSeatClick(seat)}
            style={{
              backgroundColor: isSelected ? 'green' : isBooked ? 'red' : isReserved ? 'brown' : 'skyblue',

              color: isSelected ? 'white' : isReserved ? 'white' : 'black',
              padding: '10px',
              margin: '10px',
            
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              display: 'inline-block',
              border: isSelected ? '1px solid green' : isBooked ? '1 px solid red' : isReserved ? 'brown' : ' 1px solid black',
             
              width: '50px',
              height: '40px',
              textAlign: 'center',
              fontSize: '16px',
            }}
          >
            <b>{seat}</b>
          </div>
        );
      }
      seats.push(<br key={`br-${row}`} />);
    }
  
    return seats;
  };
  
  return <div>{renderSeats()}</div>;
};

export default Body;
