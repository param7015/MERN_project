import React, { useContext } from 'react'
import './place.css'
import { StoreContext } from '../../Storecontext/Storecontext'
import { useNavigate } from 'react-router-dom'
import html2pdf from "html2pdf.js";

const Place = () => {
 const {gettotal}= useContext(StoreContext)
 const navigate = useNavigate()

    // html2pdf().from(invoiceRef.current).save("invoice.pdf");
 
  return (
    <form className='place-order'>
      <div className="place-order-left" >
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email Address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${gettotal()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$4</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>TOTAL</p>
            <p>${gettotal() + 4}</p>
          </div>
        </div>
        <button onClick={()=>navigate('/invoice')} className='bttn'>PROCCED TO PAYMENT</button>
      </div>
    </form>
  )
}

export default Place