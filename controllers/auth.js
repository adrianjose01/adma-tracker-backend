const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const { email } = req.body;
  const { name } = req.body;
  const { password } = req.body;

  console.log(email, name, password);

  bcrypt
    .hash(password, 12)
    .then((hashValue) => {
      const user = new User({
        email,
        name,
        password: hashValue,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("a user with this email could not be found!");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id,
        },
        "secretsecret",
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ token, userId: loadedUser._id, name: loadedUser.name });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.resetName = (req, res, next) => {
  const { name } = req.body;
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      user.name = name;
      user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Name Updated Succesfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
