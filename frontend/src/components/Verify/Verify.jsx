import React, { useContext } from 'react'
import './verify.css'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../Storecontext/Storecontext'
import axios from 'axios'


const Verify = () => {
    
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);


    const verifypayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId })
        // console.log(response);
        if (response.data.success) {
            navigate("/paymentsuccess")
        } else {
            navigate("/cancel")
        }
    }

    useEffect(() => {
        verifypayment()
    }, [])


    return (
        <div className="verify-spinner-wrapper">
            <div className="verify-spinner"></div>
            <p className="verify-spinner-text">Verifying your payment...</p>
        </div>
    )
}

export default Verify