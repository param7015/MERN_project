import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Home'
import Cart from './Components/Pages/cart/Cart'
import Place from './Components/Pages/place_order/Place'
import Footer from './Components/Footer/Footer'
import Invoice from './Components/Invoice'
import Notfound from './Components/Notfound/Notfound'
import PaymentSuccess from './Components/PaymentSuccess/PaymentSuccess'
import Login_popup from './Components/Login-popup/Login_popup'
import PaymentFailed from './Components/PaymentFailed/PaymentFailed'
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