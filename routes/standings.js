var express = require('express');
var router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const isLoggedIn = require('../middleware/isLoggedIn')
const isLoggedOut = require('../middleware/isLoggedOut')
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://current-ufc-rankings.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Key': '07430a7a21mshc4688a3bcb7b790p19a96bjsn18ff70964c39',
    'X-RapidAPI-Host': 'current-ufc-rankings.p.rapidapi.com'
  }
};

router.get('/standings', isLoggedIn, (req, res, next) => {
  axios.request(options)
  .then((response) => {
    console.log(response.data);
    res.render('standings.hbs', {foundStandings: response.data})
  })
  .catch(err => console.error(err))
})

module.exports = router;