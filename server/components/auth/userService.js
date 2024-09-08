const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('./userModel');
const { ApiError } = require('../../utils/ApiError');

async function postUser(firstname, lastname, email, password, confirmPassword, next) {
  bcrypt.hash(password, 12)
    .then(async (hashedPassword) => {
      // console.log('User', User);
      const user = await User.create({
        firstname, lastname, email, password: hashedPassword,
      });
      return user;
    })
    .catch(next);
}

async function loginUser(email, password, next) {
  try{
    const user = await User.findOne({ email }).select('name password').lean();

    if (user) {
      const result = await bcrypt.compare(password, user.password)
        if (!result) { throw new ApiError(401, 'Incorrect Email or password'); }
        // login
        const token = await jwt.sign({
          // exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8),
          //TODO : add refreshToken Logic
          id: user._id,
        }, process.env.JWT_PRIVATE_KEY);
        // console.log('token', user);
        return {
            token,
            name: user.name,
            id: user._id
        };
      
    }else{
      next(new ApiError(401, 'Incorrect Email or password'));
    }
 
  }catch(err) {
    next(err);
  };
}

module.exports = {
  postUser,
  loginUser,
};
