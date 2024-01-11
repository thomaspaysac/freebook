const asyncHandler = require("express-async-handler");
const supabase = require('../supabaseConfig')
const { body, validationResult } = require("express-validator");

exports.signup_post = [
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
  .isEmail,
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
    console.log('test')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
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
    res.json(data);
  })
]