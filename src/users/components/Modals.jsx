import { faCamera, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Modals = ({isOpen,onClose}) => {
if(!isOpen) return null
  return (
   <>
    {isOpen && (
        <div className="fixed inset-0 bg-black/50 max-h-screen z-50 flex justify-center items-center  w-screen">
       <div className='w-1/3'>
            <div className=" bg-white flex flex-col rounded ">
                {/* modal header */}
                <div className="flex justify-between items-center bg-black text-white px-2 py-4 text-blue">
                    <h1>Book Photos</h1>
                    <FontAwesomeIcon icon={faX} onClick={onClose}/>
                </div>
                <div className="flex gap-2 items-center mt-5 px-2 text-blue-400">
                    <FontAwesomeIcon icon={faCamera} />
                    <p>Camera click of the book in the hand of seller</p>
                </div>
                <div className="flex justify-center mt-5 mb-10">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxSDBzYEAC5OTGxLCE-jzyPwlB5n_ftLz_6A&s" alt="ikigai book image" />
                </div>
            </div>
       </div>
  </div>
    )
  }
   </>
  )
}

export default Modals