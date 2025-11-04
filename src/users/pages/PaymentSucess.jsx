import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PaymentSucess = () => {
  return (
    <div className='container my-10'>
        <div className='md:grid grid-cols-2 px-20 justify-center flex-col'>
            <div>
                <h1 className="md:text-4xl text-blue-800">
                    Congratulations....
                </h1>
                <p className='my-4 text-2xl'>ThankYou for shopping BookStore.....</p>
                <Link to={'/all-Books'}><button className='bg-blue-800 px-4 py-3 text-white my-5 hover:bg-white hover:border-blue-800 hover:text-blue-800 rounded'>
                    <FontAwesomeIcon icon={faBackward} className='me-2'/></button></Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt=""
                className='w-full' />
            </div>
        </div>
    </div>
  )
}

export default PaymentSucess