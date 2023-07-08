import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import axios from 'axios';
import BaseURL from '../../config';
import RatingComponent from './Rating';

const GetRatings = ({ theaterId }) => {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${BaseURL}user/ratings/${theaterId}`);

        const allRatings = response.data.theatre.reduce((all, theater) => {
          if (theater.ratings) {
            return all.concat(theater.ratings);
          }
          return all;
        }, []);

        setRatings(allRatings);
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
      }
    };

    fetchRatings();
  }, [theaterId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ratings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ratings.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        <b> View Comments</b>
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '1000px',height:"500px", border:"3px solid white" } }}>
        <DialogTitle>All Ratings</DialogTitle>
        <DialogContent>
          {currentItems.length > 0 ? (
            currentItems.map((rating) => (
              <Box key={rating._id} marginBottom={2} border={'2px solid black'}>
                {rating.image && <img src={rating.image} alt="comment" />}
                <Typography variant="body1"> <b>Comment: </b> {rating.comment}</Typography>
                <RatingComponent value={rating.rating} />
              </Box>
            ))
          ) : (
            <Typography variant="body1"> <b>No ratings available.</b> </Typography>
          )}
        </DialogContent>
        {totalPages > 1 && (
  <Box display="flex" justifyContent="center" marginTop={2}>
    <Button
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      Previous
    </Button>
    {Array.from({ length: totalPages }, (_, index) => (
      <Button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal', border:"2px solid blue ",marginBottom:"30px",marginLeft:"5px" }}
      >
        {index + 1}
      </Button>
    ))}
    <Button
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      Next
    </Button>
  </Box>
)}
      </Dialog>
    </div>
  );
};

export default GetRatings;
