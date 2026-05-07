const jwt = require("jsonwebtoken");

const protect = async( req, res, next ) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        )

        req.user = decoded.id;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid token"
        })
    }
}

module.exports = protect;