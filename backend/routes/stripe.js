const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const CLIENT_URL = require('../config');
const CLIENT = CLIENT_URL.CLIENT_URL;
require('dotenv').config();
const User = require('../models/User');
const Booking = require('../models/Bookings');
const stripe = Stripe(process.env.SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const id = req.body.id;

  let user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const { theatreName, movieName, Date, Time, SeatsSelected, price, _id } =
    req.body.reservationDetails;
  let reservationId = _id;

  const line_items = [
    {
      price_data: {
        currency: 'Inr',
        product_data: {
          name: theatreName,
          description: `${movieName} - ${SeatsSelected} - ${Date} - ${Time}`,
        },
        unit_amount: price * 100,
      },
      quantity: 1,
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${CLIENT}/checkout-success?reservationId=${encodeURIComponent(reservationId)}`,
      cancel_url: `${CLIENT}/movies`,
    });

  

    res.send({ url: session.url });
  } catch (error) {
    console.error('Stripe request error:', error);
    res.status(500).send({ error: 'Stripe request error' });
  }
});

module.exports = router;
