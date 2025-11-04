import React from 'react'
import { Link } from 'react-router-dom'  

const PageNotFound = () => {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-3'>
          <div></div>
          <div className='flex flex-col  justify-center items-center'>
            <img src="https://cdn.dribbble.com/userupload/24278108/file/original-78d5a175341b5698c5e82e902ff801a6.gif" alt="Page Not Found" />
            <p className='mb-4'>Oh No !</p>
            <h1 className='md:text-5xl text-2xl mb-6 '>Looks Like Your Lost </h1>
            <h5 >The Page You Are Looking For Is Not Available  </h5>
            <Link to='/' ><button className='mt-4 px-4 py-3 bg-blue-800 text-white rounded  hover:border-blue-800 hover:bg-white hover:text-blue-800 cursor-pointer'>Back Home</button></Link>
          </div>
        </div>
      </div>
     
    </>
    
  )
}

export default PageNotFound