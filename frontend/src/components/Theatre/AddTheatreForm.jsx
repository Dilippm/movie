import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Grid,
} from '@mui/material';
import { AddTheatre, getownerMovies } from '../../api-helpers/api-helpers';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const AddTheatreForm = ({ onAddTheatre }) => {
  const [open, setOpen] = useState(false);
  const [theatreData, setTheatreData] = useState({
    name: '',
    seats: '',
    price:'',
    timings: [],
    movieName: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    seats: '',
    price:'',
    timings: '',
    movieName: '',
  });
  const [movieNames, setMovieNames] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchMovieNames = async () => {
      try {
        const movies = await getownerMovies();

        if (movies && Array.isArray(movies)) {
          const fetchedMovieNames = movies.map((movie) => movie.title);

          setMovieNames(fetchedMovieNames);
        }
      } catch (error) {
        console.error('Failed to fetch movie names:', error);
      }
    };

    fetchMovieNames();
  }, []);

 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTheatreData({ ...theatreData, [name]: value });
  };

  const handleTimingChange = (index, value) => {
    const updatedTimings = [...theatreData.timings];
    updatedTimings[index] = value;
    setTheatreData({ ...theatreData, timings: updatedTimings });
  };

  const handleAddTiming = () => {
    const newTimings = [...theatreData.timings, ''];
    setTheatreData({ ...theatreData, timings: newTimings });
  };

  const handleDeleteTiming = (index) => {
    const updatedTimings = [...theatreData.timings];
    updatedTimings.splice(index, 1);
    setTheatreData({ ...theatreData, timings: updatedTimings });
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      seats: '',
      price:'',
      timings: '',
      movieName: '',
    };

    if (!theatreData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!theatreData.seats) {
      newErrors.seats = 'Seats is required';
      isValid = false;
    }
    if (!theatreData.price) {
      newErrors.price = 'Price is required';
      isValid = false;
    }

    if (theatreData.timings.length === 0) {
      newErrors.timings = 'At least one timing is required';
      isValid = false;
    }

    if (!theatreData.movieName) {
      newErrors.movieName = 'Movie name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddTheatre = async () => {
    if (!validateInputs()) {
      return;
    }
  
    try {
      const response = await AddTheatre(theatreData);
      console.log('Theatre added successfully:', response);
      handleClose(); 
      setTheatreData({
        name: '',
        seats: '',
        price:'',
        timings: [],
        movieName: '',
      });
      setErrors({
        name: '',
        seats: '',
        price:'',
        timings: '',
        movieName: '',
      });
  
      
      if (typeof onAddTheatre === 'function') {
        onAddTheatre(response); 
      }
    } catch (error) {
      console.error('Failed to add theatre:', error);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ border: '3px solid white', color: 'white' }}>
        <b>Add Theatre</b>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Theatre</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Theatre Name"
            type="text"
            fullWidth
            variant="standard"
            value={theatreData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="seats"
            name="seats"
            label="Seats"
            type="text"
            fullWidth
            variant="standard"
            value={theatreData.seats}
            onChange={handleInputChange}
            error={!!errors.seats}
            helperText={errors.seats}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={theatreData.price}
            onChange={handleInputChange}
            error={!!errors.price}
            helperText={errors.price}
          />
          <InputLabel id="movieNameLabel">Movie Timings</InputLabel>
          {theatreData.timings.map((timing, index) => (
            <Grid container spacing={1} alignItems="center" key={index}>
              <Grid item xs={11}>
                <TextField
                  autoFocus
                  margin="dense"
                  id={`timing-${index}`}
                  name={`timing-${index}`}
                  label={`Timing ${index + 1}`}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={timing}
                  onChange={(e) => handleTimingChange(index, e.target.value)}
                  error={!!errors.timings}
                  helperText={errors.timings}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => handleDeleteTiming(index)}>
                  <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <IconButton onClick={handleAddTiming}>
            <AddIcon sx={{ color: 'green' }} />
          </IconButton>

          <InputLabel id="movieNameLabel">Movie Name</InputLabel>
          <Select
            autoFocus
            margin="dense"
            id="movieName"
            name="movieName"
            labelId="movieNameLabel"
            fullWidth
            variant="standard"
            value={theatreData.movieName}
            onChange={handleInputChange}
            error={!!errors.movieName}
            helperText={errors.movieName}
          >
            <MenuItem value="" disabled>
              Select a movie
            </MenuItem>
            {movieNames.map((movieName) => (
              <MenuItem key={movieName} value={movieName}>
                {movieName}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTheatre}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTheatreForm
