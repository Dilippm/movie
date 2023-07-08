import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Container, Box } from '@mui/material';
import axios from 'axios';
import BaseURL from '../../../config';

const TheaterCards = () => {
  const [topTheaters, setTopTheaters] = useState([]);

  useEffect(() => {
    fetchTopTheaters();
  }, []);

  const fetchTopTheaters = async () => {
    try {
      const id = localStorage.getItem('adminId');
      const token = localStorage.getItem('admintoken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BaseURL}admin/theaterschart/${id}`, config);
      const data = response.data.theaterCollection;
      
      const sortedTheaters = data.sort((a, b) => b[1] - a[1]);
      const top3Theaters = sortedTheaters.slice(0, 3);
      setTopTheaters(top3Theaters);
    } catch (error) {
      console.log('Error fetching top theaters:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" mt={3}>
        <b>Top Theaters</b>
      </Typography>
      <Box sx={{ border: '2px solid red', margin: 'auto', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <List>
          {topTheaters.map((theater, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ fontSize: '25px', color: 'white' }}>
                    {`${theater[0]}: ₹${theater[1]}/-`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default TheaterCards;
