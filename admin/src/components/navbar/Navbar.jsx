import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
// import toast from 'react-toastify'

const Navbar = ({ setisAuthenticated, isAuthenticated, url, setshowlogin }) => {

  const [user, setuser] = useState({})
  const [loading, setloading] = useState(false)
  const [sidebarprofile, setsidebarprofile] = useState(false)

  useEffect(() => {
    getProfile()
  }, [])
  console.log("isAuthenticated", isAuthenticated)

  // getting the profile of the user to show profile and logout option
  const getProfile = async () => {

    setloading(true)
    try {
      const response = await axios.get(
        url + "/api/admin/getprofile",
        { withCredentials: true }
      );
      console.log("profile is getting");
      setuser(response.data.user);
      setisAuthenticated(true);
    } catch (error) {
      try {
        const refreshResponse = await axios.post(
          url + "/api/admin/refresh",
          {},
          { withCredentials: true }
        );

        if (refreshResponse.data.success) {
          const retryResponse = await axios.get(
            url + "/api/admin/getprofile",
            { withCredentials: true }
          );

          setuser(retryResponse.data.user);
          setisAuthenticated(true);
        }
        else {
          console.log("i runn");
          setuser(null);
          setisAuthenticated(false);
        }
      } catch (err) {
        console.log("now catch will run")
        setuser(null);
        setisAuthenticated(false);
      }
    }
    finally {
      setloading(false)
    }
  };

  // handling the logout of the user
  const handleLogout = async () => {
    setloading(true);

    try {
      const response = await axios.post(
        url + "/api/admin/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setsidebarprofile(false);
        setuser(null);
        setisAuthenticated(false);
      }

    } catch (error) {
      console.log(error);
      setisAuthenticated(false);
    } finally {
      setloading(false);

    }
  };

  return (
    <div>
      <div className="navbar">
        <img className='logo' src={assets.logo} alt="" />

        {loading ? (
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        ) : (
            !isAuthenticated ? (
              <div>
                <p onClick={() => { setshowlogin(prev => !prev) }} className='sign-in-btn'>Sign In</p>
              </div>
            ) : (
              <div className='profile-container'>
                <p onClick={() => { setsidebarprofile(prev => !prev) }}>{user?.name?.charAt(0).toUpperCase()}</p>
              </div>
            )
          )}

        {sidebarprofile ? (
          <div className='sidebarprofile'>
            <div className='profile-top'>
              <p className='profile-avatar-large'>{user?.name?.charAt(0).toUpperCase()}</p>
              <p className='profile-close' onClick={() => { setsidebarprofile(prev => !prev) }}>&#x2715;</p>
            </div>
            <div className='profile-info'>
              <p className='profile-name'>{user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}</p>
              <p className='profile-email'>{user?.email}</p>
            </div>
            <button className='profile-logout' onClick={handleLogout}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              {loading ? "Please Wait..." : "Logout"}
            </button>
          </div>
        ) : (null)}
      </div>
    </div>
  )
}

export default Navbar