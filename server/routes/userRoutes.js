import express from "express";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authMiddleware.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../db.json");

const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
const users = db.users;
// ----------------------------------------------------------------------
function getUsers() {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  return db.users;
}

function saveUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify({ users }, null, 2));
}
const router = express.Router();
const refreshTokens = [];

router.get("/", authenticateToken, (req, res) => {
  const users = getUsers();
  return res.status(200).json({
    succes: true,
    users,
  });
});

router.get("/:id", authenticateToken, (req, res) => {
  const users = getUsers();

  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

router.post("/", (req, res) => {
  const users = getUsers();

  const { email, password } = req.body;

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    role: "customer",
  };

  users.push(newUser);

  saveUsers(users);

  return res.status(201).json({
    success: true,
    user: newUser,
    message: "User created successfully",
  });
});

router.put("/:id", authenticateToken, (req, res) => {
  const users = getUsers();

  const id = Number(req.params.id);

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({
      success: false,
      message: "You're not authorized to update this user.",
    });
  }

  delete req.body.id;
  delete req.body.role;

  users[index] = {
    ...users[index],
    ...req.body,
  };

  saveUsers(users);

  return res.status(200).json({
    success: true,
    user: users[index],
    message: "User updated successfully",
  });
});

router.delete("/:id", authenticateToken, (req, res) => {
  const users = getUsers();

  const id = Number(req.params.id);

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Only admins can delete users.",
    });
  }
  console.log(req.user);
  const deletedUser = users[index];

  users.splice(index, 1);

  saveUsers(users);

  return res.json({
    success: true,

    message: "User deleted successfully.",

    user: deletedUser,
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const currentUsers = getUsers();
  const user = currentUsers.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    { email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );

  refreshTokens.push(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    accessToken,
    message: "You have been authorized",
    user: {
      ...user,
    },
  });
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token missing",
    });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      success: false,
      message: "Refresh token is invalid",
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        success: false,
        message: "Refresh token expired",
      });
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
    );

    return res.json({
      success: true,
      accessToken,
    });
  });
});

router.post("/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const index = refreshTokens.indexOf(refreshToken);

    if (index !== -1) {
      refreshTokens.splice(index, 1);
    }
  }

  res.clearCookie("refreshToken");

  return res.json({
    success: true,
    message: "Logged out",
  });
});

export default router;
