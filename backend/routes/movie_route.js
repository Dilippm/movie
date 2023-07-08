const express = require("express");
const { uploadOptions } = require("../multer/multer");
const { addMovie,
    getMovies,
    getUpCommingMovies,
    getMovieById,
    updateMovieById,
    getUserMovie,
    getMoviesByLanguage,
    getMovieLanguages
   } =require("../controllers/movie_Controller");

const movieRoute = express.Router();

/*POST* */
movieRoute.post('/addmovie',addMovie)

/** GET Routes */
movieRoute.get('/movies',getMovies)
movieRoute.get('/allupcommingmovies',getUpCommingMovies)
movieRoute.get('/editmovie/:id',getMovieById)
movieRoute.get('/usermovie/:id',getUserMovie)
movieRoute.get('/moviesbylan',getMoviesByLanguage)
movieRoute.get('/movieslan',getMovieLanguages)
/** PUT Routes */
movieRoute.post('/editedmovies/:id',uploadOptions.single("image"), updateMovieById);


module.exports =movieRoute;