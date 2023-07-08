const Bookings = require("../models/Bookings");
const Movie = require("../models/Movies")
const User =require("../models/User")

/**Book a movie */
const newBookings = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;
  
    let existingMovie;
    let existingUser;
    try {
      existingMovie = await Movie.findById(movie);
      existingUser = await User.findById(user);
    } catch (error) {
      return console.log(error);
    }
  
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
  
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
  
    let newBooking;
    try {
      newBooking = new Bookings({
        movie,
        date: new Date(`${date}`),
        
        seatNumber,
        user,
      });
  
      await newBooking.save();
  
      const userbooking = await User.findById(user).populate("bookings");
      userbooking.bookings.unshift(newBooking);
      await userbooking.save();
  
      const moviebooking = await Movie.findById(movie).populate("bookings");
      moviebooking.bookings.push(newBooking);
      await moviebooking.save();
    } catch (error) {
      return console.log(error);
    }
  
    if (!newBooking) {
      return res.status(500).json({ message: "Unable to make a booking" });
    }
  
    return res.status(200).json({ booking: newBooking });
  };

  /**get a booking by booking id */
  const getBookinById =async(req,res,next)=>{
    const id= req.params.id;
    let booking;
    try {
        booking= await Bookings.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!booking){
        return res.status(500).json({message:"unexpected error"})
    }
    return  res.status(200).json({booking})
  }
  const getspecificBookings=async(req,res,next)=>{
    try {
    const { date, theatre, movie, time } = req.query;
   
    const bookings = await Bookings.find({
      date: date,
      theater: theatre,
      movie: movie,
      time: time
    });
    
    const bookedSeats = bookings.flatMap(booking => booking.seatNumber);
    
    res.json({ bookedSeats });
  } catch (error) {
   
    
    res.status(500).json({ error: 'Failed to fetch specific bookings' });
  }

  }
  const getuserBookings = async (req, res, next) => {
    const userId = req.userId;
  
    try {
   
      const user = await User.findById(userId).populate("bookings").exec();

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const bookings = user.bookings;
   
      res.json({ bookings });
    } catch (error) {
     
      
      res.status(500).json({ message: "Server error" });
    }
  };
  /**cancel a ticket */
  const cancelBooking = async (req, res, next) => {
   
    const userId = req.userId;
  
    const bookingId = req.params; 

    try {
      const user = await User.findById(userId).populate("bookings").exec();
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const providedBookingId = bookingId.id;

     
      const booking = user.bookings.find((booking) => booking._id.toString() === providedBookingId);

if (!booking) {
  return res.status(404).json({ message: "Booking not found" });
}
const price = booking.amount;
user.wallet += +price;
await booking.deleteOne({_id:providedBookingId});
user.bookings.pull(providedBookingId);
    
      await user.save();
  
      res.status(200).json({ message: "Booking canceled successfully" });
    } catch (error) {
    
      
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
module.exports ={
    newBookings,
    getBookinById,
    getspecificBookings,
    getuserBookings,
    cancelBooking
}