import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Container, Box } from '@mui/material';

import axios from 'axios';
import BaseURL from '../../../config';

const MovieCards = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    
    fetchTopMovies();
  }, []);

  const fetchTopMovies = async () => {
    try {
      const id = localStorage.getItem('adminId');
      const token = localStorage.getItem('admintoken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BaseURL}admin/movieschart/${id}`, config);
      const data = response.data.movieCollection;
      console.log('data:', data);
      const sortedMovies = data.sort((a, b) => b[1] - a[1]);
      const top3Movies = sortedMovies.slice(0, 3);
      setTopMovies(top3Movies);
    } catch (error) {
      console.log('Error fetching top movies:', error);
    }
  };

  return (
    <Container maxWidth="sm" >
      <Typography variant="h4" component="h1" align="center" mt={3}>
       <b>Top Movies</b> 
      </Typography>
      <Box sx={{ border: "2px solid red", margin: "auto", marginTop:"20px",display: "flex", flexDirection: "column", alignItems: "center" }}>
  

  <List>
    {topMovies.map((movie, index) => (
      <ListItem key={index}>
        <ListItemText
          primary={
            <Typography variant="h6" style={{ fontSize: '25px' , color:"white"}}>
              {`${movie[0]} : ₹${movie[1]}/-`}
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

export default MovieCards;
