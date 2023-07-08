const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    theater: {
      type: String,
      required: true
    },
    movie: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    seatNumber: [String],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Booking", bookingSchema);
