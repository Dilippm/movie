const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    phone: {
        type: Number,
        required: true,
        minLength: 10
    },
    image: {
        type: String,
        default: ''
    },
    Isapproved:{
        type:Boolean,
        default:false
    },
    movies:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Movie",
        }
    ],
    theatres:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Theatre",  
        }
    ],

    bookings: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Booking"
        }
    ]
});

module.exports = mongoose.model("Owner", ownerSchema);
