import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import { CaptainContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setCaptain } = useContext(CaptainContext)
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const subMitHandler = async (e)=>{
        e.preventDefault()
        try {
            const CaptainData = {
                email:email,
                password:password
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/login`, CaptainData)
            if(response.status === 200){
                setCaptain(response.data.captain)
                localStorage.setItem('token', response.data.token)
            }
            setEmail("")
            setPassword("")
            navigate("/home")
        } catch(error) {
            console.error("Login error:", error.response?.data || error.message)
        }
    }

    return (
        <div className='relative bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center flex flex-col items-center justify-center h-dvh'>

            {/* Top Left Logo */}
            <img
                className='absolute top-5 left-8 w-20'
                src="https://imgs.search.brave.com/Aacap5hKxsM0_o4jP2kD_Jpg10Fk6-ZAkDzcVzJN6NQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTEtMjAxNi03/MDB4Mzk0LnBuZw"
                alt="Logo"
            />

            <form onSubmit={(e)=>subMitHandler(e)} className='flex flex-col gap-5 w-80 fixed'>

                <h3 className='text-2xl font-bold'>Put your Captain email?</h3>

                <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-300 rounded-full px-4 py-2 w-full bg-white/80'
                    placeholder='Enter your email'
                />

                {/* Password Field */}
                <div className='relative w-full'>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        className='border border-gray-300 rounded-full px-4 py-2 w-full pr-12 bg-white/80'
                        placeholder='Enter your password'
                    />

                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black'
                    >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </div>

                <button
                    type='submit'
                    className='bg-black text-white w-full py-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 cursor-pointer'
                >
                    Login
                </button>

                <p className='text-sm font-bold text-center'>
                    Don't have an Captain account? <Link to="/captain/signup" className='text-blue-600'>Sign up</Link>
                </p>

            </form>
        
        </div>
    )
}

export default CaptainLogin