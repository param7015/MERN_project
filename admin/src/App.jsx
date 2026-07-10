import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/add/Add'
import List from './pages/list/List'
import Orders from './pages/orders/Orders'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import Login from './components/Admin_login/Login'

const App = () => {

  const url = "http://localhost:5000";
  const [showlogin, setshowlogin] = useState(false)
  const [isAuthenticated, setisAuthenticated] = useState(false)


  return (
    <>
      {showlogin ? (<Login setshowlogin={setshowlogin} url={url} setisAuthenticated={setisAuthenticated}/>)
        : (<>
          <ToastContainer />
          <Navbar url={url} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated} setshowlogin={setshowlogin}/>
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path='/' element={<Navigate to='/add'replace/>} />
              <Route path='/add' element={<Add url={url} isAuthenticated={isAuthenticated}/>} />
              <Route path='/list' element={<List url={url} isAuthenticated={isAuthenticated}/>} />
              <Route path='/orders' element={<Orders url={url} isAuthenticated={isAuthenticated}/>} />
            </Routes>
          </div>
          <ToastContainer />
        </>
        )}
    </>
  )
}

export default App