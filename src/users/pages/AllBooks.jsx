import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getAllBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/ContextSearch.jsx'

const AllBooks = () => {
  const [token, setToken] = useState("")
  const [status, setStatus] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [backupBooks, setBackupBooks] = useState([])

  const { searchKey, setSearchKey } = useContext(searchKeyContext)

  // ✅ Fetch books
  const getAllBooks = async (search, tok) => {
    if (!tok) return console.warn("⚠️ Missing token, cannot fetch books.")
    try {
      const reqHeader = { Authorization: `Bearer ${tok}` }
      const result = await getAllBookApi(search, reqHeader)

      if (result?.status === 200 && Array.isArray(result.data)) {
        setAllBooks(result.data)
        setBackupBooks(result.data)
      } else {
        console.warn("⚠️ Unexpected response:", result)
        setAllBooks([])
      }
    } catch (err) {
      console.error("❌ Error fetching books:", err)
      setAllBooks([])
    }
  }

  // ✅ On mount + search change
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      getAllBooks(searchKey, storedToken)
    }
  }, [searchKey])

  // ✅ Filtering by category
  const filter = (category) => {
    if (category === "no-filter") {
      setAllBooks(backupBooks)
      return
    }

    const filtered = backupBooks.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase()
    )
    setAllBooks(filtered)
  }

  return (
    <>
      <Header />

      <div className="flex flex-col items-center">
        <h3 className="mt-3 text-3xl font-semibold">Collections</h3>

        <div className="flex my-8 w-full justify-center items-center">
          <input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            type="text"
            placeholder="Search By Title"
            className="border border-gray-300 placeholder-gray-400 p-2 w-1/4 shadow-sm rounded"
          />
          <button
            className="bg-blue-900 text-white py-2 px-4 ms-2 rounded hover:border hover:border-blue-900 hover:bg-white hover:text-blue-900 transition"
            onClick={() => getAllBooks(searchKey, token)}
          >
            Search
          </button>
        </div>
      </div>

      {token ? (
        <div className="md:grid grid-cols-[1fr_4fr] md:px-10 px-5">
          {/* Sidebar Filters */}
          <div>
            <div className="flex mt-3 justify-between items-center">
              <h1 className="text-2xl font-semibold">Filters</h1>
              <span
                onClick={() => setStatus(!status)}
                className="md:hidden cursor-pointer"
              >
                <FontAwesomeIcon icon={faBars} />
              </span>
            </div>

            <div
              className={`${
                status ? 'block' : 'hidden'
              } md:block mt-4 space-y-3`}
            >
              {["Novel", "Philosophy", "Romance", "Autobiography", "Non-Fiction", "Politics"].map(
                (cat) => (
                  <div key={cat} onClick={() => filter(cat)} className="cursor-pointer">
                    <input type="radio" id={cat} name="filter" />
                    <label htmlFor={cat} className="ms-3">{cat}</label>
                  </div>
                )
              )}
              <div onClick={() => filter("no-filter")} className="cursor-pointer">
                <input type="radio" id="no-filter" name="filter" />
                <label htmlFor="no-filter" className="ms-3">No Filter</label>
              </div>
            </div>
          </div>

          {/* Books Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-0">
            {allBooks.length > 0 ? (
              allBooks.map((item) => {
                const hidden = item?.status === "pending" || item?.status === "sold"
                if (hidden) return null

                return (
                  <div
                    key={item._id}
                    className="p-3 shadow-md rounded hover:shadow-lg transition bg-white"
                  >
                    <img
                      src={item?.imageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
                      alt={item?.title || "Book image"}
                      className="w-full h-[300px] object-cover rounded"
                    />
                    <div className="flex flex-col items-center mt-3">
                      <p className="text-blue-700 font-medium text-lg text-center">{item?.title}</p>
                      <p className="text-gray-600">{item?.author}</p>
                      <p className="text-gray-800 mt-1">Price: ₹{item?.dPrice || "N/A"}</p>

                      <Link to={`/view-book/${item?._id}`} className="w-full">
                        <button className="w-full mt-3 px-3 py-2 bg-blue-900 text-white rounded hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white transition">
                          View Book
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="col-span-full text-center text-gray-500 mt-10">No books found...</p>
            )}
          </div>
        </div>
      ) : (
        // If not logged in
        <div className="grid grid-cols-3">
          <div></div>
          <div className="flex justify-center items-center flex-col w-full">
            <img
              src="https://i.pinimg.com/originals/50/05/db/5005dbccb59bc9929274c043b848eb84.gif"
              alt="no image"
              className="w-1/2"
            />
            <p className="mt-3 text-2xl text-center">
              Please{" "}
              <Link to="/login" className="text-red-500 underline">
                Login
              </Link>{" "}
              to explore more...
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
