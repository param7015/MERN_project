import React from 'react'
import './app-download.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Appdownload = () => {
  return (
    <div>
      <div className="app-download" id='app-download' >
            <p>For better experiance download our app on Play store or APP Store</p>
            <div className="store-icons">
              
                <a href="https://play.google.com/store/apps/details?id=com.application.zomato"><img src={assets.play_store} alt="" /></a>
                <a href="https://apps.apple.com/in/app/zomato-food-delivery-dining/id434613896"><img src={assets.app_store} alt="" /></a>
            </div>
        </div>
      
    </div >
  )
}

export default Appdownload