const Owner = require("../models/Owner");
const Admin= require("../models/Admin")
const User =require("../models/User")
const Movie =require("../models/Movies")
const Theatre =require("../models/Theatre")
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const config = require('../config');
const jwtSecret = config.JWT_SECRET;
const mongoose = require('mongoose');
const BASE_URL =config.BASE_URL;
const fs = require('fs');
const path = require('path');
/*theater Owner Registration*/ 
const ownerRegister = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(422).json({ error: "Invalid inputs" });
  }
  const newPassword = bcrypt.hashSync(password);
  try {
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(409).json({ message: "Owner already exists" });
    }
    const owner = new Owner({ name, email, password: newPassword, phone });
  
    await owner.save();
    
 let admin = await Admin.findOne(); 
    admin.owners.push(owner); 
    admin = await admin.populate("owners");
    await admin.save();
    
    return res.status(200).json({ message: "Registered successfully", owner });
  } catch (error) {
   
    
    
    return res.status(500).json({ error: "Unexpected error occurred" });
  }
};

  /*To get all user details*/
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
/*theater Owner Login*/ 
const ownerLogin = async (req,res,next)=>{
    const {email, password} = req.body;
    if (!email && email.trim() === "" || !password && password.trim() === "" ) {
        return res.status(422).json({ error: "Invalid inputs" });
    }
    let owner;
    try {
        owner = await Owner.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if (!owner) {
        return res
            .status(404)
            .json({error: "owner doesn't exist!!"});
    }
    if(!owner.Isapproved){
      return res.status(400).json({error: "Sorry Your have been not aproved by admin"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, owner.password);
    if (!isPasswordCorrect) {
        return res
            .status(400)
            .json({error: "email or password wrong"})
    }
    const token = jwt.sign({id:owner._id},jwtSecret,{expiresIn:"1day"})
    
    return res
        .status(200)
        .json({message: "Login successfull",token,id:owner._id,name:owner.name,image:owner.image});

}
const getOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid owner ID' });
    }

    let owner = await Owner.findById(id);

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    return res.status(200).json({ message: 'Owner found successfully', owner });
  } catch (error) {
  
    
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
/** owner update */
const updateOwner = async (req, res, next) => {
  const { id } = req.params;

  const { name, email, phone } = JSON.parse(req.body.ownerdata);

  try {
    const updatedOwner = await Owner.findByIdAndUpdate(
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

    if (!updatedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    
    if (!updatedOwner.Isapproved) {
      return res.status(400).json({ error: "Sorry, you have not been approved by admin" });
    }

    return res.status(200).json({ message: "Updated successfully", owner: updatedOwner });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


  /**Get Movies */
  const getMovies=async(req,res,next)=>{
    const { id } = req.params;
    let owner = await Owner.findById(id);
    if(!owner){
      return res
            .status(500)
            .json({error: "Unexpected error occurred"});

    }
   
    let movies = await Movie.find();
    if(!movies){
      return res.status(500).json({error:"no movies found"})
    }
  
    return res.status(200).json({message:"movies found",movies})

  }
/**Get All theaters */
const getTheatres = async (req, res, next) => {

  const {id} =req.params
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(404).json({ message: 'Token not found' });
  }

  let ownerId;

  try {
    const decodedToken = jwt.verify(token.split(' ')[1], jwtSecret);
    ownerId = decodedToken.id;
  } catch (error) {
   
    
    return res.status(400).json({ message: error.message });
  }

  try {
    const owner = await Owner.findById(id).populate('theatres');


    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

   
    const ownerName = owner.name;
    const theaters = owner.theatres;

    res.status(200).json({ ownerName, theaters });
  } catch (error) {
    console.error('Failed to get theaters:', error);
    res.status(500).json({ message: 'Failed to get theaters' });
  }
};
/** GEt All Users */
const getAllUsers = async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const owner = await Owner.findById(ownerId)
      .populate({
        path: "bookings",
        populate: { path: "user" },
        options: {
          skip: (page - 1) * limit,
          limit: limit,
        },
      })
      .exec();

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const users = owner.bookings.map(booking => booking.user);
    
    const totalCount = await User.find().countDocuments();

    res.json({
      message: "Users found",
      users,
      totalUsers: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
  
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


  /**Add Theatre  */
  const addTheatre = async (req, res, next) => {
    const { name, seats, price, timings, movieName } = req.body;
    const ownerId = req.ownerId;
  
    try {
      const ownerUser = await Owner.findOne({ _id: ownerId });
  
      if (!ownerUser) {
        return res.status(404).json({ message: 'Invalid owner ID' });
      }
  
      const newTheatreData = {
        name,
        seats,
        price,
        movies: movieName,
        showTimings: timings.map((startTime) => ({ startTime }))
      };
  
      const newTheatre = new Theatre(newTheatreData);
      newTheatre.owner = ownerUser._id;
      const savedTheatre = await newTheatre.save();
      ownerUser.theatres.push(savedTheatre._id);
      await ownerUser.save();
  
      res.status(200).json({ message: 'Theatre added successfully' });
    } catch (error) {
      console.error('Failed to add theatre:', error);
      res.status(500).json({ message: 'Failed to add theatre' });
    }
  };
  
 /***Get A Theatre */
 const getSpecificTheatre = async (req, res, next) => {
  const ownerId = req.ownerId;
  const theatreId = req.params.id;

  try {
    const ownertheatre = await Owner.findOne({ _id: ownerId }).populate('theatres');

    if (!ownertheatre) {
      return res.status(404).json({ message: 'Invalid owner ID' });
    }

    const theatre = ownertheatre.theatres.find((theatre) => theatre._id.toString() === theatreId);
    if (!theatre) {
      return res.status(404).json({ message: 'Invalid theatre ID' });
    }

    return res.status(200).json({ message: 'Theatre found successfully', theatre });
  } catch (error) {
   
    
    return res.status(500).json({ message: 'Request failed' });
  }
};

  /**Update the thatre */


  const updateTheatre = async (req, res, next) => {
    const ownerId = req.ownerId;
    const theatreId = req.params.id;
    const updatedDetails = req.body;
  
    try {
      const ownertheatre = await Owner.findOne({ _id: ownerId }).populate('theatres');
  
      if (!ownertheatre) {
        return res.status(404).json({ message: 'Invalid owner ID' });
      }
  
      const theatre = ownertheatre.theatres.find((theatre) => theatre._id.toString() === theatreId);
  
      if (!theatre) {
        return res.status(404).json({ message: 'Invalid theatre ID' });
      }
  
      const updatedTheatre = await Theatre.findByIdAndUpdate(
        theatreId,
        {
          $set: {
            name: updatedDetails.name,
            seats: updatedDetails.seats,
            price: updatedDetails.price,
            movies: updatedDetails.movies,
            showTimings: updatedDetails.showTimings.map((timing) => ({
              _id: isValidObjectId(timing._id) ? new mongoose.Types.ObjectId(timing._id) : new mongoose.Types.ObjectId(),
              startTime: timing.startTime,
              owner: ownerId,
            })),
          },
        },
        { new: true }
      );
  
      if (!updatedTheatre) {
        return res.status(500).json({ message: 'Failed to update theatre' });
      }
  
      return res.status(200).json({ message: 'Theatre updated successfully', theatre: updatedTheatre });
    } catch (error) {
      return res.status(500).json({ message: 'Request failed' });
    }
  };
  

const isValidObjectId = (id) => {
  if (mongoose.isValidObjectId(id)) {
    return true;
  }
  return false;
};

/**GET REvenue reoprt fot eh movies booked by owner */
const getAllBookings = async(req,res,next)=>{
  try {
    const ownerId = req.ownerId;

    const owner = await Owner.findById(ownerId).populate("bookings");
    const bookings = owner.bookings;

  

   
    const totalRevenueByDate = bookings.reduce((acc, booking) => {
      const key = `${booking.movie}-${booking.theater}-${booking.date}`;
      if (acc.hasOwnProperty(key)) {
        acc[key] += +booking.amount; 
      } else {
        acc[key] = +booking.amount; 
      }
      return acc;
    }, {});



    res.status(200).json(totalRevenueByDate);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
  /***GET OwnerDashborad cards */
  const getRevenue = async (req, res, next) => {
    try {
      const ownerId = req.ownerId;
  
      const owner = await Owner.findById(ownerId).populate("bookings");
      const bookings = owner.bookings;
      let totalAmount = 0;
      bookings.forEach((booking) => {
        totalAmount += +booking.amount;
      });
      let total = totalAmount * (80 / 100);
      let users = await Owner.findById(ownerId);
  
      let totalTheaters = users.theatres.length;
      let totalBookings = users.bookings.length;
      res.json({ total, totalTheaters, totalBookings });
    } catch (error) {
   
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getRevenueChart = async(req,res,next)=>{
    try {
      const ownerId = req.ownerId;
  
      const owner = await Owner.findById(ownerId).populate("bookings");
  
      const bookings = owner.bookings;
  
      const dailyRevenue = {};
  
      bookings.forEach((booking) => {
        const date = booking.date;
        const amount = +booking.amount; 
        if (!isNaN(amount)) { 
          if (dailyRevenue[date]) {
            dailyRevenue[date] += amount;
          } else {
            dailyRevenue[date] = amount;
          }
        }
      });
      
      const dailyRevenueArray = Object.entries(dailyRevenue).map(([date, revenue]) => ({
        date,
        revenue,
      }));
      
     
      dailyRevenueArray.sort((a, b) => new Date(a.date) - new Date(b.date));
      
  
      
  
      res.json({ dailyRevenueArray });
    } catch (error) {
      
      
    }
  }
  const getTheaterChart = async(req,res,next)=>{
    const ownerId = req.ownerId;

    try {
      const owner = await Owner.findById(ownerId).populate("bookings");
  
      const bookings = owner.bookings;
  
      const theaterCollection = {};
      bookings.forEach((booking) => {
        const theater = booking.theater;
        const amount = booking.amount;
        if (theater && amount) {
          if (!theaterCollection[theater]) {
            theaterCollection[theater] = 0;
          }
          theaterCollection[theater] += +amount;
        }
      });
  
      const theaterCollectionArray = Object.entries(theaterCollection);
  
  
      return res.status(200).json({ theaterCollection: theaterCollectionArray });
    } catch (error) {
     
      
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  const getMovieChart =async(req,res,next)=>{
    const ownerId = req.ownerId;

    try {
      const owner = await Owner.findById(ownerId).populate("bookings");
  
      const bookings = owner.bookings;
  
      const movieCollection = {};
      bookings.forEach((booking) => {
        const movie = booking.movie;
        const amount = booking.amount;
        if (movie && amount) {
          if (!movieCollection[movie]) {
            movieCollection[movie] = 0;
          }
          movieCollection[movie] += +amount;
        }
      });
  
      const movieCollectionArray = Object.entries(movieCollection);
  
  
      return res.status(200).json({ movieCollection: movieCollectionArray });
    } catch (error) {
      
      
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  const getuserbookings = async(req,res,next)=>{
    const ownerId = req.ownerId;
    try {
      const owner = await Owner.findById(ownerId).populate({
        path: "bookings",
        populate: { path: "user" }
      });
  
      const bookings = owner.bookings;
    
      return res.status(200).json({ bookings });
    } catch (error) {
      
      
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

module.exports ={
    ownerRegister,
    getUsers,
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

    


}