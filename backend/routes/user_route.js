const express = require("express");
const {
    getUsers,
    getTheaterDetails,
    userRegister,
    updateUser,
    userLogin,
   
    getBookingsofUser,
    userGooleLogin,
    getUser,
    getTheatre,
    TheatreDetail,
    userReservation,
    reservedSeats,
    showBooking,
    userBooking,
    getUserBanner,
    walletBooking,
    getSpecificBookingsofUser,
    getVerified,
    theaterRating,
    getcomments
} = require("../controllers/user_Controller");
const {verifyToken} = require("../Middlewares/UserMiddleware")
const {uploadOptions} = require("../multer/multer");

const userRouter = express.Router();

/**GET ROUTES */

userRouter.get("/", getUsers);
userRouter.get('/gettheaterdetails',getTheaterDetails)

userRouter.get('/ratings/:id',getcomments)
userRouter.get("/:id/verify/:token",getVerified)
userRouter.get("/booking/:id", getBookingsofUser);
userRouter.get("/specificbooking/:id", getSpecificBookingsofUser);
userRouter.get('/:id', getUser);
userRouter.get('/movie/:id', getTheatre);
userRouter.get('/theatres/:id', TheatreDetail);
userRouter.get('/reservedseats/:id', reservedSeats)
userRouter.get('/reservations/:id', verifyToken, showBooking)
userRouter.get('/userbanner/:id', getUserBanner)

/**POST ROUTES */

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.post('/google_login', userGooleLogin)
userRouter.post('/reservation', verifyToken, userReservation);
userRouter.post('/userbooking/:id', userBooking);
userRouter.post('/:id', uploadOptions.single("image"), updateUser);
userRouter.post('/walletpay/:id',verifyToken,walletBooking);
userRouter.post('/submit-rating/:id',verifyToken,uploadOptions.single("image"),theaterRating)
module.exports = userRouter;
