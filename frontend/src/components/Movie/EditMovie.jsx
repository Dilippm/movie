import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { editMovie } from '../../api-helpers/api-helpers';
import axios from 'axios';
import BaseURL from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function EditMovie({ movieId, onEditMovie }) {
  const [open, setOpen] = useState(false);
  const [movieData, setMovieData] = useState({
    title: '',
    language: '',
    description: '',
    file: null,
  });
  const [errors, setErrors] = useState({
    title: '',
    language: '',
    description: '',
    file: '',
  });
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await axios.get(`${BaseURL}movie/editmovie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setMovieDetails(response.data.movie);
  
        
        if (response.data.movie.postedUrl) {
          setMovieData((prevData) => ({
            ...prevData,
            file: response.data.movie.postedUrl,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
  
    fetchMovieDetails();
  }, [movieId]);
  

  useEffect(() => {
    if (movieDetails) {
      setMovieData((prevData) => ({
        ...prevData,
        title: movieDetails.title,
        language: movieDetails.language,
        description: movieDetails.description,
        image: movieDetails.postedUrl,
      }));
    }
  }, [movieDetails]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'file') {
      setMovieData((prevData) => ({
        ...prevData,
        file: files[0], 
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      language: '',
      description: '',
      file: '',
    };

    if (!movieData.title) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!movieData.language) {
      newErrors.language = 'Language is required';
      isValid = false;
    }

    if (!movieData.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!movieData.file) {
      newErrors.file = 'File is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEditMovie = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await editMovie(movieId, movieData, movieData.file);
 
      console.log('Movie edited successfully:', response);

      
      setMovieData({
        title: '',
        language: '',
        description: '',
        file: null,
      });
      setErrors({
        title: '',
        language: '',
        description: '',
        file: '',
      });
      handleClose();

      
      if (onEditMovie) {
        onEditMovie();
      }
    } catch (error) {
      console.error('Failed to edit movie:', error);
      if (error.name === 'Invalid image type') {
        toast.error('Invalid image type. Please upload a valid image (png, jpeg, jpg, webp).');
      } else {
        toast.error('Failed to edit movie. Please try again later.');
      }
      
    }
  };

  return (
    <div>
       <ToastContainer />
      <Button variant="contained" onClick={handleClickOpen} style={{ border: 'none', color: 'white' }}>
        <b>EDIT</b>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT MOVIE</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Movie Title"
            type="text"
            fullWidth
            variant="standard"
            value={movieData.title}
            onChange={handleInputChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="language"
            name="language"
            label="Language"
            type="text"
            fullWidth
            variant="standard"
            value={movieData.language}
            onChange={handleInputChange}
            error={!!errors.language}
            helperText={errors.language}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={movieData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <img src={movieData.image} width={'200px'} height={'200px'} alt="Movie Poster" />
          <TextField
            autoFocus
            margin="dense"
            id="file"
            name="file"
            label="Select File"
            type="file"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            error={!!errors.file}
            helperText={errors.file}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditMovie}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditMovie;
