import React, { useContext, useState } from 'react';
import '../Login-popup/login.css';
import axios from 'axios';
import { StoreContext } from '../Storecontext/Storecontext';
import ChangePassword from './ChangePassword';

const ForgetPassword = ({ setcurrstate, setshowlogin }) => {
    const [email, setEmail] = useState('');
    const [Email_Password, setEmail_Password] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setloading] = useState(false);
    const [erroroccured, seterroroccured] = useState("");
    const { url } = useContext(StoreContext)

    const handleSendOtp = async (e) => {
        e.preventDefault();
        // Mock sending OTP

        try {
            setloading(true)
            const response = await axios.post(url + "/api/user/forgot-password", { email });
            setloading(false)
            setOtpSent(true);
            
        } catch (error) {
            console.log(error);
            setloading(false)
            seterroroccured(error.response.data.message)
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mock verify OTP
        try {
            const response = await axios.post(url + "/api/user/verify-otp", { email, otp });
            if (response.data.success) {
                setOtpSent(false);
                setEmail_Password(true)
            }
            console.log("OTP Verified", otp);

        } catch (error) {
            seterroroccured(error.response.data.message)
        }
    };

    return (
        <>
            <div className="login-right-header">
                <p className='cross' onClick={() => { setshowlogin(prev => !prev) }}>&#x2715;</p>
                <h2 className='heading'>Forgot Password</h2>
                <p>Enter your email to receive OTP</p>
            </div>

            {!Email_Password ? (
                <>
                    <form onSubmit={otpSent ? handleSubmit : handleSendOtp} className='login-form'>
                        <div className="login-inputs">
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={otpSent}
                                />
                            </div>
                            {otpSent && (
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder='Enter OTP'
                                        required
                                        name='otp'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <p className='err-msg'>{erroroccured}</p>
                        <button type='submit' className='submit-btn' disabled={loading}>
                            {loading ? "Sending..." : otpSent ? "Verify OTP" : "Send OTP"}
                        </button>
                    </form>
                </>
            ) : (<ChangePassword />)
            }

            <div className="login-toggle">
                <p>Remember your password? <span onClick={() => { setcurrstate("Login") }}>Login</span></p>
            </div>
        </>
    );
};

export default ForgetPassword;
