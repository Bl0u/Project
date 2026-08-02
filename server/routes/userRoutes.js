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


function getUsers() {
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    return db.users;
  }

  function saveUsers(users) {
    fs.writeFileSync(
      dbPath,
      JSON.stringify({ users }, null, 2)
    );
  }
const router = express.Router();
const refreshTokens = [];

router.get('/', authenticateToken, (req, res) => {
    
    const users = getUsers() ;
    return res.status(200).json({
        succes:true,
        users,
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
    const currentUsers = getUsers() ;
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
    { email: user.email },
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
