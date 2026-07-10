import React from 'react';
import './paymentfailed.css';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-failed-container">
            <div className="payment-failed-card">
                <div className="failure-icon-wrapper">
                    <svg className="failure-svg" viewBox="0 0 100 100">
                        <circle className="failure-circle" cx="50" cy="50" r="45" />
                        <path className="failure-cross-1" d="M30 30 L70 70" />
                        <path className="failure-cross-2" d="M70 30 L30 70" />
                    </svg>
                </div>
                <div className="failure-content">
                    <h2>Failed To Place Order</h2>
                    <p>We couldn't process your payment. Please place order again.</p>
                </div>
                <button className="go-back-btn" onClick={() => navigate('/')}>
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentFailed;
