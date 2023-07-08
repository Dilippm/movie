import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AddMovie } from '../../api-helpers/api-helpers';

const MovieForm = ({ onAddMovie }) => {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setMovieData({ ...movieData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setMovieData({ ...movieData, file: event.target.files[0] });
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

  const handleAddMovie = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await AddMovie(movieData, movieData.file);
      console.log('Movie added successfully:', response);

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

      if (onAddMovie) {
        onAddMovie();
      }

      handleClose();
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style={{ border: '1px solid black', color: 'white',backgroundColor:"black" }}>
        <b>ADD Movie</b>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD MOVIE</DialogTitle>
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
          <TextField
            autoFocus
            margin="dense"
            id="file"
            name="file"
            label="Select File"
            type="file"
            fullWidth
            variant="standard"
            onChange={handleFileChange}
            error={!!errors.file}
            helperText={errors.file}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddMovie}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieForm;
