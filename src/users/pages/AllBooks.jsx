import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getAllBookApi } from '../../services/allApi'
// ✅ Fix import path and ensure correct named export
import { searchKeyContext } from '../../context/ContextSearch.jsx'

const AllBooks = () => {
  const [token, setToken] = useState("")
  const [status, setStatus] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [tempBooks, setTempBooks] = useState([])

  // ✅ Access context properly
const { searchKey, setSearchKey } = useContext(searchKeyContext);

  // ✅ Fetch all books
  const getAllBooks = async (searchKey, tok) => {
    const reqHeader = {
      'Authorization': `Bearer ${tok}`
    }

    try {
      const result = await getAllBookApi(searchKey, reqHeader)
      if (result.status === 200) {
        setAllBooks(result.data)
        setTempBooks(result.data)
      } else {
        console.warn("⚠️ Failed to fetch books:", result.data)
      }
    } catch (err) {
      console.error("❌ Error fetching books:", err)
    }
  }

  // ✅ Fetch on mount or when searchKey changes
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      getAllBooks(searchKey, storedToken)
    } else {
      console.warn("⚠️ No token found in sessionStorage")
    }
  }, [searchKey])

  // ✅ Filter function
  const filter = (category) => {
    if (category === "no-filter") {
      setAllBooks(tempBooks)
    } else {
      setAllBooks(
        tempBooks.filter(
          (item) => item.category?.toLowerCase() === category.toLowerCase()
        )
      )
    }
  }

  return (
    <>
      <Header />

      <div className="flex justify-center items-center flex-col">
        <h3 className="mt-3 text-3xl font-medium">Collections</h3>
        <div className="flex my-8 w-full justify-center items-center">
          <input
            value={searchKey}
            onChange={(e) => setsearchKey(e.target.value)}
            type="text"
            placeholder="Search By Title"
            className="border border-gray-300 placeholder-gray-300 p-2 w-1/4 shadow"
          />
          <button
            className="bg-blue-900 text-white py-2 px-3 shadow hover:border hover:border-blue-900 hover:bg-white ms-2"
            onClick={() => getAllBooks(searchKey, token)}
          >
            Search
          </button>
        </div>
      </div>

      {token ? (
        <div className="md:grid grid-cols-[1fr_4fr] md:px-10 px-5">
          {/* Filters */}
          <div>
            <div className="flex mt-3 justify-between">
              <h1 className="text-2xl font-medium">Filters</h1>
              <span onClick={() => setStatus(!status)} className="md:hidden">
                <FontAwesomeIcon icon={faBars} />
              </span>
            </div>

            <div className={status ? "md:block" : "md:block justify-center hidden"}>
              {["Novel", "Philosophy", "Romance", "Autobiography", "Non-Fiction", "Politics"].map((cat) => (
                <div key={cat} className="mt-3" onClick={() => filter(cat)}>
                  <input type="radio" id={cat} name="filter" />
                  <label htmlFor={cat} className="ms-3">{cat}</label>
                </div>
              ))}
              <div className="mt-3" onClick={() => filter("no-filter")}>
                <input type="radio" id="no-filter" name="filter" />
                <label htmlFor="no-filter" className="ms-3">No Filter</label>
              </div>
            </div>
          </div>

          {/* Books Display */}
          <div className="grid grid-cols-4 w-full gap-4">
            {allBooks.length > 0 ? (
              allBooks.map((item) => (
                <div
                  key={item._id}
                  className="p-3 shadow"
                  hidden={item?.status === "pending" || item?.status === "sold"}
                >
                  <img
                    src={item?.ImageUrl || "https://via.placeholder.com/300"}
                    alt={item?.title || "Book image"}
                    style={{ width: "100%", height: "300px" }}
                  />
                  <div className="flex justify-center flex-col items-center mt-3">
                    <p className="text-blue-700">{item?.title}</p>
                    <p>{item?.author}</p>
                    <p>Price: {item?.dPrice}</p>
                    <Link to={`/view-book/${item?._id}`}>
                      <button className="w-full mt-3 px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white cursor-pointer rounded">
                        View Book
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading ......</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          <div></div>
          <div className="flex justify-center items-center flex-col w-full">
            <img
              src="https://i.pinimg.com/originals/50/05/db/5005dbccb59bc9929274c043b848eb84.gif"
              alt="no image"
              className="w-1/2"
            />
            <p className="mt-3 text-2xl">
              Please <Link to="/login" className="text-red-500 underline">Login</Link> to explore more...
            </p>
          </div>
          <div></div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default AllBooks
