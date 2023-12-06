require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
