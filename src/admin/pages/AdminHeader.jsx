import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
   const navigate=useNavigate()
  const logOut=()=>{
   
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
    navigate('/')
    
  }
  return (
    <>
      <div className="flex justify-between px-20 p-3">
        {/* Logo + Title */}
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCYE6Q1hXhRZiZ2IpqWPNQeDIrUXOLl1Rlag&s"
            alt="Book Store Logo"
            style={{ width: '50px', height: '50px' }}
          />
          <h1 className="ms-3 font-medium text-2xl">Book Store</h1>
        </div>

        {/* Logout button */}
        <button
        onClick={logOut} className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white">
          <FontAwesomeIcon icon={faPowerOff} className="me-3" />
          LogOut
        </button>
      </div>

      {/* Scrolling message */}
      <marquee behavior="scroll" direction="right" className="p-3 bg-gray-900 text-white">
        Welcome, Admin! You're all set to manage and monitor the system 🚀
      </marquee>
    </>
  )
}

export default AdminHeader
