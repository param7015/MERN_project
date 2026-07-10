import { useState } from 'react'
import './notfound.css'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate = useNavigate()
    let arr = new Array(5).fill(0)
    const [rating, setrating] = useState()
    const [hover, sethover] = useState()
    const messages = {
        1: "Very Bad 😞",
        2: "Bad 😕",
        3: "Okay 😐",
        4: "Good 🙂",
        5: "Excellent 🤩"
    };
    // console.log(index)
    return (
        <div className='notfound'>
            <div className='starrating'>
                <h2>ratin:{rating}</h2>
                {
                    arr.map((Item, index) => {
                        return (
                            <span
                                className={index < rating || index < hover ? "color" : "nocolor"}
                                key={index}
                                onClick={() => setrating(index + 1)}
                                onMouseEnter={() => sethover(index + 1)}
                                onMouseLeave={() => sethover(0)}
                            >
                                &#9733;
                            </span>
                        )
                    })
                }
                <h2>{messages[rating] || "please rate "}</h2>
                
            </div>
            
            <img src="https://imgs.search.brave.com/wMQRAZ9SITNL0yp3kAfJB4Z-3YX2CzWez4I35Y0pL64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvcGFnZS1u/b3QtZm91bmQtaWxs/dXN0cmF0aW9uLXN2/Zy1wbmctZG93bmxv/YWQtNDYxMDA5MS5w/bmc" alt="" srcset="" />
            <h1>Oops! looks like page does not exist</h1>
            <button onClick={() => navigate('/')} >RETURN TO HOME</button>
        </div >
    )
}

export default Notfound