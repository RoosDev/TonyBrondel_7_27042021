const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user_control");
// const passValidation = require("../middleware/pass_Validation");

// router.post("/signup", passValidation, userCtrl.SignupQuery);
// router.post("/login", userCtrl.LoginQuery);
// router.get("/user", userCtrl.UsersQuery);

module.exports = router;
