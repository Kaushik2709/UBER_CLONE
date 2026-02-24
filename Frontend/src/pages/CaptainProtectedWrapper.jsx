import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UsersContext } from '../context/userContext'

const CaptainProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    if(token){
        return children
    }
    else{
        return <Navigate to="/captain/login" />
    }
    
}

export default CaptainProtectedWrapper