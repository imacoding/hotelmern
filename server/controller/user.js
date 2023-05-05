const User = require('../model/user');
const mongooseHelper = require('../helper/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwtSecret = process.env.JWT_SECRET;

exports.auth = function(req, res) {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(422).send({ errors: [{ title: 'Invalid user!', detail: 'User does not exist' }] });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const token = jwt.sign(
              {
                userId: user.id,
                username: user.username
              },
             '3894378536',
              { expiresIn: '1hr' }
            );
            console.log('Token:', token);
            return res.json(token);
          } else {
            console.log('Wrong email or password');
            return res.status(422).send({ errors: [{ title: 'Wrong data!', detail: 'Wrong email or password' }] });
          }
        })
        .catch(err => {
          console.log('Server error:', err);
          return res.status(500).send({ errors: [{ title: 'Server Error', detail: 'Something went wrong. Please try again later.' }] });
        });
    })
    .catch(err => {
      console.log('Error:', err);
      return res.status(422).send({ errors: mongooseHelper.normalizeErrors(err.errors) });
    });
};




exports.register = function(req, res){
    const { username, email, password, passwordConfirmation } = req.body;

    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({errors: [{title: 'Invalid Password', detail: 'Password is not same as confimation password!'}]});
    }

 User.findOne({email})
    .then(existingUser => {
        if(existingUser){
            return res.status(422).send({errors: [{title: 'Invalid email', detail: 'User with this email already exists!'}]});
        }

        const user = new User({
            username,
            email,
            password
        });

        return user.save();
    })
    .then(() => {
        return res.json({'Registered':true});
    })
    .catch(err => {
        return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
    });

    
}


exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    

    if(token){
        const user = parseToken(token);
    User.findById(user.userId)
    .then(user => {
        if (!user) {
            return notAuthorized(res);
        }
        res.locals.user = user;
        next();
    })
    .catch(err => {
        return res.status(422).send({ errors: mongooseHelper.normalizeErrors(err.errors) });
    });
    } else {
        return notAuthorized(res);
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1], '3894378536');
}

function notAuthorized(res){
    return res.status(401).send({errors: [{title: 'Not authorized', detail: 'You need to login to get access!'}]});
}