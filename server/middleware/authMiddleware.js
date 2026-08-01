import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Missing access token",
        });
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, user) => {

            if (error) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }

            req.user = user;

            next();

        }
    );

}