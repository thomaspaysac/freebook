const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const supabase = require('../supabaseConfig');
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

// POST create a new post
router.post('/create', upload.single('file'), [
  body('text', 'Post must be between 1 and 4,000 characters.')
  .trim()
  .isLength({ min: 1, max: 4000 })
  .escape()
  .unescape("&#39;", "'"),

  asyncHandler(async (req, res, next) => {
    if (req.token !== req.headers.token || req.body.author !== req.user.id) {
      res.sendStatus(403);
    } 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 400, errors: errors.array()});
      return;
    }
    let fileUrl = null;
    if (req.file) {
      const filetypeCheck = /(gif|jpe?g|tiff?|png|webp|bmp|x-icon)$/i
      if (filetypeCheck.test(req.file.mimetype)) {
        const fileContent = await fs.promises.readFile(req.file.path);
        const { data, error } = await supabase
        .storage
        .from('posts')
        .upload(req.file.filename, fileContent, {
          cacheControl: '3600',
          upsert: false,
          contentType: req.file.mimetype,
        });
        const { data: imageUrl } = supabase
        .storage
        .from('posts')
        .getPublicUrl(req.file.filename);
        fileUrl = imageUrl.publicUrl;
      } else {
        res.json({ status: 400, errors: [{msg: 'You can only send image files.'}]});
        return;
      }
    }
    const { error } = await supabase
    .from('posts')
    .insert({ 
      author: req.body.author,
      text: req.body.text,
      file: fileUrl,
     });
     res.json({status: 200});
  })
]);

// DELETE post
router.delete('/:post_id', asyncHandler(async (req, res, next) => {
  if (req.headers.authorization !== req.user.id) {
    res.sendStatus(403);
    return;
  }
  // Delete all likes from post
  const { error: likesError } = await supabase
  .from('likes')
  .delete()
  .eq('post', req.params.post_id);
  // Delete all comments from post
  const { error: commentsError } = await supabase
  .from('comments')
  .delete()
  .eq('post', req.params.post_id);
  // Delete post
  const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', req.params.post_id)
  .eq('author', req.headers.authorization);
  res.end();
}));

// GET own posts and friends'
router.get('/feed', asyncHandler(async (req, res, next) => {
  const user_ID = req.headers.authorization;
  const friends = [req.headers.authorization];
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('uuid', req.headers.authorization)
  // GET friends list
  const { data: friendsList, error: friendsError } = await supabase
  .from('friends')
  .select('user_ID(uuid), friend_ID(uuid)')
  .or(`user_ID.eq.${user_ID}, friend_ID.eq.${user_ID}`)
  .eq('accepted', true)
  // Si l'user ID est différent de celui de l'utilisateur, l'ajouter à l'array 'friends', sinon return
  friendsList.forEach(el => {
    if (el.user_ID.uuid !== user_ID && el.friend_ID.uuid === user_ID) {
      friends.push(el.user_ID.uuid);
    } else if (el.friend_ID.uuid !== user_ID && el.user_ID.uuid === user_ID) {
      friends.push(el.friend_ID.uuid);
    } else {
      return;
    }
  });
  const { data: posts, error: postsError } = await supabase
  .from('posts')
  .select('*, author (id, uuid, first_name, last_name, avatar)')
  .in('author', friends)
  .order('created_at', { ascending: false })
  .limit(30);
  res.json(posts);
}));

// POST toggle like and increment/decrement like count
router.post('/:post_id/like', asyncHandler(async (req, res, next) => {
  const { data: existingLike, error: likeError } = await supabase
  .from('likes')
  .select()
  .eq('author', req.body.author)
  .eq('post', req.params.post_id);
  if (!existingLike.length) {
    const { error: likePostError } = await supabase
    .from('likes')
    .insert({ 
      author: req.body.author,
      post: req.params.post_id,
     })
    const { data: increment, error: incrementError } = await supabase
    .rpc('increment_likes', { row_id: req.params.post_id });
  } else {
    const { error } = await supabase
    .from('likes')
    .delete()
    .eq('author', req.body.author)
    .eq('post', req.params.post_id);
    const { data: decrement, error: decrementError } = await supabase
    .rpc('decrement_likes', { row_id: req.params.post_id });
  }
}));

// GET like status
router.get('/:post_id/like/:user', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('likes')
  .select()
  .eq('author', req.params.user)
  .eq('post', req.params.post_id);
  res.json(data);
}));

// GET post comments
router.get('/:post_id/comments', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('comments')
  .select('*, author (id, uuid, first_name, last_name, avatar)')
  .eq('post', req.params.post_id)
  .order('created_at', { ascending: false });
  res.json(data);
}));

// POST create post comments
router.post('/:post_id/comments/create', [
  body('text', 'Comment must be between 1 and 1,500 characters.')
  .trim()
  .isLength({ min: 1, max: 1500 })
  .escape()
  .unescape("&#39;", "'"),

  asyncHandler(async (req, res, next) => {
    console.log({"req.token": req.token, "headers.token": req.headers.token, "body.author": req.body.author, "req.user": req.user.id})
    if (req.token !== req.headers.token || req.body.author !== req.user.id) {
      res.sendStatus(403);
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 400, errors: errors.array()});
      return;
    }
    const { error } = await supabase
    .from('comments')
    .insert({ 
      author: req.body.author,
      post: req.params.post_id,
      text: req.body.text
     });
    const { data: increment, error: incrementError } = await supabase
    .rpc('increment_comments', { row_id: req.params.post_id });
     res.json({status: 200});
  })
]);

// DELETE post comment
router.delete('/:post_id/comments/:comment_id', asyncHandler(async (req, res, next) => {
  if (req.headers.authorization !== req.user.id) {
    res.sendStatus(403);
    return;
  }
  const { error } = await supabase
  .from('comments')
  .delete()
  .eq('id', req.params.comment_id)
  .eq('post', req.params.post_id)
  .eq('author', req.headers.authorization);
  const { data: decrement, error: decrementError } = await supabase
  .rpc('decrement_comments', { row_id: req.params.post_id });
   res.json({status: 200});  res.end();
}));

// GET posts from one user
router.get('/:user', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .from('posts')
  .select('*, author (id, uuid, first_name, last_name, avatar)')
  .eq('author', req.params.user)
  .order('created_at', { ascending: false })
  res.json(data);
}));

module.exports = router;