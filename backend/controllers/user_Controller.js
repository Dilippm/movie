const User = require("../models/User");
const Admin =require("../models/Admin")
const Theatre =require("../models/Theatre");
const Reservation =require('../models/Reservation')
const Movie=  require("../models/Movies");
const Booking = require("../models/Bookings")
const Owner =require("../models/Owner")
const Banner = require("../models/Banner")
const bcrypt = require("bcryptjs");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const BASE_URL =config.BASE_URL;
const Token= require("../models/Token");
const sendEmail = require("../utils/sendEmail");
const crypto =require("crypto")
const fs = require('fs');
const path = require('path');
/* all user details*/
const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return next(error);
    }
    if (!users) {
        return res
            .status(500)
            .json({error: "Unexpected error occurred"});
    }
    return res
        .status(200)
        .json({users});
};
/**Get Theater Details */
const getTheaterDetails =async(req,res,next)=>{
try {
  const theatre = await Theatre.find();
      
  if (!theatre || theatre.length === 0) {
    return res.status(400).json({ message: 'No theatres found' });
  }
  

  
  res.status(200).json({ message: 'Theatres found', theatre });
} catch (error) {
  
  res.status(500).json({ error: 'Failed to fetch theatres' });
}

}
const getcomments = async(req,res,next)=>{
 
  const id = req.params.id;
 
  try {
    const theatre = await Theatre.find({_id:id});

    if (!theatre || theatre.length === 0) {
      return res.status(400).json({ message: 'No theatres found' });
    }
  
   
    res.status(200).json({ message: 'Theatres found', theatre });
  } catch (error) {
  
    res.status(500).json({ error: 'Failed to fetch theatres' });
  }
}
/*User signup*/
const userRegister = async (req, res, next) => {

    const {name, email, password, phone} = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "" && !phone && phone.trim() === "") {
        return res
            .status(422)
            .json({error:"invalid inputs"});
    }
    const newPassword = bcrypt.hashSync(password);
    let user;
    try {
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(409).json({ error: "Owner already exists" });
          }
        user = new User({name, email, password: newPassword, phone});
        user = await user.save();

        
        let admin = await Admin.findOne();
        admin.users.push(user);
        admin = await admin.populate("users");
        await admin.save();
        const token= await new Token({
          userId: user._id,
          token:crypto.randomBytes(32).toString("hex")

        }).save();
        const url = `${process.env.BASE_URL}${user._id}/verify/${token.token}`;
        await sendEmail(user.email,"Verify Email",url);

    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res
            .status(500)
            .json({error:"unexpeted error occured"})
    }
    return res
        .status(200)
        .json({message: "Please verify email send to your account ", id:user._id});

}
/**User verification */
const getVerified =async(req,res,next)=>{
  try {
 
    const user = await User.findOne({_id:req.params.id})
    if(!user) return res.status(400).send({message:"invalid link"});
    const token =await Token.findOne({
      userId:user._id,
      token:req.params.token
    })

    if(!token) return res.status(400).send({message:"invalid link"});
    await User.updateOne({_id:user._id},{$set:{verified:true}});
    await token.deleteOne({_id:token._id});
    return res.status(200).send({message:"Email Verfied Successfully"});
  } catch (error) {
  
    res.status(500).send({message:"Internal Server Error"});
  }
}
/**user googlelogin */

const userGooleLogin = async (req, res) => {
    const { name, email, password, image } = req.body.user;


    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const token = jwt.sign({id:existingUser._id},jwtSecret,{expiresIn:"1d"})
            return res
                .status(200)
                .json({message: "Login successfull", existingUser,token});
        }
        
  
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User({ name, email, password: hashedPassword, image });
      
      await user.save();
  
      let admin = await Admin.findOne();
      admin.users.push(user);
      admin = await admin.populate("users");
      await admin.save();
      const token = jwt.sign({id:user._id},jwtSecret,{expiresIn:"1d"})
    return res
        .status(200)
        .json({message: "Login successfull",id: user._id,token});
    } catch (error) {
     

      return res.status(500).json({ error: "Unexpected error occurred" });
    }
  };
