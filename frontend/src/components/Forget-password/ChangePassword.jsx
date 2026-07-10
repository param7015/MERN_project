import React, { useState, useContext } from 'react'
import './changepassword.css'
import '../Login-popup/login.css'
import axios from 'axios'
import { StoreContext } from '../Storecontext/Storecontext'


const ChangePassword = () => {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const { url } = useContext(StoreContext)
    const [message, setmessage] = useState('')
    const [errmessage, seterrormessage] = useState('')

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url + "/api/user/changePassword", { email, newPassword });
            if (response.data.success) {
                setmessage(response.data.message);
            }

        } catch (error) {
            seterrormessage(error.response.data.message)
            console.log("Error while resetting password", error);
        }
    }

    return (
        <div className="change-password-container">
            <h3 className="change-password-title">Create New Password</h3>
            <form onSubmit={handleResetPassword} className="login-form">
                <div className="login-inputs">
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="Confirm Email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Enter New Password" 
                            required 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                </div>
                {errmessage ? <p className='err-msg'>{errmessage}</p> : null}
                {message ? <p className='done-msg'>{message}</p> : null}

                <button type="submit" className="submit-btn change-pwd-btn">
                    Reset Password
                </button>
            </form>
        </div>
    )
}

export default ChangePassword