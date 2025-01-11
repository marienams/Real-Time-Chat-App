import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import cloudinary from "../lib/cloud_config.js"
import bcrypt from "bcryptjs"

// SIGNUP-------------------------------------------------------------------------
export const signup = async (req, res) =>{
    // get user
    // hash their password
    // authenticate user through token
    const {fullName,email,password} = req.body
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        // check password length
        if(password.length > 6){
            return res.send("Password should not be more than 6 digits")
        }

        // check if email exist
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "Email already exists"})

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPw = await bcrypt.hash(password,salt)
        // create new user with email and hashedPw and add to db
        const newUser = new User({
            fullName,
            email,
            password:hashPw
        })

        // generate jwt
        if(newUser){
            //generate JWT
            generateToken(newUser._id, res)
            //save new user to db
            await newUser.save()
            // responding status and data added
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else {
            res.status(400).json({message: "Invalid user data"})
        }
    }
    catch(error) {
        console.log("Error at signup controller ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
    //res.send("Signup route")
}

// LOGIN-------------------------------------------------------------------------
export const login = async (req, res) =>{
    const {email, password} = req.body
    try {
        //get the user data from db
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        // check password
        const isPwCorrect = await bcrypt.compare(password, user.password)
        if(!isPwCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }
        // get token
        generateToken(user._id, res)
        //respond on valid token
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    }
    catch(error){
        console.log("Error in login controller ", error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
}

// LOGOUT-------------------------------------------------------------------------
export const logout = (req, res) =>{
    // clear cookies
    try {
        //expire cookie immediately
        res.cookie("jwt", "",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }
    catch(error){
        console.log("Error at logout controller")
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const updateProfile = async(req,res) =>{
    // cloudinary service for uploading your profile image
    try{
        // get user fron protect middleware
        const {profilePic} = req.body
        const userId = req.user._id

        if(!profilePic){
            return res.statue(400).json({message:"Profile pic is required"})
        }
        // upload profile pic to cloud
        await cloudinary.uploader.upload(profilePic)
        // then add updated user to db since cloudinary is not our main db
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true})

        res.status(200).json({message:"Profile Updated"})

    }
    catch(error){
        console.log("error in profile update ", error.message)
        
    }
}

export const checkAuth = (req,res) => {
    // check if user is authenticated whenever if we refresh our page
    try{
        res.status(200).json(req.user)
    }
    catch(error){
        console.log("Error in check auth controller ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}
