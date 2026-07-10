import React from 'react'
import './header.css'
import { assets } from '../../assets/assets'
const Header = () => {
  return (
    <div className='header'>
        <img src={assets.header_img} alt="" className='headerimg'/>
        <div className="header-content">
            <span className="header-label">MADE BY THE BEST IN THE WORLD</span>
            <h1 className='header-heading'>“Hungry? <br /> We’ve Got You Covered </h1>
            <p className='para'>Experience our selection of dishes where tradition meets contemporary innovation. Our chefs curate unique seasonal menus for our most discerning guests.</p>
            <div className="header-btns">
              <a href='#food-display'><button className='header_btn primary'>EXPLORE NOW</button></a>
            </div>
        </div>
    </div>
  )
}

export default Header