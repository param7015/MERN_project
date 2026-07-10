import React, { useState, useEffect } from 'react';
import './PaymentSuccess.css';
import { useNavigate } from 'react-router-dom';
import useCustomhook from '../useCustomhook';

const PaymentSuccess = () => {
    const { scrollToTop } = useCustomhook()
    const navigate = useNavigate()

    const [time, settime] = useState(5)

    useEffect(() => {
        scrollToTop()

        const timer = setInterval(() => {
            settime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/myorders')
                    return 0;
                }
                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(timer);


    }, [])

    return (
        <div className="ps-overlay">
            <div className="ps-card">
                <div className="ps-icon-box">
                    <svg className="ps-svg" viewBox="0 0 100 100">
                        <circle className="ps-circle" cx="50" cy="50" r="45" />
                        <path className="ps-check" d="M30 50 L45 65 L70 35" />
                    </svg>
                    <div className="confetti-container">
                        <span className="confetti"></span>
                        <span className="confetti"></span>
                        <span className="confetti"></span>
                        <span className="confetti"></span>
                        <span className="confetti"></span>
                        <span className="confetti"></span>
                    </div>
                </div>
                <h2 className="ps-title">Order Confirmed</h2>
                <p className="ps-text">Your payment is done. You can download your reciept or go to your orders.</p>
                <div className="ps-footer">
                    <button className="ps-btn-primary" onClick={() => navigate('/myorders')}>View Orders Page In {time}</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
