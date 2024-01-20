const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const supabase = require('../supabaseConfig')
const supabaseAdmin = require('../supabaseAdmin')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const { body, validationResult } = require("express-validator");

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


// GET users listing
router.get('/', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('users')
  .select()
  res.json(data);
}));

// POST Signup
router.post('/signup', [
  body('first_name', 'First name must contain between 2 and 20 characters')
  .trim()
  .isLength({ min: 2, max: 20 })
  .escape()
  .unescape("&#39;", "'"),
  body('last_name', 'Last name must contain between 2 and 20 characters')
  .trim()
  .isLength({ min: 2, max: 20 })
  .escape()
  .unescape("&#39;", "'"),
  body('email', 'Email must be in format name@domain.extension')
  .isEmail()
  .custom(async (value) => {
    const { data: email, error } = await supabase
    .from('users')
    .select()
    .eq('email', value)
    if (email.length) {
      throw new Error('This email is already in use')
    }
  }),
  body('password', 'Password must contain at least 5 characters')
  .trim()
  .isLength({ min: 5 })
  .escape(),
  body('password_confirm')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Password confirm doesn\'t match')
      } else {
        return true;
      };
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({status: 400, errors: errors.array()});
      return;
    }
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
      avatar: "https://rwnwymmplzlurrocvwaa.supabase.co/storage/v1/object/sign/website/user.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlL3VzZXIucG5nIiwiaWF0IjoxNzA0OTE4MDE1LCJleHAiOjIwMjAyNzgwMTV9.93LKOmrXcX7DK2B00oM9VNhuw1Fb5LGeETEVD52bO60&t=2024-01-10T20%3A22%3A09.093Z",
      background: "https://rwnwymmplzlurrocvwaa.supabase.co/storage/v1/object/sign/website/background.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlL2JhY2tncm91bmQuanBnIiwiaWF0IjoxNzA0OTE3ODgwLCJleHAiOjIwMjAyNzc4ODB9.HdJwWIobb5Coh2Fo-IzYC78Rmayqm2kbSdEUolXZDH8&t=2024-01-10T20%3A19%3A54.526Z",
    });
    res.json({status: 200, data: data});
  })
]);

// POST Login
router.post('/login', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });
  if (error) {
    res.json({status: 400, error: error});
  }
  res.json({status : 200, data: data});
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
  if (error) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
}));


// DELETE rejected friend request
router.delete('/friends/request/:id', asyncHandler(async (req, res, next) => {
  const { error } = await supabase
  .from('friends')
  .delete()
  .eq('id', req.params.id);
  if (error) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
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

// DELETE friend
router.delete('/friends/:friend_id/delete', asyncHandler(async (req, res, next) => {
  // Find friend object
  const { data: friendObject, error: objectError } = await supabase
  .from('friends')
  .select('id')
  .or(`and(user_ID.eq.${req.headers.authorization},friend_ID.eq.${req.params.friend_id}), and(user_ID.eq.${req.params.friend_id},friend_ID.eq.${req.headers.authorization})`)
  const objectID = friendObject[0].id;
  // Delete object
  const { error } = await supabase
  .from('friends')
  .delete()
  .eq('id', objectID);
  res.end();
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
  if (req.token !== req.headers.token || req.body.auth !== req.user.id) {
    res.sendStatus(403);
  } 
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
  if (req.token !== req.headers.token || req.body.auth !== req.user.id) {
    res.sendStatus(403);
  } 
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

// PATCH change user names
router.patch('/:uuid/update', [
  body('first_name', 'First name must contain between 2 and 20 characters')
  .trim()
  .isLength({ min: 2, max: 20 })
  .escape()
  .unescape("&#39;", "'"),
  body('last_name', 'Last name must contain between 2 and 20 characters')
  .trim()
  .isLength({ min: 2, max: 20 })
  .escape()
  .unescape("&#39;", "'"),

  asyncHandler(async (req, res, next) => {
    if (req.headers.authorization !== req.user.id) {
      res.sendStatus(403);
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({status: 400, errors: errors.array()});
      return;
    }
    const { error } = await supabase
    .from('users')
    .update({ first_name: req.body.first_name, last_name: req.body.last_name })
    .eq('uuid', req.headers.authorization)
    if (error) {
      res.json({ status: 500 });
    } else {
      res.json({ status: 200 });
    }
  })
]);

// DELETE user account
router.delete('/:uuid/delete', asyncHandler(async (req, res, next) => {
  if (req.token !== req.headers.token || req.params.uuid !== req.user.id) {
    res.sendStatus(403);
    return;
  } else {
    try {
      // DELETE likes
      const { error: likesError } = await supabase
      .from('likes')
      .delete()
      .eq('author', req.params.uuid);
      // DELETE comments
      const { error: commentsError } = await supabase
      .from('comments')
      .delete()
      .eq('author', req.params.uuid);
      // DELETE posts
      const { error: postsError } = await supabase
      .from('posts')
      .delete()
      .eq('author', req.params.uuid);
      // DELETE friends
      const { error: friendsError } = await supabase
      .from('friends')
      .delete()
      .or(`user_ID.eq.${req.params.uuid}, friend_ID.eq.${req.params.uuid}`);
      // DELETE user
      const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('uuid', req.params.uuid);
      // DELETE auth account
      const { data, error: adminError } = await supabaseAdmin.auth.admin.deleteUser(req.params.uuid);
      res.end();
    } catch {
      res.sendStatus(500);
    }
  }
}));


module.exports = router;