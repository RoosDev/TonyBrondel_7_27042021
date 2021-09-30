const express = require("express");
const router = express();

const userCtrl = require("../controllers/user_control");
// const passValidation = require("../middleware/pass_Validation");

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

// , userCtrl.Signup);
  
// router.post("/login", userCtrl.LoginQuery);
// router.get("/user", userCtrl.UsersQuery);

module.exports = router;
