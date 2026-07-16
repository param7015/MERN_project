import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../Storecontext/Storecontext'
import axios from 'axios'


const Navbar = ({ setshowlogin }) => {


    const { gettotal, input, setinput, token, settoken, url, admin_url } = useContext(StoreContext)
    const navigate = useNavigate();

    const [sidebar, setsidebar] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("token")
        settoken("")
        setshowlogin(false)
    }

    const [user, setuser] = useState({})

    useEffect(() => {
        const getuser = async () => {
            const response = await axios.get(url + '/api/user/getuser', { headers: { token } })
            setuser(response.data.user)
            // console.log(response.data.user)
        }
        getuser()
    }, [token])

    return (

        <div className="navbar">

            <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>

            <ul className="navbar-menu">
                <Link to='/' >Home</Link>
                <a href='#explore-menu'>Explore</a>
                <a href='#app-download'>Mobile app</a>
                <a href='#footer'>About Us</a>
                <a href={admin_url} target='_blank'>Admin</a>

            </ul>

            <div className="navbar-right">
                <div className="navbar-search-container">
                    {/* <input
                        type="text"
                        placeholder='search food items...'
                        className='search-bar'
                        onChange={(e) => setinput(e.target.value)}
                        value={input}
                    /> */}
                    <p>
                        <img src={assets.search_icon} alt="" className='search-icon' onClick={() => navigate('/search')} />
                    </p>
                </div>
                <div className="navbar-cart-container">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={gettotal() === 0 ? "" : "dot"} ></div>
                </div>
                <div className="sign-in">
                    <div className="navbar-profile">
                        {!token ? (<button onClick={() => setshowlogin(prev => !prev)}>Sign In</button>) 
                        // im doing (prev => !prev) because i havent passed showlogin as props
                        : (
                        <div>
                            <div onClick={() => setsidebar(prev => !prev)}>
                                {user? <h1 className='profile-initial'>{user?.name?.charAt(0)?.toUpperCase()}</h1>
                                : <img src={assets.profile_icon} alt="" srcset="" />}
                            </div>

                            {sidebar && (
                                <div className="navbar-profile-dropdown">
                                    <h2 className='profile-initial' >{user?.name?.charAt(0)?.toUpperCase()}</h2>
                                    <p className='username'>{user?.name}</p>
                                    <p className='useremail'>{user?.email}</p>
                                    <li className='listyle' onClick={() => navigate('/myorders')} ><img src={assets.bag_icon} alt="" />My orders</li>
                                    <hr />
                                    <li className='listyle' onClick={handleLogout}><img src={assets.logout_icon} alt="" />Logout</li>
                                </div>
                            )}
                        </div>
                        )}

                    </div>

                </div>


            </div>
            

        </div >
    )
}

export default Navbar