const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser = async(req, res) => {
    
    try {

        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "7d"}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "laxß",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
        success: true,
        message: "User registered successfully!",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "please fill all fields"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        )
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "7d"}
        )
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

const logoutUser = async (req, res) => {
    try {

        res.cookie("token", "", {
            httpOnly:true,
            expires: new Date(0)
        })

        res.status(200).json({
            success: true,
            message: "logged out successfully!"
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const getCurrentUser = async(req, res) => {
    try {
        
        const user = await User.findById(req.user).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {registerUser, loginUser, logoutUser, getCurrentUser}