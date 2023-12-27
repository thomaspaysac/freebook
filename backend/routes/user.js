const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const supabase = require('../supabaseConfig')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });


/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('users')
  .select()
  res.json(data);
}));

// POST Signup
router.post('/signup', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });
  const { DB_error } = await supabase
  .from('users')
  .insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    avatar: 'https://picsum.photos/200',
    background: 'https://picsum.photos/1000/300'
 })
}));

// POST Login
router.post('/login', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  })
  res.json(data);
  req.token = data.session.access_token;
}));

// GET log out
router.get('/logout', asyncHandler(async (req, res, next) => {
  const { error } = await supabase.auth.signOut();
  res.end();
}))


// GET user session
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
}));

// GET check friend status
router.get('/friends/check/:friend_id', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('friends')
  .select('accepted')
  .or(`and(user_ID.eq.${req.headers.authorization},friend_ID.eq.${req.params.friend_id}), and(user_ID.eq.${req.params.friend_id},friend_ID.eq.${req.headers.authorization})`)
  res.json(data);
}));

// POST friend request
router.post('/friends/add', asyncHandler(async (req, res, next) => {
  const { error } = await supabase
  .from('friends')
  .insert({ 
    user_ID: req.body.user_ID,
    friend_ID: req.body.friend_ID,
   })
}));

// GET pending friends requests
router.get('/friends/:id/pending', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('friends')
  .select('id, user_ID(id, uuid, first_name, last_name, avatar), friend_ID(id, uuid, first_name, last_name, avatar)')
  .or(`user_ID.eq.${req.params.id}, friend_ID.eq.${req.params.id}`)
  .eq('accepted', false)
  res.json(data);
}));


// PATCH accept friend request
router.patch('/friends/request/:id', asyncHandler(async (req, res, next) => {
  // Accept request
  const { error } = await supabase
  .from('friends')
  .update({ accepted: true })
  .eq('id', req.params.id);
}));


// DELETE rejected friend request
router.delete('/friends/request/:id', asyncHandler(async (req, res, next) => {
  const { error } = await supabase
  .from('friends')
  .delete()
  .eq('id', req.params.id)
}))


// GET friends list
router.get('/friends/:id', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('friends')
  .select('user_ID(uuid, id, first_name, last_name, avatar), friend_ID(uuid, id, first_name, last_name, avatar)')
  .or(`user_ID.eq.${req.params.id}, friend_ID.eq.${req.params.id}`)
  .eq('accepted', true)
  res.json(data);
}));


// GET user info from ID
router.get('/:id', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('id', req.params.id)
  res.json(data);
}));

// GET user info from uuid
router.get('/uuid/:uuid', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('uuid', req.params.uuid)
  res.json(data);
}));

// PATCH change avatar
router.patch('/avatar', upload.single('avatar'), asyncHandler(async (req, res, next) => {
  const fileContent = await fs.promises.readFile(req.file.path);
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .upload(req.file.filename, fileContent, {
    cacheControl: '3600',
    upsert: false,
    contentType: req.file.mimetype,
  });
  const { data: avatarUrl } = supabase
  .storage
  .from('avatars')
  .getPublicUrl(req.file.filename);
  const { error: userUpdateError } = await supabase
  .from('users')
  .update({ avatar: avatarUrl.publicUrl })
  .eq('uuid', req.body.auth);
}));

// PATCH change background picture
router.patch('/background', upload.single('background'), asyncHandler(async (req, res, next) => {
  const fileContent = await fs.promises.readFile(req.file.path);
  const { data, error } = await supabase
  .storage
  .from('users/background_pictures')
  .upload(req.file.filename, fileContent, {
    cacheControl: '3600',
    upsert: false,
    contentType: req.file.mimetype,
  });
  const { data: imageUrl } = supabase
  .storage
  .from('users/background_pictures')
  .getPublicUrl(req.file.filename);
  const { error: userUpdateError } = await supabase
  .from('users')
  .update({ background: imageUrl.publicUrl })
  .eq('uuid', req.body.auth);
}));


module.exports = router;