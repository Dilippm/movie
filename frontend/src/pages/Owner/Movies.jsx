import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { getAllMovies } from '../../api-helpers/api-helpers';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    const data = await getAllMovies(currentPage);
   
    if (data) {
      setMovies(data.movies);
      setTotalPages(data.totalPages);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          style={{ width: "50px", height: "50px", margin: "2px", backgroundColor: currentPage === i ? "green" : "#FFF", color: currentPage === i ? "#FFF" : "#000" }}
          onClick={() => handlePageChange(i)}
        >
         <b>{i}</b> 
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <Box>
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Movies</b>
        </Typography>

        <Box width={'80%'} margin={'auto'}>
        <Box width={'40%'} margin={'auto'} marginTop={'20px'}>
          <TextField
            label='Search'
            variant='outlined'
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            margin='normal'
          />
        </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={2}
            marginTop={2}
            marginLeft={5}
            marginBottom={'30px'}
            height={'150px'}
          >
            <Box flex={1}>
              <Typography variant="h4">
                <b>Title</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>Language</b>
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h4">
                <b>Image</b>
              </Typography>
            </Box>
            <Box flex={0.75}>
              <Typography variant="h4">
                <b>Status</b>
              </Typography>
            </Box>
          </Box>

          <Box width={'100%'} margin={'auto'} display={'flex'} flexDirection={'column'}>
            

            {filteredMovies.map((movie, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={2}
              
                marginBottom={'80px'}
                bgcolor="#f5f5f5"
                height={'150px'}
              >
                <Box flex={1}>
                  <Typography variant="h5"> <b>{movie.title}</b></Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="h5">
                   <b>{movie.language}</b> </Typography>
                </Box>
                <Box flex={1}>
                  <img src={movie.postedUrl} alt="Movie Poster" style={{ width: '100px', height: '100px' }} />
                </Box>
                <Box flex={0.75}>
                  <Typography variant="h5">
                    <b>{movie.status ? "Listed" : "Unlisted"}</b> </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          
          <Box display='flex' justifyContent='center' marginTop={2} marginBottom={3}>
            {currentPage > 1 && (
              <Button
                variant='contained'
                color='primary'
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ margin: '0 10px' }}
              >
                Previous
              </Button>
            )}
             {renderPageNumbers()}
            {currentPage < totalPages && (
              <Button
                variant='contained'
                color='primary'
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ margin: '0 10px' }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Movies;
