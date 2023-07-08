import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Button,
} from '@mui/material';
import { getTheatreDetails, getownerMovies } from '../../api-helpers/api-helpers';

const EditTheatreForm = ({ theatreId, onEditButtonClick }) => {
  const [theatreDetails, setTheatreDetails] = useState(null);
  const [movieNames, setMovieNames] = useState([]);

  useEffect(() => {
    const fetchTheatreDetails = async () => {
      try {
        console.log("theatreId:", theatreId);
        const theatre = await getTheatreDetails(theatreId);
        console.log("theatre:", theatre);
        setTheatreDetails(theatre);
      } catch (error) {
        console.error('Failed to fetch theatre details:', error);
      }
    };

    fetchTheatreDetails();
  }, [theatreId]);

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

  if (!theatreDetails) {
    return null; // Return null or a loading indicator while fetching the data
  }

  const handleEditButtonClick = () => {
    onEditButtonClick(theatreId); // Pass the theatreId to the callback function
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel id="movieNameLabel">Movie Name</InputLabel>
          <Select
            labelId="movieNameLabel"
            id="movieName"
            name="movieName"
            value={theatreDetails.movies}
            fullWidth
            disabled
          >
            {movieNames && movieNames.length > 0 && (
              movieNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))
            )}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="timingsLabel">Timings</InputLabel>
          {theatreDetails.showTimings.map((timing, index) => (
            <div key={index}>{timing.startTime}</div>
          ))}
        </Grid>
      </Grid>

      <Button onClick={handleEditButtonClick}>Edit Theatre</Button>
    </>
  );
};

export default EditTheatreForm;
