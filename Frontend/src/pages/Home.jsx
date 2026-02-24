import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center h-dvh pt-5 w-full bg-red-400 flex items-start justify-between flex-col'>
                <img className='w-20 ml-8' src="https://imgs.search.brave.com/Aacap5hKxsM0_o4jP2kD_Jpg10Fk6-ZAkDzcVzJN6NQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTEtMjAxNi03/MDB4Mzk0LnBuZw" alt="" />
                <div className='bg-white w-full py-5 px-10 flex flex-col gap-5'>
                    <h2 className='text-2xl font-bold'>Get started with uber</h2>
                    <Link to="/user/login" className='bg-black text-white w-full py-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 cursor-pointer'>continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home