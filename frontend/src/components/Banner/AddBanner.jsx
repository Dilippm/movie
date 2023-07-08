import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addBanner } from '../../api-helpers/api-helpers';
import { ToastContainer, toast } from 'react-toastify';
const AddBanner = ({ onAddBanner }) => {
  const [open, setOpen] = useState(false);
  const [bannerData, setBannerData] = useState({
    title: '',
    description: '',
    image: '', // Store image URL here
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    image: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setBannerData({ ...bannerData, [event.target.name]: event.target.value });
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      image: '',
    };

    if (!bannerData.title) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!bannerData.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!bannerData.image) {
      newErrors.image = 'Image URL is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddBanner = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await addBanner(bannerData);
      toast.success("Banner Added successfully")

      setBannerData({
        title: '',
        description: '',
        image: '',
      });
      setErrors({
        title: '',
        description: '',
        image: '',
      });

      if (onAddBanner) {
        onAddBanner();
      }

      handleClose();
    } catch (error) {
      console.error('Failed to add banner:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style={{ border: '2px solid black', color: 'white',backgroundColor:"black" }}>
        <b>Add Banner</b>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Banner</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Banner Title"
            type="text"
            fullWidth
            variant="standard"
            value={bannerData.title}
            onChange={handleInputChange}
            error={!!errors.title}
            helperText={errors.title}
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
            value={bannerData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            value={bannerData.image}
            onChange={handleInputChange}
            error={!!errors.image}
            helperText={errors.image}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddBanner}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBanner;
