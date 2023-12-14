const express = require("express");

const isAuth = require("../middleware/is-auth");
const tranxController = require("../controllers/tranx");

const router = express.Router();

router.get("/getAll/:userId", isAuth, tranxController.getTranx);

router.post("/create", isAuth, tranxController.createTranx);

router.delete("/delete/:userId", isAuth, tranxController.deleteAll);

module.exports = router;
