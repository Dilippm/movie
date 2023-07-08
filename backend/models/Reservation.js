const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema({
    theatreName: {
      type: String,
      default: ''
    },
    movieName: {
        type: String,
        default: ''
    },
    
    Date: {
      type: String,
      default: ''
    },
    Time:{
        type:String,
        default:''
    },
    SeatsSelected: [
      String
    ],
    price: {
      type: String,
      default: ''
    }
  });
  module.exports = mongoose.model("Reservation", reservationSchema);