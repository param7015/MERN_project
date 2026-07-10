import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import Cart from './components/Pages/cart/Cart'
import Place from './components/Pages/place_order/Place'
import Footer from './components/Footer/Footer'
import Invoice from './components/Invoice'
import Notfound from './components/Notfound/Notfound'
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess'
import Login_popup from './components/Login-popup/Login_popup'
import PaymentFailed from './components/PaymentFailed/PaymentFailed'
import Myorders from './components/My_orders/myorders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './components/Verify/Verify'




const App = () => {
  const [showlogin, setshowlogin] = useState(true)
  return (
    <>
      {showlogin ? (
        <>
          <Navbar setshowlogin={setshowlogin} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Place />} />
            <Route path='/invoice' element={<Invoice />} />
            <Route path='/success' element={<PaymentSuccess />} />
            <Route path='/cancel' element={<PaymentFailed />} />
            <Route path='/myorders' element={<Myorders />} />
            <Route path='/paymentsuccess' element={<PaymentSuccess />} />
            <Route path="/verify" element={<Verify />} />
            <Route path='*' element={<Notfound />} />
          </Routes>

          <Footer />
        </>)
        : (
          <Login_popup setshowlogin={setshowlogin} />
        )}
        
        <ToastContainer />
    </>

  )
}

export default App
