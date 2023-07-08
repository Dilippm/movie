const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
        minLength: 10
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: ''
    },
    verified:{
        type:Boolean,
        default:false
    },
    wallet:{
        type:Number,
        default:0
    },
    reservation: [
        {
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
        }
    ],
    bookings: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Booking"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);

