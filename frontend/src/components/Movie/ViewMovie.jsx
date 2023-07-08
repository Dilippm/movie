import React from 'react';
import { Box, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ViewMovie = ({ open, handleClose, movie }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>
        <b>{movie && movie.title}</b>
      </DialogTitle>
      <img src={movie && movie.postedUrl} alt='movie' height={"250px"} width={"250px"} />
      <DialogContent>
        {movie && (
          <Box>
            <Typography variant="h6">
              <b>Language:</b> {movie.language}
            </Typography>
            <Typography variant="h6">
              <b>Description:</b> {movie.description}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewMovie;
