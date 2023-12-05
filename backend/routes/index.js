require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protected', asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) =>{
      if (err) {
        res.sendStatus(403);
      } else {
        /*res.json({
          message: 'Authorized',
          authData
        });*/
        res.status(200).json(authData);
      }
    })
  })
);

module.exports = router;
