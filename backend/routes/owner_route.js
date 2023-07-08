const express = require("express");
const {uploadOptions} = require("../multer/multer");
const {
    ownerRegister,

    ownerLogin,
    getOwner,
    updateOwner,
    getTheatres,
    addTheatre,
    getMovies,
    getSpecificTheatre,
    updateTheatre,
    getAllBookings,
    getRevenue,
    getRevenueChart,
    getTheaterChart,
    getMovieChart,
    getuserbookings,
    getAllUsers,
    getAllToChat
} = require("../controllers/owner_Controller");
const verifyOwnerToken = require("../Middlewares/OwnerMiddleware");

const ownerRoute = express.Router();

/*POST Routes*/
ownerRoute.post('/register', ownerRegister)
ownerRoute.post('/login', ownerLogin)
ownerRoute.post('/add_theatre', verifyOwnerToken, addTheatre)
ownerRoute.post('/updatetheatre/:id', verifyOwnerToken, updateTheatre)
/*PUT Routes*/
ownerRoute.post('/:id', uploadOptions.single("image"), updateOwner)
/*GET Routes*/
ownerRoute.get('/:id', getOwner)
ownerRoute.get('/movies/:id', getMovies)
ownerRoute.get('/theatre/:id', verifyOwnerToken,getTheatres)
ownerRoute.get("/users/:id", verifyOwnerToken,getAllUsers)
ownerRoute.get('/edittheatre/:id', verifyOwnerToken, getSpecificTheatre)
ownerRoute.get('/allbookings/:id', verifyOwnerToken, getAllBookings)
ownerRoute.get('/dashboardrevenue/:id', verifyOwnerToken, getRevenue)
ownerRoute.get('/dashboardchart/:id', verifyOwnerToken, getRevenueChart)
ownerRoute.get('/theaterchart/:id', verifyOwnerToken, getTheaterChart)
ownerRoute.get('/movieschart/:id', verifyOwnerToken, getMovieChart)
ownerRoute.get('/alluserbookings/:id', verifyOwnerToken,getuserbookings)

module.exports = ownerRoute;