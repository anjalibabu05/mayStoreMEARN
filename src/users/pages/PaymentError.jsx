import React from 'react'

const PaymentError = () => {
    return (
        <div className='container my-10'>
            <div className='md:grid grid-cols-2 px-20 justify-center flex-col'>
                <div>
                    <h1 className="md:text-4xl text-blue-800">
                        Sorry Your Payment Unsuessful
                    </h1>
                    <p className='my-4 text-2xl'>ThankYou for shopping BookStore.....</p>
                    <Link to={'/all-Books'}><button className='bg-blue-800 px-4 py-3 text-white my-5 hover:bg-white hover:border-blue-800 hover:text-blue-800 rounded'>
                        <FontAwesomeIcon icon={faBackward} className='me-2' /></button></Link>
                </div>
                <div className='flex justify-center items-center'>
                    <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt=""
                        className='w-full' />
                </div>
            </div>
        </div>
    )
}

export default PaymentError