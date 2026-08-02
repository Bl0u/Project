import express from "express";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const users = [
    {
        email: "peter@gmail.com",
        password: "hello1234",
    },
    {
        email: "danil@gmail.com",
        password: "test",
    },
];

const refreshTokens = [];

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
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
        }
    );

    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
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

router.get("/dashboard", authenticateToken, (req, res) => {

    res.json({
        success: true,
        user: req.user,
    });
});


router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken ;

    if (!refreshToken){
        return res.status(401).json({
            success: false,
            message: "Refresh token missing",
        })
    }


    if (!refreshTokens.includes(refreshToken)){
        return res.status(403).json({
            success: false,
            message: "Refresh token is invalid",
        }) ;
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
            if (error){
                return res.status(403).json({
                    success: false,
                    message: "Refresh token expired",
                }) ;
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
            })
        }
    )
})


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