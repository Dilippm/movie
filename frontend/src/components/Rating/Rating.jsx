import React from 'react';
import { Rating } from '@mui/material';

const RatingComponent = ({ value }) => {
  return (
    <Rating
      name="rating"
      value={value}
      readOnly
      sx={{fontSize:"30px"}}
    />
  );
};

export default RatingComponent;
