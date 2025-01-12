import {Navigate, Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

//import './App.css'
import { axiosInstance } from "./lib/axios"
import { useAuthStore } from "./storage/useAuthStore"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"

const App = () => {
  //check user state
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() =>{
    checkAuth()
  },[checkAuth])

  console.log({authUser})
  // loading stage while page loads
  if(isCheckingAuth && !authUser) return(
  
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Homepage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
