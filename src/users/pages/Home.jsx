import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faMagnifyingGlass, faBookOpen, faShieldHalved, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/ContextSearch'
import { toast, ToastContainer } from 'react-toastify'
import { serverUrl } from '../../services/serverUrl'

const Home = () => {
  const navigate = useNavigate()
  const [homeBook, setHomeBook] = useState([])
  const [token, setToken] = useState("")
  const { searchKey, setsearchKey } = useContext(searchKeyContext)

  const getAllHomeBooks = async () => {
    const result = await homeBookApi()
    if (result.status === 200) setHomeBook(result.data)
  }

  useEffect(() => {
    getAllHomeBooks()
    const t = sessionStorage.getItem("token")
    if (t) setToken(t)
  }, [])

  const searchBook = () => {
    const t = sessionStorage.getItem("token")
    if (!searchKey) {
      toast.info("Please enter a book title")
    } else if (!t) {
      toast.info("Please login to search")
      setTimeout(() => navigate('/login'), 2500)
    } else {
      navigate('/all-books')
    }
  }

  const categories = [
    { label: "Novel", emoji: "📖" },
    { label: "Philosophy", emoji: "🧠" },
    { label: "Romance", emoji: "💕" },
    { label: "Autobiography", emoji: "✍️" },
    { label: "Non-Fiction", emoji: "📰" },
    { label: "Politics", emoji: "🏛️" },
  ]

  const features = [
    { icon: faBookOpen, title: "Huge Collection", desc: "Thousands of books across every genre and category" },
    { icon: faShieldHalved, title: "Secure Payments", desc: "Your transactions are protected with Stripe" },
    { icon: faTruck, title: "Sell Your Books", desc: "Turn your old books into cash easily" },
    { icon: faStar, title: "Trusted Sellers", desc: "Every book is reviewed before listing" },
  ]

  return (
    <>
      <Header />

      {/* ─── HERO ─── */}
      <section
        className="relative flex justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80')",
          minHeight: "85vh"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 flex flex-col items-center text-center text-white px-4 max-w-3xl">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">Welcome to Book Store</span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Every Book Has<br />a Story to Tell
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl">
            Discover, buy, and sell second-hand books. Give books a new home and new readers a great deal.
          </p>

          {/* Search Bar */}
          <div className="flex w-full max-w-lg bg-white rounded-full overflow-hidden shadow-2xl">
            <input
              type="text"
              placeholder="Search for a book title..."
              value={searchKey}
              onChange={(e) => setsearchKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchBook()}
              className="flex-1 px-6 py-4 text-gray-800 text-base focus:outline-none"
            />
            <button
              onClick={searchBook}
              className="bg-amber-500 hover:bg-amber-600 transition px-6 py-4 text-white font-semibold rounded-r-full"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />Search
            </button>
          </div>

          <div className="flex gap-4 mt-8">
            <Link to="/all-books">
              <button className="bg-amber-500 hover:bg-amber-600 transition text-white font-semibold px-8 py-3 rounded-full shadow-lg">
                Browse Books
              </button>
            </Link>
            <Link to="/register">
              <button className="border-2 border-white hover:bg-white hover:text-gray-900 transition text-white font-semibold px-8 py-3 rounded-full">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-sm animate-bounce">
          <span>Scroll down</span>
          <span>↓</span>
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <section className="bg-amber-500 text-white py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6">
          {[
            { value: "10,000+", label: "Books Listed" },
            { value: "5,000+", label: "Happy Readers" },
            { value: "500+", label: "Sellers" },
            { value: "4.8★", label: "Average Rating" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-sm mt-1 font-medium text-amber-100">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">Fresh Picks</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">New Arrivals</h2>
          <p className="text-gray-500 mt-2">Explore the latest books added by our sellers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {homeBook?.length > 0 ? (
            homeBook.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl || `${serverUrl}/upload/${item.uploadimages?.[0]}` || "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={item.tittle}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Link to={`/view-book/${item._id}`}>
                      <button className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-amber-500 text-white px-5 py-2 rounded-full font-semibold shadow-lg">
                        View Book
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 text-base truncate">{item.tittle}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.author}</p>
                  <div className="flex justify-center items-center gap-2 mt-3">
                    {item.price && <span className="text-gray-400 line-through text-sm">₹{item.price}</span>}
                    <span className="text-amber-600 font-bold text-lg">₹{item.dPrice}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-16">
              <p className="text-5xl mb-4">📚</p>
              <p className="text-gray-500 text-lg">No books yet — be the first to list one!</p>
              <Link to="/profile">
                <button className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-600 transition">
                  Sell a Book
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link to="/all-books">
            <button className="bg-gray-900 text-white px-10 py-3 rounded-full font-semibold hover:bg-amber-500 transition-all duration-300 shadow-md">
              Explore All Books →
            </button>
          </Link>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="text-center mb-10">
          <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">Browse By Genre</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <Link to="/all-books" key={cat.label}>
              <div className="flex flex-col items-center justify-center bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-400 rounded-2xl p-6 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
                <span className="text-4xl mb-2">{cat.emoji}</span>
                <p className="text-sm font-semibold text-gray-700">{cat.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-16 px-6 md:px-20 bg-gray-900 text-white">
        <div className="text-center mb-12">
          <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase">Why Us</span>
          <h2 className="text-4xl font-bold mt-2">Why Choose Book Store?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition">
              <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={f.icon} className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SELL BANNER ─── */}
      <section
        className="relative py-24 px-6 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Have Books to Sell?</h2>
          <p className="text-gray-300 text-lg mb-8">List your books in minutes and reach thousands of readers. Turn your shelf into cash!</p>
          <Link to={token ? "/profile" : "/register"}>
            <button className="bg-amber-500 hover:bg-amber-600 transition text-white font-bold px-10 py-4 rounded-full text-lg shadow-xl">
              Start Selling Now
            </button>
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 px-6 md:px-20 bg-amber-50">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">What Readers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Priya M.", text: "Found amazing books at half the price! The platform is so easy to use.", stars: 5 },
            { name: "Rahul K.", text: "Sold 10 books in a week. Great experience and fast process!", stars: 5 },
            { name: "Anjana S.", text: "Love the collection. Got rare books I couldn't find anywhere else.", stars: 4 },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl transition">
              <div className="text-amber-400 text-xl mb-3">
                {"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg mb-2">
                {t.name[0]}
              </div>
              <p className="font-semibold text-gray-900">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
      <Footer />
    </>
  )
}

export default Home
