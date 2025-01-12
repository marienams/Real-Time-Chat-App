// global state management
import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"


export const useAuthStore = create((set) =>({
    authUser: null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers: [],
    isCheckingAuth:null,

    checkAuth: async() =>{
        try{
            const res = await axiosInstance.get("/auth/check")

            set({authUser:res.data})
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
    }
}))

export default useAuthStore