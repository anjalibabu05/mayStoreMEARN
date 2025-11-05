import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/ContextSearch' // ✅ corrected import
import { toast, ToastContainer } from 'react-toastify'

const Home = () => {
  const navigate = useNavigate()
  const [homeBook, setHomeBook] = useState([])
  const [token, setToken] = useState("")

  // ✅ Access Context properly
  const { searchKey, setsearchKey } = useContext(searchKeyContext)
  console.log(searchKey)

  // ✅ Fetch books for home
  const getAllHomeBooks = async () => {
    const result = await homeBookApi()
    console.log(result)
    if (result.status === 200) {
      setHomeBook(result.data)
    }
  }

  useEffect(() => {
    getAllHomeBooks()
  }, [])

  const searchBook = () => {
    const token = sessionStorage.getItem("token")

    if (searchKey === "") {
      toast.info("Please Enter a Title.....")
    } else if (!token) {
      toast.info("Please login")
      setTimeout(() => {
        navigate('/login')
      }, 2500)
    } else if (searchKey && token) {
      navigate('/all-books')
    } else {
      toast.error("Something Went Wrong !!!!")
    }
  }

  return (
    <>
      <Header />
      <header
        className="flex justify-center items-center bg-cover bg-center bg-no-repeat relative h-[70vh] text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div id="main" className="flex justify-center items-center w-full relative z-10">
          <div className="md:grid grid-cols-3 w-full text-center px-4">
            <div></div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-5xl font-bold drop-shadow-lg mb-3">Wonderful Gifts</h1>
              <p className="text-lg mb-6 drop-shadow-md">
                Give your family and friends the joy of reading
              </p>
              <div className="flex mt-3 justify-center w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search Books..."
                  value={searchKey}
                  onChange={(e) => setsearchKey(e.target.value)} // ✅ fixed
                  className="p-2 bg-white border border-blue-950 rounded-3xl placeholder-gray-500 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FontAwesomeIcon
                  onClick={searchBook}
                  icon={faMagnifyingGlass}
                  className="text-blue-700 cursor-pointer"
                  style={{ marginTop: '11px', marginLeft: '-30px' }}
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/* NEW ARRIVALS */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <h2>New Arrivals</h2>
        <h4>Explore Our Latest Collection</h4>
        <div className='md:grid grid-cols-4'>
          {homeBook?.length > 0 ? (
            homeBook.map((item) => (
              <div key={item._id} className='p-3 shadow'>
                <img src={item.imageUrl} alt={item.tittle} style={{ width: '100%', height: '300px' }} />
                <div className='p-3 shadow'>
                  <div className='flex justify-center flex-col items-center mt-3'>
                    <p>{item.author}</p>
                    <h3>{item.tittle}</h3>
                    <p>{item.dPrice}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading.........</p>
          )}
        </div>
        <div className='my-5 content-center'>
          <Link to={'/all-books'}>
            <button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-800 hover:bg-white hover:text-black'>
              Explore More
            </button>
          </Link>
        </div>
      </section>

      {/* AUTHOR */}
      <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
        <div className='md:grid grid-cols-2 w-full'>
          <div className='flex justify-center items-center flex-col'>
            <h4>Featured Authors</h4>
            <h3 className='text-2xl'>Captives With Every Word</h3>
            <p className='mt-6 text-justify'>
              Authors in a bookstore application are the visionaries behind the books that fill the shelves...
            </p>
          </div>
          <div className='px-10 pt-8'>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ8HqAXm-GRpSvT0odT2aOtH46WK1ntOQkFw&s"
              alt=""
              className='w-full'
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className='flex justify-between items-center flex-col md:py-10 md:px-40'>
        <h3>TESTIMONIALS</h3>
        <h3 className='text-2xl'>See What Others Are Saying</h3>
        <img
          src="https://www.thefamouspeople.com/profiles/thumbs/george-r-r-martin-1.jpg"
          alt=""
          className='mt-5'
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
        <h2 className='text-2xl'>Ken Thomas</h2>
        <p className='text-center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse reprehenderit error deserunt repellendus distinctio...
        </p>
      </div>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  )
}

export default Home
