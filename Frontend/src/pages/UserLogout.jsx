import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const UserLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    localStorage.removeItem('token')
                    navigate("/user/login")
                }
            } catch(error) {
                console.error("Logout failed:", error)
                navigate("/user/login")
            }
        }
        logout()
    }, [navigate, token])
    
  return (
    <div>Logging out...</div>
  )
}

export default UserLogout