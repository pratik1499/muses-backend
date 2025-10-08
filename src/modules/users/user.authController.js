const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { name, email, password: hashedPassword };

    //Create new user
    const user = await prisma.user.create({
      data: newUser,
    });

    res.status(201).send({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
