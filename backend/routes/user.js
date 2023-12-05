const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const supabase = require('../supabaseConfig')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {title: 'Authenticate'});
});

router.post('/login', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  })
  res.json(data);
  req.token = data.session.access_token;
  //res.locals.currentUser = req.user;
  //next();
})
);

router.post('/signup', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });
  
})
);

module.exports = router;
