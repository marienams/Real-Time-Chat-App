// global state management
import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set,get) =>({
    authUser: null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers: [],
    isCheckingAuth:null,
    socket: null,

    checkAuth: async() =>{
        try{
            const res = await axiosInstance.get("/auth/check")

            set({authUser:res.data})

            get().connectSocket()
        }
        catch(error){
            // when user is not authenticated
            console.log("Error in check auth ", error)
            set:({authUser:null})
        }

        finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) =>{
        set({isSigningUp: true})
        try{
            // our server end point
            console.log("tried signp")
            const res = await axiosInstance.post("/auth/signup", data)
            toast.success("Account successfully created")
            get().connectSocket()
            set({authUser: res.data})
        }
        catch(error){
            console.log("Error in signup useAuth")
            toast.error(error.response.data.message)
        }
        finally {
            // to change user state
            set({isSigningUp: false})
        }
    },

    

    login: async (data) => {
        set({isLoggingIn: true})
        try{
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser: res.data})
            toast.success("Logged in successfully")

            //socket
            get().connectSocket()
        }
        catch(error)
        {
            toast.error(error.response.data.message)
        }
        finally {
            set({ isLoggingIn: false})
        }

    },

    logout: async () => {
        try{
            await axiosInstance.post("/auth/logout")
            set({ authUser: null})
            toast.success("Logged out successfully")
            get().disconnectSocket()
        }
        catch(error){   
            toast.error("Error at logout ",error.response.data.message)

        }
    },

    updateProfile: async(data) =>{
        set({ isUpdatingProfile: true });
        try {
        const res = await axiosInstance.put("/auth/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
        } catch (error) {
        console.log("error in update profile:", error);
        toast.error(error.response.data.message);
        } finally {
        set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        console.log("connect to socket")
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return

        const socket = io(BASE_URL, {query:{
            userId: authUser._id,
        }})
        socket.connect()
        // listen events

        set({socket: socket})
        // listener
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnectSocket()
    },
}))

export default useAuthStore