const express = require("express");
const router = express.Router()
const userCtrl = require("../controllers/user_control");
// const passValidation = require("../middleware/pass_Validation");

router.post('/signup', userCtrl.Signup);
router.post("/login", userCtrl.LoginQuery);

module.exports = router;
