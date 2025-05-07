import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const signUp = async (req, res) => {
    try {
        const { email, name, password, role } = req.body;
        if (!email || !name || !password || !role) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
            });
        }
        // Check if the user already exists
        const user= await prisma.user.findUnique({
            where:{
                email: email
            }
        })

        if (user) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password (you can use bcrypt or any other hashing library)
        const hashpass = await bcrypt.hash(password,10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashpass,
                role
            }
        });
        
        // Send a success response
        res.status(201).json({ 
            success: true,
            message: "User created successfully",
            user:newUser
        });

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
            });
        }
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials"
            });
        }
        //create a token (you can use JWT or any other token library)
        const accessToken = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: '1min'
        });
        const refreshToken = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: '1min'
        });

        const options={
            expiresIn: new Date(Date.now() +1*60*1000),
            httpOnly: true,
        }
        // Send a success response
        res.status(200).cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            accessToken: accessToken,
        }) 



    } catch (error) {
        console.error("Error in signin:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error:error.message
        });
    }
}

export {signIn, signUp};