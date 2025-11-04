import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Pages
import Auth from './pages/Auth'
import PageNotFound from './pages/PageNotFound'
import Home from './users/pages/Home'
import AllBooks from './users/pages/AllBooks'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import EditProfile from './users/components/EditProfile'
import ViewBook from './users/pages/ViewBook'
import Careers from './users/pages/Careers'

// Admin Pages
import AdminHome from './admin/components/AdminHome'
import AdminCareers from './admin/pages/AdminCareers'
import AdminSettings from './admin/pages/AdminSettings'
import AdminBook from './admin/pages/AdminBook'

// Components
import PreLoader from './components/PreLoader'
import PaymentError from './users/pages/PaymentError'
import PaymentSucess from './users/pages/PaymentSucess'

function App() {
  const [isHomeLoading,setIsHomeLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setIsHomeLoading(false)
    },5000)
  },[])

  return (
    <Routes>
      <Route path="/" element={isHomeLoading ? <PreLoader /> : <Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth register />} />
      <Route path="/all-books" element={<AllBooks />} />
      <Route path="/view-book/:id" element={<ViewBook/>} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/careers" element={<Careers/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
       <Route path="/edit-profile" element={<EditProfile/>} />
      <Route path="/payment-error" element={<PaymentError/>} />
      <Route path="/payment-sucess" element={<PaymentSucess />} />
      <Route path="/admin-home" element={isHomeLoading ? <PreLoader /> : <AdminHome />} />
      <Route path="/admin-books" element={<AdminBook/>} />
      <Route path="/admin-careers" element={<AdminCareers />} />
      <Route path="/admin-settings" element={<AdminSettings />} />
    </Routes>
  )
}

export default App
