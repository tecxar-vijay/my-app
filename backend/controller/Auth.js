const { User } = require("../model/User");
// we have made auth controller for logged in user and so
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  console.log("req.body...", req.body);
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        // in login passport js makes session by default but in case of signup it does not make the session so in order to make the session we will have to user [req.login]
        // it also calls serializer and adds to the session
        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json(token);
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  res
  .cookie("jwt", req.user.token, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  })
  .status(200)
  .json(req.user.token);
};

exports.checkUser = async (req, res) => {
  // In passport js it makes user in its server as req.user and if we make any get api where it returns the req.user so it will give the info of that user which is in the server of parssportjs
  res.json({ status: "success", user: req.user });
};
