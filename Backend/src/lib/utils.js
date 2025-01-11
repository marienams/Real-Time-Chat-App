import jwt from "jsonwebtoken"
// getting the userId and responding with the token generated
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
        //sent in cookies
    })
    
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // avoid XSS
        sameSite: "strict", // for CSRF
        secure: process.env.NODE_ENV !== "development" // not clear on what this is
    });

    return token;
}