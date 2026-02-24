import React, { useState } from 'react'

export const UsersContext = React.createContext()
const UserContext = ({children}) => {

    const [user, setUser] = useState({
        email:"",
        password:"",
        fullName:{
            firstName:"",
            lastName:""
        }
    })
  return (
    <UsersContext.Provider value={{user,setUser}}>{children}</UsersContext.Provider>
  )
}

export default UserContext