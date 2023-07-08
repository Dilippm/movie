import React, {useState, useEffect} from 'react';
import {Box} from '@mui/system';
import Typography from '@mui/material/Typography';
import './Home.css';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Banner from '../components/Banner/Banner';
import {getAllMovies} from '../api-helpers/api-helpers';

import MovieItems from './Movies/MovieItems';
import UpCommingMovies from '../components/Movie/UpCommingMovies';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((data) => {
                setMovies(data.movies);
                setFilteredMovies(data.movies);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const filtered = movies.filter((movie) => {
            const titleMatch = movie
                .title
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const languageMatch = movie
                .language
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            return titleMatch || languageMatch;
        });
        setFilteredMovies(filtered);
    }, [searchValue, movies]);

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <> < Header /> <Box
            width="95vw"
            margin="auto"
            marginTop={3}
            style={{
                overflowX: 'hidden',
                maxWidth: "100vw"
            }}>
            <Box width="100%" height="40vh" padding={2} marginBottom="175px">
                <Banner/>
            </Box>

            <Box padding={5} margin="auto" textAlign="center" marginTop="220px">
                <hr/>
                <Box>

                </Box>
                <Typography variant="h4" marginTop={3}>
                    <b>Latest Release</b>
                </Typography>
                <Box width="100%" maxWidth="600px" margin="auto" marginTop={3}>
                    <TextField
                        sx={{
                            input: {
                                color: 'black',
                                border: '3px solid white',
                                borderRadius: 30,
                                backgroundColor: 'white',
                                width: '500px'
                            }
                        }}
                        variant="standard"
                        placeholder="Search By Title or Language"
                        value={searchValue}
                        onChange={handleSearchInputChange}/>
                </Box>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                maxWidth="1200px"
                margin="auto">
                {
                    filteredMovies
                        .slice(0, 4)
                        .map((movie, index) => (
                            <MovieItems
                                key={index}
                                title={movie.title}
                                releaseDate={movie.releaseDate}
                                postedUrl={movie.postedUrl}
                                description={movie.description}
                                language={movie.language}
                                id={movie._id}/>
                        ))
                }
            </Box>
            <Box display="flex" padding={5} justifyContent="center">
                <Link
                    to="/movies"
                    style={{
                        textDecoration: 'none'
                    }}>
                    <Button
                        variant="outlined"
                        sx={{
                            margin: 'auto',
                            color: 'white',
                            border: '2px solid white'
                        }}>
                       <b>View All Movies</b> 
                    </Button>
                </Link>
            </Box>
            <Box padding={5} margin="auto" textAlign="center" marginTop="50px">
                <hr/>
                <Typography variant="h4" marginTop={3}>
                    <b>Upcomming Release</b>
                </Typography>

            </Box>
            <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                maxWidth="1200px"
                height= "400px"
                margin="auto"
                // border={"3px solid white"}
                marginBottom={"50px"}>

                <UpCommingMovies/>

            </Box>

        </Box>
    </>
    );
};

export default Home;
