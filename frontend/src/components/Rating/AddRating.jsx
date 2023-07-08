import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, Rating, DialogActions } from '@mui/material';
import axios from 'axios';
import { ToastContainer,toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseURL from '../../config'
import { getTheaters } from '../../api-helpers/api-helpers';
const AddRating = ({ theaterId }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('rating', rating);
    formData.append('image', selectedFile);

    try {
        const userToken = localStorage.getItem("token");
      const response = await axios.post(`${BaseURL}user/submit-rating/${theaterId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      });

      toast.success(response.data.message);
      getTheaters()
      setComment('');
      setRating(0);
      setSelectedFile(null);

      handleClose();
    }catch (error) {
      
      if (error.response && error.response.status === 400) {
       
      
        toast.error(error.response.data.message)
      } else {
        console.error('Error submitting rating:', error);
     
      }
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{marginBottom:"20px"}}> <b>Add</b> </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            value={comment}
            onChange={handleCommentChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <div style={{ marginBottom: "20px" }}>
            <input type="file" name="image" onChange={handleFileChange} />

          </div>
          <div>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              size="large"
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </div>
  );
};

export default AddRating;
