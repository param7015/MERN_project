import React from 'react'
import './login.css'
import { useState } from 'react'
import axios from "axios"

const Login = ({ setshowlogin, url, setisAuthenticated }) => {

    const [currstate, setcurrstate] = useState("Login")
    const [loading, setloading] = useState(false)
    const [erroroccured, seterroroccured] = useState("")
    const [message, setmessage] = useState("")

    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onchagehandler = (e) => {
        setdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        let newurl = url

        if (currstate === "Login") {
            newurl += "/api/admin/login"
        }
        else {
            newurl += "/api/admin/register"
        }

        const response = await axios.post(newurl, data , {withCredentials: true})
        
        if(response.data.success){
            setisAuthenticated(prev => !prev)
            setloading(false)
            setmessage(response.data.message)
            setshowlogin(prev => !prev)
        }
        else{
            setloading(false)
            seterroroccured(response.data.message)
        }

    }

    return (
        <div className="login-popup-overlay">
            <div className='login-popup-card'>

                <div className="login-popup-right">
                    <div className="login-right-header">
                        <div className="heading">
                            <h2>Admin Panel</h2>
                            <p className='cross' onClick={() => { setshowlogin(prev => !prev) }}>&#x2715;</p>
                        </div>
                        <h4 className='heading'>{currstate}</h4>
                        <p>Enter your details here </p>
                    </div>

                    <form onSubmit={handlesubmit} className='login-form'>
                        <div className="login-inputs">

                            {currstate === "Sign Up" && (
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder='Enter you name'
                                        required
                                        name="name"
                                        value={data.name}
                                        onChange={onchagehandler}
                                    />
                                </div>
                            )}
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    name='email'
                                    value={data.email}
                                    onChange={onchagehandler}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    name='password'
                                    value={data.password}
                                    onChange={onchagehandler}
                                />
                            </div>
                            <p className='acc-created-msg'>{message}</p>
                            <p className='error-msg'>{erroroccured}</p>
                        </div>

                        <button type='submit' className='submit-btn' disabled={loading}>
                            {loading ? "Processing..." : (currstate === "Sign Up" ? "Create Account" : "Login")}
                        </button>

                        <div className="login-condition">
                            <input type="checkbox" required className='check' />
                            <p>I agree to the <span>Terms & Conditions</span></p>
                        </div>
                    </form>

                    <div className="login-toggle">
                        {currstate === "Login"
                            ? <p>Don't have an account? <span onClick={() => { setcurrstate("Sign Up") }}>Sign Up</span></p>
                            : <p>Already have an account? <span onClick={() => { setcurrstate("Login") }}>Login</span></p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login