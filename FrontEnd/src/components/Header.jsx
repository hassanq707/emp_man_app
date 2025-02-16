import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router';

const Header = ({name}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {withCredentials : true})
    .then(navigate('/login'))
    .catch(err => console.log(err))
  }
  return (
    <div className='text-white flex px-7 py-5 items-center justify-between border-b-4 border-[#0f5661] w-full'>
        <div className='select-none'>
            <h1 className='text-lg font-semibold'>Welcome</h1>
            <h1 className='font-extrabold text-2xl mt-2'>{name}</h1>
        </div> 
        <button onClick={handleLogout} className='py-3 px-7  rounded-sm bg-red-600 hover:bg-red-800 text-lg '>
            Logout
        </button>
    </div>
  )
}

export default Header