const express = require('express');

const router = express.Router();
const { body } = require('express-validator');

const User = require('./userModel');
const userController = require('./userController');

router.post(
  '/register',
  [
    body('firstname')
      .notEmpty()
      .isString(),
    body('lastname')
      .notEmpty()
      .isString(),
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom(async (value) => {
        try {
          const user = await User.findOne({
            email: value,
          });
          console.log(user);
          if (user) {
            throw new Error('E-mail already in use');
          }
        } catch (error) {
          throw new Error(error);
        }
      })
      .normalizeEmail(),
    body('password', 'Enter 8 char of alphanumeric type onnly')
      .isLength(8)
      .isAlphanumeric()
      .trim(),
    body('confirmPassword').custom((value, { req }) => value === req.body.password),
  ],
  userController.postUser
  ,
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .normalizeEmail(),
    body('password', 'Enter 8 char of alphanumeric type onnly')
      .isLength(8)
      .isAlphanumeric()
      .trim(),
  ],
  userController.loginUser
  ,
);

module.exports = router;