/*user Login*/
const userLogin = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
        return res.status(422).json({error:"Invalid inputs"});
      }
      
    let user;
    try {
        user = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (!user) {
        return res
            .status(404)
            .json({error: "user doesn't exist!!"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({error: "email or password wrong"})
    }
    if(!user.status){
        return res
        .status(400)
        .json({error: "Sorry! blocked by Admin..."})
    }
   if(!user.verified){
    let token = await Token.findOne({userId:user._id});
    if(!token){
      const token= await new Token({
        userId: user._id,
        token:crypto.randomBytes(32).toString("hex")

      }).save();
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      await sendEmail(user.email,"Verify Email",url);
    }
    return res.status(400).send({message:"An Email sent to ypur acccount please verify"});

   }
    
    const token = jwt.sign({id:user._id},jwtSecret,{expiresIn:"1day"})
    return res
        .status(200)
        .json({message: "Login successfull",user,token});
}

/** user update */
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = JSON.parse(req.body.userdata);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          phone,
          ...(req.file && { image: `${BASE_URL}/${req.file.filename}` }),
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


/**get user booking using userid */
const getBookingsofUser =async(req,res,next)=>{
    const id= req.params.id;
    let bookings;
    try {
        bookings=  await Booking.find({user:id})
    } catch (error) {
        return console.log(error);
    }
    if(!bookings){
        return res.status(500).json({message:"unable to find bookings "});

    }
    return res.status(200).json({bookings})
}
/**get specific booking */
const getSpecificBookingsofUser= async(req,res,next)=>{
  const id = req.params.id;
  let bookings
  try {
    bookings = await Booking.find({ _id: new mongoose.Types.ObjectId(id) });
  } catch (error) {
    return console.log(error);
  }
  if(!bookings){
    return res.status(500).json({message:"unable to find bookings "});

}
return res.status(200).json({bookings})
  
}

const getUser= async(req,res,next)=>{
    const {id} = req.params;
    try {
        let user = await User.findById(id);
       
        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"});
        }
       
        return res
        .status(200)
        .json({message: "user found successfully", user});

    } catch (error) {
     
        return res
            .status(500)
            .json({message: "Something went wrong"});
        
    }
}
/**Get the theaters movie palying */
const getTheatre = async (req, res) => {
    try {
      const { id } = req.params;
      
      const movie = await Movie.findOne({ _id: id });
      
      const theatre = await Theatre.find({ movies: movie.title });
      
      if (!theatre || theatre.length === 0) {
        return res.status(400).json({ message: 'No theatres found' });
      }
      
      const theatreData = theatre.map(({ _id, name }) => ({ id: _id, name }));
      
      res.status(200).json({ message: 'Theatres found', theatreData });
    } catch (error) {
      console.error('Failed to fetch theatres:', error);
      res.status(500).json({ error: 'Failed to fetch theatres' });
    }
  };
  
  const TheatreDetail = async (req, res, next) => {
    try {
      const {id} = req.params;
    
      const theatre = await Theatre.findOne({ _id: id });
      if (!theatre) {
        return res.status(404).json({ message: 'Theatre not found' });
      }
    
      res.json(theatre);
    } catch (error) {
      console.error('Failed to fetch theatre details:', error);
      next(error);
    }
  };
  /**user reservation */
  const userReservation =async(req,res,next)=>{
    
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const { theatreName, movieName, Time, Date, seatsSelected, price } = req.body;
      const existingReservation = await Reservation.findOne({
        theatreName,
        movieName,
        Time,
        Date,
        SeatsSelected: { $in: seatsSelected },
      });
  
      if (existingReservation) {
        return res.status(400).json({ error: 'Sorry Seats are already reserved' });
      }
  
      const reservationData = new Reservation({
        theatreName,
        movieName,
        Time,
        Date,
        SeatsSelected: seatsSelected,
        price,
      });
  
      await reservationData.save();
  
      user.reservation.push(reservationData);
      await user.save();
  
      res.json({ message: 'Reservation stored successfully.', reservationData });
    } catch (error) {
   
      return res.status(400).json({ message: error.message });
    }

  }
  /**block the seats */
  const reservedSeats = async (req, res, next) => {
    try {
      const { movie, theatre, date, time } = req.query;
      
  
      const seats = await Reservation.find({
        movieName: movie,
        theatreName: theatre,
        Date: date,
        Time: time,
      }).select("SeatsSelected");
  
      const reservedSeats = seats.map((reservation) => reservation.SeatsSelected);
   
  
      res.json({ reservedSeats });
    } catch (error) {
     
      res.status(500).json({ error: "Failed to fetch reserved seats" });
    }
  };
  /**booking page */
  const showBooking = async(req,res,next)=>{
    
    try {
      const id = req.params.id;
      const userId = req.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  const wallet = user.wallet

      const reservation = user.reservation.id(id);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      res.status(200).json({ reservation,wallet });
    } catch (error) {
     
      return res.status(400).json({ message: error.message });
    }
  };

  
  /**saving the booing data to user admin and owner */
  const userBooking = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const {
        theatreName,
        movieName,
        Date,
        Time,
        SeatsSelected,
        price,
        _id,
      } = req.body.bookingDetails;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const existingBooking = await Booking.findOne({
        theater: theatreName,
        movie: movieName,
        date: Date,
        time: Time,
        seatNumber: SeatsSelected,
        user: user._id,
      });
  
      if (existingBooking) {
        return res.status(400).json({ message: 'Booking with same details already exists.' });
      }
  
      const payment = new Booking({
        theater: theatreName,
        movie: movieName,
        date: Date,
        time: Time,
        seatNumber: SeatsSelected,
        amount:price,
        user: user._id,
      });
  
      const savedBooking = await payment.save();
  
      user.bookings.push(savedBooking._id);
      await user.save();
  
      const admin = await Admin.findOne();
      admin.bookings.push(savedBooking._id);
      await admin.save();
  
      const theatre = await Theatre.find({ name: theatreName }).populate('owner');
      const ownerId = theatre[0].owner._id;
  
      const owner = await Owner.findById(ownerId);
      owner.bookings.push(savedBooking._id);
      await owner.save();
  
    
      await Reservation.deleteOne({ _id });
  
      res.status(200).json({ message: 'Booking saved successfully.' });
    } catch (error) {
      console.error('Error saving booking details:', error);
      res.status(500).json({ error: 'Error saving booking details.' });
    }
  };
  
  const getUserBanner = async (req, res, next) => {
    try {
     
      const id = req.body.params
      const response = await Banner.find();
      
      
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch banners' });
    }
  };
  /**Wallet Booking */
  const walletBooking = async (req, res, next) => {
    const userId = req.userId;
    const reservationId = req.params.id;
  
    try {
   
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
  
      
      const reservation = await Reservation.findOne({ _id: reservationId });
    

      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      const existingBooking = await Booking.findOne({
        theater: reservation.theatreName,
        movie: reservation.movieName,
        date:reservation.Date,
        time: reservation.Time,
        seatNumber: reservation.SeatsSelected,
       
      });
  
      if (existingBooking) {
        return res.status(400).json({ message: 'Booking with same details already exists.' });
      }
      const payment = new Booking({
        theater:reservation.theatreName,
        movie:reservation. movieName,
        date: reservation.Date,
        time:reservation.Time,
        seatNumber: reservation.SeatsSelected,
        amount:reservation.price,
        user: user._id,
      });
      if (user.wallet < reservation.price || user.wallet <= 0) {
        return res.status(400).json({ message: "Insufficient funds in the wallet" });
      }
      
      const savedBooking = await payment.save();
  
      user.bookings.push(savedBooking._id);
      user.wallet = user.wallet - reservation.price;
      await user.save();
  
      const admin = await Admin.findOne();
      admin.bookings.push(savedBooking._id);
      await admin.save();
  
      const theatre = await Theatre.find({ name: reservation.theatreName }).populate('owner');
      const ownerId = theatre[0].owner._id;
  
      const owner = await Owner.findById(ownerId);
      owner.bookings.push(savedBooking._id);
      await owner.save();
  
    
      await Reservation.deleteOne({ reservationId });
  
      res.status(200).json({ message: 'Booking saved successfully.', savedBooking});
  
    } catch (error) {
   
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  /** theater Rating add */
 

  const theaterRating = async (req, res, next) => {
    try {
      const userId = req.userId;
      const theaterId = req.params.id;
      const comment = req.body.comment;
      const rating = req.body.rating;
      const file = req.file; 
  
      const theater = await Theatre.findById(theaterId);
      if (!theater) {
        return res.status(404).json({ message: 'Theater not found' });
      }
   
    const booking = await Booking.findOne({ user: userId, theater: theater.name });
    if (!booking) {
      return res.status(400).json({ message: 'You must have a booking for this theater to submit a rating' });
    }
      const existingRating = theater.ratings.find((rating) => rating.user.toString() === userId);
      if (existingRating) {
        return res.status(400).json({ message: 'You have already submitted a rating for this theater' });
      }
      const ratingData = {
        user: userId,
        comment: comment,
        rating: rating
      };
  
     
      if (file) {
        const imageUrl = `${BASE_URL}/${file.filename}`;
        ratingData.image = imageUrl;
      }
  
      theater.ratings.push(ratingData);
  
      const totalRatings = theater.ratings.length * 5;
      
      
      const sumRatings = theater.ratings.reduce((sum, rating) => sum + rating.rating, 0);
     
      
      theater.totalRating = (sumRatings / totalRatings) * 5;
      
  
      await theater.save();
  
      res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (error) {
     
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
module.exports = {
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
    
};