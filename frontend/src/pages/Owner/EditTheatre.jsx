import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton, TextField, Button, MenuItem } from '@mui/material';
import { getTheatreDetails, getownerMovies, updateTheatreDetails } from '../../api-helpers/api-helpers';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const EditTheatre = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [theatreDetails, setTheatreDetails] = useState(null);
  const [availableMovies, setAvailableMovies] = useState([]);

  useEffect(() => {
    const fetchTheatre = async () => {
      try {
        const theatre = await getTheatreDetails(id);
      
        setTheatreDetails(theatre);
      } catch (error) {
        console.error('Failed to fetch theatre details:', error);
      }
    };

    const fetchMovies = async () => {
      try {
        const movies = await getownerMovies();
        setAvailableMovies(movies);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchTheatre();
    fetchMovies();
  }, [id]);

  const handleTimingChange = (index, value) => {
    const updatedTimings = [...theatreDetails.showTimings];
    updatedTimings[index].startTime = value;
    setTheatreDetails({ ...theatreDetails, showTimings: updatedTimings });
  };

  const handleDeleteTiming = (index) => {
    const updatedTimings = [...theatreDetails.showTimings];
    updatedTimings.splice(index, 1);
    setTheatreDetails({ ...theatreDetails, showTimings: updatedTimings });
  };

  const handleAddTiming = () => {
    const newTiming = {
      _id: Math.random().toString(),
      startTime: '',
    };
    const updatedTimings = [...theatreDetails.showTimings, newTiming];
    setTheatreDetails({ ...theatreDetails, showTimings: updatedTimings });
  };

  const handleMoviesChange = (event) => {
    const selectedMovieTitle = event.target.value;
    const selectedMovie = availableMovies.find((movie) => movie.title === selectedMovieTitle);
  
    setTheatreDetails({ ...theatreDetails, movies: selectedMovie.title, movieTitle: selectedMovie.title });
  };
  
  
  

  const handleNameChange = (event) => {
    setTheatreDetails({ ...theatreDetails, name: event.target.value });
  };

  const handleSeatsChange = (event) => {
    setTheatreDetails({ ...theatreDetails, seats: event.target.value });
  };
  const handlePriceChange = (event) => {
    setTheatreDetails({ ...theatreDetails, price: event.target.value });
  };

  const handleUpdateTheatre = async () => {
    try {
      await updateTheatreDetails(id, theatreDetails);
      navigate('/owner/owner_theater');
      // Show a success message or redirect to a different page
    } catch (error) {
      console.error('Failed to update theatre details:', error);
      // Show an error message or handle the error
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
      <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '600px', width: '100%' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          <b>Edit Theatre</b>
        </Typography>
        {theatreDetails ? (
        <>
            <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
              Theatre Name:
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={theatreDetails.name}
              onChange={handleNameChange}
            />

            <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
              Seats:
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={theatreDetails.seats}
              onChange={handleSeatsChange}
            />
              <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
              Price:
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={theatreDetails.price}
              onChange={handlePriceChange}
            />

            <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
              Movie:
            </Typography>
            <TextField
  variant="standard"
  fullWidth
  select
  value={theatreDetails.movieTitle}
  onChange={handleMoviesChange}
>
  {availableMovies.map((movie) => (
    <MenuItem key={movie._id} value={movie.title}>
      {movie.title}
    </MenuItem>
  ))}
</TextField>


            <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
              Show Timings:
            </Typography>
            {theatreDetails.showTimings.map((timing, index) => (
              <Box key={timing._id} display="flex" alignItems="center" marginBottom="0.5rem">
                <TextField
                  variant="standard"
                  fullWidth
                  value={timing.startTime}
                  onChange={(event) => handleTimingChange(index, event.target.value)}
                />
                <IconButton onClick={() => handleDeleteTiming(index)}>
                  <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>
              </Box>
            ))}

            <Box display="flex" alignItems="center" marginBottom="0.5rem">
              <IconButton onClick={handleAddTiming}>
                <AddCircleOutlineIcon sx={{ color: 'green' }} />
              </IconButton>
              <Typography variant="body1">Add Show Timing</Typography>
            </Box>

            <Button variant="contained" type="submit" fullWidth onClick={handleUpdateTheatre}>
              <b>Update</b>    
            </Button>
       
          </>
        ) : (
          <Typography variant="h6">Sorry, something went wrong.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default EditTheatre;
