import React from 'react'
import './orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({ url, isAuthenticated }) => {
  const [orders, setorders] = useState([])

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/listorders")
    if (response.data.success) {
      setorders(response.data.data)
      console.log(response.data.data)
    } else {
      toast.error(response.data.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", { orderId, status: event.target.value })
    // console.log(response.data)
    if (response.data.success) {
      fetchOrders()
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <>
      {isAuthenticated ? (
        <div className='order-add'>
          <h1>Order Management</h1>
          <div className='order-list'>
            {orders.map((order, index) => (
              <div className='order-item' key={index}>
                <img src={assets.parcel_icon} alt="" srcset="" />
                <div>
                  <p className="order-item-food">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity
                      } else {
                        return item.name + " x " + item.quantity + ", "
                      }
                    })}
                  </p>
                  <p className='order-item-name'>
                    Name: {order.address.user}
                  </p>
                  <div className='order-item-address'>
                    <p>Address: {order.address.street + ", "}</p>
                    <p>{order.address.state + ", " + order.address.zipcode}</p>
                  </div>
                  <p className="order-item-phone">Phone: {order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>${order.amount}</p>
                <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className='not-sign-in'>Please Login To View Orders !</p>
      )}
    </>
  )
}

export default Orders