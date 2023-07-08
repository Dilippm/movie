const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  
    title:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,

    },
    releaseDate:{
        type:Date,
        
    },
    postedUrl:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true
    },
    bookings:[{type:mongoose.Types.ObjectId,
    ref:"Booking"}],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin"
    }

})
module.exports = mongoose.model("Movie",movieSchema)