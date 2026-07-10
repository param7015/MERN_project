import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar' >
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" srcset="" />
                <p>Add item</p>
            </NavLink>

            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" srcset="" />
                <p>List item</p>
            </NavLink>
            
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" srcset="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar