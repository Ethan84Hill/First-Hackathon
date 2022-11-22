var express = require('express');
var router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const isLoggedIn = require('../middleware/isLoggedIn')
const isLoggedOut = require('../middleware/isLoggedOut')

router.get('/weather', (req, res, next) => {
    res.render('weather.hbs')
  })

module.exports = router;