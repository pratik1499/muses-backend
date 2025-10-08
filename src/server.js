require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
// const authMiddleware = require("./middleware/authMiddleware");
const userRoutes = require("./modules/users/user.routes");

const app = express();

// parse JSON bodies
app.use(express.json());

// simple request logger
app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// app.get("/profile", authMiddleware, (req, res) => {
//   res.json({ message: `Hello ${req.user.username}` });
// });
const PORT = process.env.PORT || 5000; // fallback if env not loaded

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
