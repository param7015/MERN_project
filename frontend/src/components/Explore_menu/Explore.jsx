import React from 'react'
import './explore.css'
import { menu_list } from '../../assets/assets'
const Explore = ({ category, setcategory }) => {
    return (
        <div className='explore_menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            

            <p className='explore-menu-text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur ut harum aliquid exercitationem delectus velit illum praesentium non reprehenderit esse.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setcategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p className='item-name'>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr className='explore-hr' />
        </div>
    )
}

export default Explore