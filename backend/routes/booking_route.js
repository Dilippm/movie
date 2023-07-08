const express = require("express");
const {verifyToken} = require('../Middlewares/UserMiddleware')
const bookingRouter = express.Router();
const {
    newBookings, 
    getBookinById, getspecificBookings,getuserBookings,cancelBooking} = require( "../controllers/booking_Controller")

/**POST ROUTES */
bookingRouter.post("/addbooking", newBookings);
/**GET ROUTES */
bookingRouter.get("/bookings/:id", getBookinById);
bookingRouter.get("/reservedseats/:id",getspecificBookings)
bookingRouter.get("/userbookings",verifyToken,getuserBookings)
/**DELETE ROUTES */
bookingRouter.delete('/cancelbooking/:id',verifyToken,cancelBooking)
module.exports = bookingRouter;
