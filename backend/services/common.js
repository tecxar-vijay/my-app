const passport = require("passport")

// this func will only allwo the user if he has the token
exports. isAuth = (req, res, done) => {
    return passport.authenticate("jwt")
  }

  // this func will only return the id and role of user and remove other info like password and salt
  exports.sanitizeUser = (user) => {
    return {id : user.id , role : user.role}
  }

  exports.cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};