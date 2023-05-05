const express = require('express');
const router = express.Router();
const Rental = require('../model/rental');
const { normalizeErrors } = require('../helper/mongoose');
const User = require('../model/user');

const UserController = require('../controller/user');

router.get('/secret', UserController.authMiddleware, function (req, res) {
    res.json({ "secret": true });
})

router.get('', function (req, res) {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {}

    Rental.find(query)
  .select('-bookings')
  .then(foundRentals => {
    if (city && foundRentals.length === 0) {
      return res.status(422).send({ errors: [{ title: 'No Rentals Found!', detail: `There are no rentals for city ${city}` }] });
    }
    return res.json(foundRentals);
  })
  .catch(err => {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  });




});

router.post('', UserController.authMiddleware, function (req, res) {
    const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
    const user = res.locals.user;

    const rental = new Rental({ title, city, street, category, image, shared, bedrooms, description, dailyRate });
    rental.user = user;
 Rental.create(rental)
    .then(newRental => {
        User.updateOne({ _id: user.id }, { $push: { rentals: newRental } });
        return res.json(newRental);
    })
    .catch(err => {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
    });
})

router.get('/manage', UserController.authMiddleware, function(req, res){
    const user = res.locals.user;

    Rental.find({ user })
  .populate('bookings')
  .then((foundRentals) => {
    return res.json(foundRentals);
  })
  .catch((err) => {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  });

})

router.delete('/:id', UserController.authMiddleware, function (req, res) {
    const user = res.locals.user;

   Rental.findById(req.params.id)
.populate('user', '_id')
.populate({
path: 'bookings',
select: 'startAt',
match: { startAt: { $gt: new Date() } }
})
.then(foundRental => {
if (user.id !== foundRental.user.id) {
return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not rental owner!' }] });
}

php

  if (foundRental.bookings.length > 0) {
      return res.status(422).send({ errors: [{ title: 'Active Bookings!', detail: 'Cannot delete rentals with active bookings!' }] });
  }

  foundRental.remove()
      .then(() => res.json({ 'status': 'deleted!' }))
      .catch(err => res.status(422).send({ errors: normalizeErrors(err.errors) }));

})
.catch(err => res.status(422).send({ errors: normalizeErrors(err.errors) }));
});

router.get('/:id', function (req, res) {
    const rentalId = req.params.id;

Rental.findById(rentalId)
  .select('-__v') // exclude the __v field from the result
  .populate({
    path: 'user',
    select: '-__v -password' // exclude the __v and password fields from the user object
  })
  .populate({
    path: 'bookings',
    select: '-__v -rental' // exclude the __v and rental fields from the bookings objects
  })
  .then(foundRental => {
    if (!foundRental) {
      return res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] });
    }
    return res.json(foundRental);
  })
  .catch(err => {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  });




});

module.exports = router;
