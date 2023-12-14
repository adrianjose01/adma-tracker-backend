const express = require("express");

const AuthController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.post("/reset/:userId", isAuth, AuthController.resetName);

module.exports = router;
