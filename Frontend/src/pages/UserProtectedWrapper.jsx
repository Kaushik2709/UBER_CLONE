import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UsersContext } from '../context/userContext'

const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    if(token){
        return children
    }
    else{
        return <Navigate to="/user/login" />
    }
    
}

export default UserProtectedWrapper