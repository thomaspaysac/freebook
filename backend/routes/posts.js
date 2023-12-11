const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const supabase = require('../supabaseConfig')

// POST create a new post
router.post('/create', asyncHandler(async (req, res, next) => {
  const { error } = await supabase
  .from('posts')
  .insert({ 
    author: req.body.author,
    text: req.body.text,
    file: null,
   })
}))

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
  .select('*, author (first_name, last_name)')
  .in('author', friends)
  .order('created_at', { ascending: false })
  .limit(30);
  res.json(posts);
}));

// PATCH like post // EXPERIMENTAL
router.patch('/:id/like', asyncHandler(async (req, res, next) => {
  const { data, error } = await supabase
  .rpc('increment', { row_id: req.params.id });
  const { data: userData, error: userError } = await supabase
  .from('users')
  .select()
  .eq('uuid', req.headers.authorization);
  console.log(userData);
  /*const { error: updateError } = await supabase
  .from('users')
  .update({ accepted: true })
  .eq('id', req.headers.authorization);*/
}))

// POST like post
router.post('/:id/like', asyncHandler(async (req, res, next) => {
  const { data: existingLike, error: likeError } = await supabase
  .from('likes')
  .select()
  .eq('author', req.body.author)
  .eq('post', req.body.post);
  if (!existingLike.length) {
    const { error: likePostError } = await supabase
    .from('likes')
    .insert({ 
      author: req.body.author,
      post: req.body.post,
     })
    const { data, error } = await supabase
    .rpc('increment', { row_id: req.params.id });
  } else {
    res.end();
  }
}))

module.exports = router;