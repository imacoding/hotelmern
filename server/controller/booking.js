const Booking = require('../model/booking');
const Rental = require('../model/rental');
const User = require('../model/user');
const { normalizeErrors } = require('../helper/mongoose');
const moment = require('moment');

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({ startAt, endAt, totalPrice, guests, days});

Rental.findById(rental._id)
  .populate('bookings')
  .populate('user')
  .then(foundRental => {
    if (foundRental.user.id === user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
    }

    if (isValidBooking(booking, foundRental)) {
      booking.user = user;
      booking.rental = foundRental;
      foundRental.bookings.push(booking);

      booking.save().then(() => {
        foundRental.save()
        User.updateOne({_id: user.id}, {$push: {bookings: booking}}, function(){});

        return res.json({startAt: booking.startAt, endAt: booking.endAt});
      }).catch(err => {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      });
    } else {
       return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
    }
  })
  .catch(err => {
    return res.status(422).send({errors: normalizeErrors(err.errors)});
  });

}

exports.getUserBookings = function(req, res) {
  const user = res.locals.user;

    Booking
  .find({ user })
  .populate('rental')
  .then(foundBookings => {
    return res.json(foundBookings);
  })
  .catch(err => {
    return res.status(422).send({errors: normalizeErrors(err.errors)});
  });
}



function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {

    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
  }

  return isValid;
}