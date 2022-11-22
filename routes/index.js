var express = require('express');
var router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const isLoggedIn = require('../middleware/isLoggedIn')
const isLoggedOut = require('../middleware/isLoggedOut')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather' });
});

router.get('/signup', isLoggedOut, (req, res, next) => {
  res.render('signup.hbs')
})

router.post('/signup', isLoggedOut, (req, res, next) => {
  console.log(req.body)

  if(!req.body.email || !req.body.password) {
      res.send('sorry you forgot an email or password')
      return;
  }

  User.findOne({ email: req.body.email })
  .then(foundUser => {
      if(foundUser) {
          res.send('sorry user already exists')
          return;
      }

      return User.create({
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password),
          fullName: req.body.fullName
      })
  })

  .then(createdUser => {
      console.log("here's the new user", createdUser)
      res.redirect('/')
  })
  .catch(err => {
      console.log(err)
      res.send(err)
  })
})

router.get('/login', isLoggedOut, (req, res, next) => {
  res.render('login.hbs')
})

router.post('/login', isLoggedOut, (req, res, next) => {

  const { email, password } = req.body

  if(!email || !password) {
      res.render('login.hbs', { errorMessage: 'sorry you forgot email or password'})
      return;
  }

  User.findOne({ email: email })
      .then(foundUser => {

          if(!foundUser) {
              // res.send('sorry user does not exist')
              res.render('login.hbs', { errorMessage: 'sorry user does not exist' })
              return;
          }

          const isValidPassword = bcryptjs.compareSync(password, foundUser.password)

          if(!isValidPassword) {
              // res.send('sorry wrong password')
              res.render('login.hbs', { errorMessage: 'sorry wrong password' })
              return;
          }

          req.session.user = foundUser
          // res.send('logged in')
          res.render('index.hbs', foundUser)
      })
      .catch(err => {
          console.log(err)
          res.send(err)
      })
})

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy(() => {
      res.redirect('/');
  })
})


module.exports = router;
