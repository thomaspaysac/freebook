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
router.get('/', asyncHandler(async (req, res, next) => {
  const user_ID = req.headers.authorization;
  const friends = [];
  // GET friends list
  const { data, error } = await supabase
  .from('friends')
  .select('user_ID(uuid), friend_ID(uuid)')
  .or(`user_ID.eq.${user_ID}, friend_ID.eq.${user_ID}`)
  .eq('accepted', true)
  // Si l'user ID est différent de celui de l'utilisateur, l'ajouter à l'array 'friends', sinon return
  data.forEach(el => {
    
  }friends.push(el));
  console.log(friends);
}))

module.exports = router;