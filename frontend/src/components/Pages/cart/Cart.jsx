import React, { useContext, useState, useEffect } from 'react'
import './cart.css'
import { StoreContext } from '../../Storecontext/Storecontext'
import { useNavigate } from 'react-router-dom'
import useCustomhook from '../../useCustomhook'
import axios from 'axios';


const Cart = () => {
  const { cartitems, food_list, addtocart, removefromcart, gettotal, token, url } = useContext(StoreContext)
  const navigate = useNavigate()
  const [err, setErr] = useState("");
  const { scrollToTop } = useCustomhook()
  const [loading, setLoading] = useState(false);
  const [formData, setdata] = useState({
    user: "",
    email: "",
    phone: "",
    address: "",
    street: "",
    state: "",
    zipcode: ""
  })

  const handleChange = async (e) => {
    setdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    scrollToTop();
  }, []);





  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let orderitems = []
    food_list.map((item) => {
      if (cartitems[item._id] > 0) {
        let iteminfo = item;
        iteminfo["quantity"] = cartitems[item._id];
        orderitems.push(iteminfo);
      }
    })

    let orderdata = {
      address: formData,
      items: orderitems,
      amount: gettotal(),
    }

    const response = await axios.post(url + "/api/order/placeorder", orderdata, { headers: { token } })
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url); // it changes the url of the browser
      setLoading(false);
    } else {
      setLoading(false);
      navigate('/cancel')
    }

    setLoading(false);
  }


  return (
    <div className='cart-container'>
      {gettotal() === 0 ? (
        <div className='cart-empty'>
          <img src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-illustration-svg-download-png-3385483.png" alt="Empty Cart" className='empty-cart-img' />
          <h1>Your cart is empty</h1>
          <p>Treat yourself to something delicious!</p>
          <button onClick={() => navigate('/')}>GO TO MENU</button>
        </div>
      ) : (
        <div className='cart-content'>
          <div className="cart-left">
            <p >Shopping Bag</p>
            <div className="cart-items-list">
              {food_list.map((item, index) => {
                if (cartitems[item._id] > 0) {
                  return (
                    <div key={item._id} className="cart-item-card">
                      <img src={url + "/images/" + item.image} alt={item.name} className='item-image' />
                      <div className="item-details">
                        <div className="item-info">
                          <p className='item-name'>{item.name}</p>
                          <p className='item-category'>{item.category}</p>
                        </div>
                        <div className="item-price-qty">
                          <p className='item-price'>${item.price}</p>
                          <div className="quantity-controls">
                            <button onClick={() => removefromcart(item._id)} className='qty-btn'>-</button>
                            <span className='qty-count'>{cartitems[item._id]}</span>
                            <button onClick={() => addtocart(item._id)} className='qty-btn'>+</button>
                          </div>
                          <span className='item-total'>${item.price * cartitems[item._id]}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null;
              })}
            </div>
          </div>

          <div className="cart-right">
            <div className="order-summary-card">
              <p >Order Summary</p>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${gettotal()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>$4</span>
                </div>
                <hr className='summary-divider' />
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${gettotal() + 4}</span>
                </div>
              </div>


              <form onSubmit={handleSubmit} >
                <div className="delivery-info-section">
                  <h3 className='subsection-title'>Delivery Information</h3>
                  <div className="form-group">
                    <input type="text" placeholder='Your name' name="user" value={formData.user} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder='Email Address' name='email' value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder='Street' name='street' value={formData.street} onChange={handleChange} />
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder='State' name='state' value={formData.state} onChange={handleChange} />
                    <input type="text" placeholder='Zip Code' name='zipcode' value={formData.zipcode} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder='Phone' name='phone' value={formData.phone} onChange={handleChange} />

                  </div>
                  <textarea placeholder='Detailed Address' name='address' value={formData.address} onChange={handleChange} className='address-textarea' />
                </div>

                <div className="loading-container">
                  {loading ? <p >Please wait...</p> : null}
                  <p className='userdetails' >{err}</p>
                </div>
                <button type='submit' className='checkout-btn' >PROCEED TO CHECKOUT</button>
              </form>


            </div>

          </div>

        </div>
      )}
    </div>
  )
}

export default Cart