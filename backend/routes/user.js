const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const supabase = require('../supabaseConfig')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('users')
  .select()
  res.json(data);
})
);

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
  const uuid = uuidv4();
  const { data, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
    options: {
      data: {
        uuid: uuid,
      }
    }
  });
  const { DB_error } = await supabase
  .from('users')
  .insert({
    uuid: uuid,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    avatar: 'https://picsum.photos/200',
    background: 'https://picsum.photos/1000/300'
 })
})
);

router.get('/session', asyncHandler(async (req, res, next) => {
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

router.get('/:id', asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('id', req.params.id)
  res.json(data);
})
);

module.exports = router;
