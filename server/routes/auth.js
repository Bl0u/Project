app.get("/dashboard", authenticateToken, (req, res) => {
    res.json({
      success: true,
      message: "Protected route",
      user: req.user,
    });
  });