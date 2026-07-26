const jwt = require("jsonwebtoken");

function auth (req, res, next) {
    try {
        // Header se token lo
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

                req.user = decoded;
        next();       

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
}

module.exports = auth;