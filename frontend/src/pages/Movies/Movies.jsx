import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Typography, TextField, MenuItem } from '@mui/material';
import { getAllMovies, getDistinctLanguages, getMoviesByLanguage } from '../../api-helpers/api-helpers';
import MovieItems from './MovieItems';
import Header from '../../components/Header';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies();
    fetchLanguages();
  }, [currentPage]);

  const fetchMovies = (language) => {
    if (language) {
      getMoviesByLanguage(language, currentPage)
        .then((data) => {
          setMovies(data.movies);
          setTotalPages(data.totalPages);
        })
        .catch((err) => console.log(err));
    } else {
      getAllMovies(currentPage)
        .then((data) => {
          setMovies(data.movies);
          setTotalPages(data.totalPages);
        })
        .catch((err) => console.log(err));
    }
  };
  

  const fetchLanguages = () => {
    getDistinctLanguages()
      .then((data) => {
        setLanguages(data.languages);
      })
      .catch((err) => console.log(err));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedLanguage('');
  };

 const handleLanguageChange = (event) => {
  const language = event.target.value;
  setSelectedLanguage(language);
  setCurrentPage(1);
  setSearchQuery('');
  fetchMovies(language);
};


  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchQuery('');
    setSelectedLanguage('');
  };

  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const languageMatch = selectedLanguage ? movie.language === selectedLanguage : true;
    return titleMatch && languageMatch;
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          style={{
            width: '50px',
            height: '50px',
            margin: '2px',
            backgroundColor: currentPage === i ? 'green' : '#FFF',
            color: currentPage === i ? '#FFF' : '#000',
          }}
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
      <Header />
      <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}></Box>
      <Box margin={'auto'} marginTop={4}>
        <Typography variant="h4" padding={2} textAlign={'center'} bgcolor={'#900C3F'} color={'white'}>
          <b>All Movies</b>
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center" width={'30%'} margin={'auto'}  marginTop={'20px'} >
  <TextField
    label="Search"
    variant="outlined"
    value={searchQuery}
    onChange={handleSearchChange}
    fullWidth
    margin="normal"
    style={{border:"3px solid white"}}
  />
  <TextField
  
    select
    label="Filter by Language"
    variant="outlined"
    value={selectedLanguage}
    onChange={handleLanguageChange}
    style={{ width: '250px',paddingLeft:"10px",border:"3px solid white" }}
    margin="normal"
  >
    <MenuItem value="">All</MenuItem>
    {languages.map((language, index) => (
      <MenuItem key={index} value={language}>
        {language}
      </MenuItem>
    ))}
  </TextField>
</Box>
        <Box width={'100%'} margin={'auto'} display={'flex'} justifyContent={'center'} flexWrap={'wrap'}>
          {filteredMovies.map((movie, index) => (
            <MovieItems
              key={index}
              postedUrl={movie.postedUrl}
              id={movie._id}
              title={movie.title}
              language={movie.language}
              description={movie.description}
              releaseDate={movie.releaseDate}
            />
          ))}
        </Box>
        <Box display="flex" justifyContent="center" marginTop={2}>
          {currentPage > 1 && (
            <button
              style={{ width: '100px', height: '50px', backgroundColor: '#4287f5', color: 'white' }}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <b>Previous</b>
            </button>
          )}
          {renderPageNumbers()}
          {currentPage < totalPages && (
            <button
              style={{ width: '100px', height: '50px', backgroundColor: '#4287f5', color: 'white', marginLeft: '10px' }}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next Page
            </button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Movies;
