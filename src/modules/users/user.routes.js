const express = require("express");
const { PrismaClient } = require("../../generated/prisma");
const { registerUser } = require("./user.authController");

const prisma = new PrismaClient();

const router = express.Router();

// Get all users (for testing purposes)
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
});

//Register user
router.post("/register", registerUser);

module.exports = router;
