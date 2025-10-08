const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../users");

const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   console.log("🚀 ~ username:", username);

//   //check existing user
//   if (users.find((user) => user.username === username)) {
//     return res.status(400).json({ message: "User already exists" });
//   }
//   //hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = { username, password: hashedPassword };

//   users.push(newUser);

//   res.status(201).json({ message: "User registered successfully" });
// });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) return res.status(400).json({ message: "Invalid Credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

  //generate jwt
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({ token });
});

module.exports = router;
