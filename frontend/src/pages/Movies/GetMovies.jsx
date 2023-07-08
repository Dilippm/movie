import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import BaseURL from '../../config';
import Header from '../../components/AdminHeader';
import { getMovies} from '../../api-helpers/api-helpers';
import AddMovie from '../../components/Movie/AddMovie';
import EditMovie from '../../components/Movie/EditMovie';
import ViewMovie from '../../components/Movie/ViewMovie';

const GetMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 2; 

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = () => {
  
    getMovies(currentPage, limit)
      .then((data) => {
        setMovies(data.movies);
        console.log(movies);
        setTotalPages(data.totalPages);
        console.log(totalPages);
      })
      .catch((err) => console.log(err));
  };

  const handleStatusChange = async (movie) => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await axios.post(
        `${BaseURL}admin/moviestatus/${movie._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedStatus = response.data.movie.status;
        setMovies((prevMovies) =>
          prevMovies.map((prevMovie) => {
            if (prevMovie._id === movie._id) {
              return {
                ...prevMovie,
                status: updatedStatus,
              };
            }
            return prevMovie;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const nameMatch =
        movie.title &&
        movie.title.toLowerCase().includes(searchValue.toLowerCase());

      return nameMatch;
    });
    setFilteredUsers(filtered);
  }, [searchValue, movies]);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleAddMovie = () => {
    fetchMovies(currentPage); 
    toast.success('Movie Added Successfully');
  };

  const handleEditMovie = () => {
    fetchMovies(currentPage); 
    toast.success('Movie edited Successfully');
  };

  const handleViewMovie = (movie) => {
    setSelectedMovie(movie);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
      <ToastContainer />
      <Header />

      <Box>
        <Typography variant="h3" padding={2} textAlign="center" bgcolor="#900C3F" color="white">
          <b>All Movies</b>
        </Typography>
        <Box width={'30%'} height={'80%'} margin="auto" marginTop={4}>
          <TextField
            sx={{
              input: {
                color: 'black',
                border: '3px solid white',
                borderRadius: 30,
                backgroundColor: 'white',
                width: '500px',
                height: '40px',
              },
            }}
            variant="standard"
            placeholder="Search By Name "
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </Box>
        <Box marginTop={4} marginLeft={3}>
          <AddMovie onAddMovie={handleAddMovie} />
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
            backgroundColor={'rgba(211, 211, 211, 0.3)'} 
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
                <b>Actions</b>
              </Typography>
            </Box>
          </Box>

          {filteredUsers.map((movie, index) => (
            <Box
              key={index}
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
                <Typography variant="h5">{movie.title}</Typography>
              </Box>
              <Box flex={1}>
                <Typography variant="h5">{movie.language}</Typography>
              </Box>
              <Box flex={1}>
                <img
                  src={movie.postedUrl}
                  alt="Movie Poster"
                  style={{ width: '100px', height: '100px' }}
                />
              </Box>
              <Box flex={0.75}>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: movie.status ? 'green' : '#edb009',
                      color: 'white',
                      marginRight: '5px',
                    }}
                    onClick={() => handleStatusChange(movie)}
                  >
                    {movie.status ? 'Listed' : 'Unlisted'}
                  </Button>
                  <EditMovie movieId={movie._id} onEditMovie={handleEditMovie} />
                  <Button
                    variant="contained"
                    style={{ marginLeft: '5px', backgroundColor: 'ThreeDHighlight', color: 'white' }}
                    onClick={() => handleViewMovie(movie)}
                  >
                    View
                  </Button>
                  <ViewMovie open={openDialog} handleClose={handleCloseDialog} movie={selectedMovie} />
                </Box>
              </Box>
            </Box>
          ))}

          <Box display="flex" justifyContent="center" marginTop={4} marginBottom={3}>
            {currentPage > 1 && (
              <Button
                sx={{ margin: '10px', width: '100px', height: '40px' }}
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
            )}
              {renderPageNumbers()}
            {currentPage < totalPages && (
              <Button
                sx={{ margin: '10px', width: '100px' }}
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(currentPage + 1)}
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

export default GetMovies;
