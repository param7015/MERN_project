import React, { useContext, useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../components/Storecontext/Storecontext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import ForgetPassword from '../Forget-password/ForgetPassword'

const Login_popup = ({ setshowlogin }) => {
    const [currstate, setcurrstate] = useState("Login")
    const [erroroccured, seterroroccured] = useState("")
    const [loading, setloading] = useState(false)
    const { url, token, settoken } = useContext(StoreContext)
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
            newurl += "/api/user/login"
        }
        else {
            newurl += "/api/user/register"
        }

        // backend sending data to server
        const response = await axios.post(newurl, data)
        if (response.data.success) {
            settoken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setshowlogin(prev => !prev)
            setloading(false)
            toast.success("Login successful")
        }
        else {
            seterroroccured(response.data.message)
            toast.error(response.data.message)
            setloading(false)
        }
    }

    return (
        <div className="login-popup-overlay">
            <div className='login-popup-card'>

                <div className="login-popup-right">
                    {currstate === "Forgot Password" ? (
                        <ForgetPassword setcurrstate={setcurrstate} setshowlogin={setshowlogin} />
                    ) : (
                        <>
                            <div className="login-right-header">
                                <p className='cross' onClick={() => { setshowlogin(prev => !prev) }}>&#x2715;</p>
                                <h4>{currstate === "Login" ? "Welcome Back!" : "Join Us Today!"}</h4>
                                <h2 className='heading'>{currstate}</h2>
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
                                            placeholder='Create Password'
                                            required
                                            name='password'
                                            value={data.password}
                                            onChange={onchagehandler}
                                        />
                                    </div>
                                    {currstate === "Login" && (
                                        <p className='forgot-password-link' onClick={() => setcurrstate("Forgot Password")}>Forgot Password?</p>
                                    )}
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
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login_popup