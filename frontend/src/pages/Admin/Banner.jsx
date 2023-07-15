import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBanners } from '../../api-helpers/api-helpers';
import Header from '../../components/AdminHeader';
import AddBanner from '../../components/Banner/AddBanner';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import BaseURL from '../../config';
const Banner = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState('');

  


  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);
  const tokenExpirationMiddleware = (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admintoken");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminimage");
      localStorage.removeItem("adminname");
      toast.error("Token expired. Redirecting to login page...");
      navigate("/admin/admin");
    } else {
      throw error;
    }
  };

  const fetchBanners = () => {
    getBanners()
      .then((data) => {
    
        setBanner(data);
    
      })
      .catch((err) =>{
        console.log(err);
        tokenExpirationMiddleware(err);
      });
  };
 


 

  const handleAddBanner = () => {
    fetchBanners(); 
    toast.success('Banner Added Successfully');
  };

  
  const handleConfirmationOpen = (bannerId) => {
    setSelectedBannerId(bannerId);
    setConfirmationOpen(true);
  };
  
  const handleConfirmationClose = () => {
    setSelectedBannerId('');
    setConfirmationOpen(false);
  };
  const handleDelete = async (bannerId) => {
    try {
   
      await axios.delete(`${BaseURL}admin/deltebanner/${bannerId}`, {});
    fetchBanners();
    toast.success('Banner deleted successfully');
     
    } catch (error) {
      console.error('Error deleting banner:', error);

      toast.error('Failed to delete the banner');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClick = (bannerId) => {
    handleConfirmationOpen(bannerId);
  };
  
  const handleConfirmDelete = () => {
    handleDelete(selectedBannerId);
    handleConfirmationClose();
  };

  return (
    <>
      <ToastContainer />
      <Header />

      <Box>
        <Typography variant="h3" padding={2} mt={4} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Banners</b>
        </Typography>
        
        <Box marginTop={4} marginLeft={3}>
          <AddBanner onAddBanner={handleAddBanner} />
        </Box>

        <Box width={'80%'} margin={'auto'}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            marginTop={2}
            marginLeft={5}
            marginBottom={'50px'}
            height={'150px'}
            color={"black"}
            backgroundColor={'rgba(211, 211, 211, 0.3)'} 
          >
            <Box flex={1}>
              <Typography variant="h4">
                <b>Title</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>Description</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>Image</b>
              </Typography>
            </Box>
          
            <Box flex={0.75}>
              <Typography variant="h4">
                <b>Actions</b>
              </Typography>
            </Box>
          </Box>

       
          {banner.map((item) => (
          <Box
            key={item._id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            marginTop={2}
            marginBottom={'80px'}
            bgcolor="#f5f5f5"
            height={'150px'}
          >
            <Box flex={1}>
              <Typography variant="h5">{item.title}</Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h5">{item.description}</Typography>
            </Box>
            <Box flex={1}>
              <img
                src={item. postedUrl}
                alt="image"
                style={{ width: '100px', height: '100px' }}
              />
            </Box>
            <Box flex={0.7}>
  <Box display="flex" alignItems="center">
    <DeleteIcon sx={{color:"red",fontSize:"50px", cursor: 'pointer'}}  o onClick={() => handleClick(item._id)} />
  </Box>
</Box>
          </Box>
        ))}
         <Dialog open={confirmationOpen} onClose={handleConfirmationClose} >
      <DialogTitle> <b>Delete Banner</b> </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this banner?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmationClose} style={{backgroundColor:"blue",color:"white"}}>
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete}  style={{backgroundColor:"red",color:"white"}} >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
      
         
        </Box>
      </Box>
    </>
  );
};

export default Banner;


