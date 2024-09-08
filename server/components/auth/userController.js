const { validationResult } = require('express-validator');
const userService = require('./userService');
const { ApiError } = require('../../utils/ApiError');
const { ApiResponse } = require('../../utils/ApiResponse');

const postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // const err = new ApiError(422, 'Something went wrong while user login', errors.array());
    // console.log(err);
    return res.status(422).json(new ApiError(422, 'Something went wrong while registering user', errors.array()));
  }
  const {
    firstname, lastname, email, password, confirmPassword,
  } = req.body;
  try {
    const response = await userService
      .postUser(firstname, lastname, email, password, confirmPassword, next);
    return res.status(200).json(new ApiResponse(200, response, 'user registered successfully'));
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(422, 'Something went wrong while user login', errors.array());
    }
    const {
      email, password,
    } = req.body;
  
    const response = await userService.loginUser(email, password, next);
    if(response){
      return res.status(200).json(new ApiResponse(200, response, 'logged in successfully'));
    }
    
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postUser,
  loginUser,
};
