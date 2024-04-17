const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "@#ADfjHG&%bshI";

// Route1 : Create a user using : POST "/api/auth/signup". No Login Require
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleat 5 charachters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    let success = false;
    // If there are errors , return bad request and the errors
    if (!result.isEmpty()) {
      res.status(400).json({ success, error: result.array() });
    }

    if (result.isEmpty()) {
      try {
        //  Check whether the user with the email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({ success, error: "Sorry the user with the email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Creating a new user if not already exists
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });

        const data = {
          user: {
            id: user.id,
          },
        };

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, msg: "signup successfully", authToken });
        // res.send(`user created, ${user.name}, ${user.email}!`);
      } catch (error) {
        console.log(error);
        res.status(500).send("some error occured");
      }
    }
  }
);

// Route 2:  Authenticate a user using : POST "/api/auth/login". No Login Require
router.post(
  "/login",
  [body("email", "Enter a valid email").isEmail(), body("password", "Password cannot be blank").exists()],
  async (req, res) => {
    const result = validationResult(req);
    let success = false;
    // If there are errors , return bad request and the errors
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Try to login with right credentials/email" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Try to login with right credentials/password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, msg: "Login successfull", authToken });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
