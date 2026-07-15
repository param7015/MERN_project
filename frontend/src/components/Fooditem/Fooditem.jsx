import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './fooditem.css'
import { StoreContext } from '../Storecontext/Storecontext'

const Fooditem = ({ id, name, price, image, description }) => {

  const { cartitems, addtocart, removefromcart, url } = useContext(StoreContext)

  let arr = new Array(5).fill(0)
  const [rating, setrating] = useState()
  const [hover, sethover] = useState()


  return (
    <div className='food-item'>
      <img className='food-item-image' src={url + "/images/" + image} alt="" />

      <div className="food-item-info">
        <p className='food-name'>{name}</p>
        
        <div className="star-rating">
          {
            arr.map((Item, index) => {
              return (
                <span
                  className={index < rating || index < hover ? "color" : "nocolor"}
                  key={index}
                  onClick={() => setrating(index + 1)}
                  onMouseEnter={() => sethover(index + 1)}
                  onMouseLeave={() => sethover(0)}
                >
                  &#9733;
                </span>
              )
            })
          }
        </div>
      </div>
      <div className="food-info">
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
      <div className="food-item-image-container">
        
        {
          !cartitems?.[id]
            // ? <img className='add' onClick={() => addtocart(id)} src={assets.add_icon_white} alt="" />
            ? <h5 className='add' onClick={() => addtocart(id)}> + Add to Cart</h5>
            : <div className='food-item-component'>
              <img className='red-icon' onClick={() => removefromcart(id)} src={assets.remove_icon_red} alt='' />
              <p>{cartitems[id]}</p>
              <img className='red-icon' onClick={() => addtocart(id)} src={assets.add_icon_green} alt='' />
            </div>
        }
      </div>
    </div>
  )
}

export default Fooditem