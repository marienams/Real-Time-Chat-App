import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloud_config.js";

// getting all the users in the chat list
export const getUsersForSideBar = async(req,res) =>{
    // display all users except self in sidebar
    try{
        const loggedInUserId = req.user._id;
        // find all users except the current logged in user
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    }
    catch(error){
        console.log("Error in message controller ", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

// getting messages from 2 users (me and other)
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
    
        const messages = await Message.find({
          $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
          ],
        });
    
        res.status(200).json(messages);
      } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
}

export const sendMessage =  async (req,res) => {
    try{
        // grab text and or image sent, receiver and sender
        const {text, image} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id
        // when user uploads an image
        let imageUrl;

        if(image){
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        // now we add the new message to db

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save()

        // todo: relatime messaging using socket.io

        res.status(201).json(newMessage)
    }
    catch(error){
        console.log("Error at message controller ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}