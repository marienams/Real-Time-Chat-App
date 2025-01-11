import mongoose from "mongoose"
// defining User schema through a function
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName:{
            type: String,
            required: true,
            
        },
        password:{
            type: String,
            required: true,
            minLengthL: 6,
        },
        profilePic:{
            type: String,
            default: "",
        },
        
    },
    {timestamps: true}
);

const User = mongoose.model("user", userSchema)

export default User;