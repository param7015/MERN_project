import React from 'react'
import './myorders.css'
import { StoreContext } from '../Storecontext/Storecontext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';


const Myorders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data)
        // console.log(response.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    const statusIcons = {
        "Out for Delivery": "🚚",
        "Food Processing": "🍳",
        "Delivered": "😋"
    }
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="orders">
                {data.map((order, index) => {
                    return (
                        <div className="my-orders-order">
                            <div className="order-row">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item, index) => {
                                    if (item.quantity > 0) {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}</p>
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>

                                <p className='order-status'>{statusIcons[order.status]} {order.status}</p>

                                {order.status === "Delivered" ? <button id='delivered'>&#10004; Delivered</button>
                                    : <button onClick={fetchOrders}>Track Order</button>}
                            </div>

                            <div className="download-myorders">
                                <button onClick={() => navigate("/invoice", { state: { orderId: order._id } })}> Download Invoice</button>
                                {/*// this will pass the orderId to the invoice page */}

                            </div>
                        </div>
                    )
                })}

            </div>
        </div >
    )
}

export default Myorders