import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" className='footerlogo' />
                    <p>Experience the art of seasonal dining at <span style={{ color: 'tomato', fontWeight: 700 }}>TOMATO</span> , where every plate tells a story of the earth. Our chefs partner directly with nearby farmers to bring you food crafted from ingredients harvested at their peak. We focus on bold flavors and textures that awaken the senses. Whether you’re here for a quick bite or a delicious meal, expect honest food prepared with uncompromising quality and a touch of culinary creativity.</p>
                    <div className="social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <div className="footers">
                            <Link className='footer_links' to='/' >Home</Link>
                            <Link className='footer_links' to='/' >About</Link>
                            <Link className='footer_links' to='/' >Contact Us</Link>
                            <Link className='footer_links' to='/' >Mobile app</Link>
                        </div>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+91-798-369-1956</li>
                        <li>tomato@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr className='hr-tag' />
            <p>Copyyright 2026 @ - All rights are reserved.</p>
        </div>
    )
}

export default Footer