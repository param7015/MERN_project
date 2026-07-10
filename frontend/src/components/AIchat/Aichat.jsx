import React from 'react'
import './aichat.css'
import { StoreContext } from '../Storecontext/Storecontext'
import { useState, useContext, useRef, useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'

const Aichat = () => {

  const { url, cartitems, removefromcart, addtocart } = useContext(StoreContext)

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]); // stores conversation
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setMessage("");

    setChat((prev) => [
      ...prev,
      { role: "user", text: userMsg }
    ]);

    setLoading(true);

    try {
      const res = await axios.post(`${url}/api/food/chat`, {
        message: userMsg,
      });

      console.log("AI RESPONSE:", res.data);

      if (res.data.type === "chat") {
        setChat((prev) => [
          ...prev,
          { role: "ai", text: res.data.message }
        ]);
      } else {
        const foodItems = res.data?.data || [];
        if (foodItems.length > 0) {
          setChat((prev) => [
            ...prev,
            { role: "ai", text: res.data.message || "Here is what I found:", foodItems: foodItems }
          ]);
        } else {
          setChat((prev) => [
            ...prev,
            { role: "ai", text: res.data.message || "No results found." }
          ]);
        }
      }

    } catch (error) {
      console.log("FULL ERROR:", error);
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Backend not responding ❌ Check server",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {show ? (
        <div className="chat-window-glass">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar">🤖</span>
              <div>
                <h4>AI Assistant</h4>
                <p>Online</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setshow(false)}>✖</button>
          </div>

          <div className="chat-box">
            {chat.length === 0 && (
              <div className="welcome-message">
                Hello! How can I help you today?
              </div>
            )}
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.role === "user" ? "user" : "ai"} ${msg.foodItems ? "has-cards" : ""}`}
              >
                <div className="message-content">{msg.text}
                  {msg.foodItems && msg.foodItems.length > 0 && (
                    <div className="ai-food-cards">
                      {msg.foodItems.map((food, idx) => (
                        <div key={idx} className="ai-food-card">
                          <img src={`${url}/images/${food.image}`} alt={food.name} />
                          <div className="ai-food-info">
                            <h5>{food.name}</h5>
                            <p>${food.price}</p>
                            <div className="ai-cart-actions">
                              {!cartitems[food._id]?(
                                <button onClick={() => addtocart(food._id)} className='ai-add-btn'>Add</button>
                              ):(
                                <div className='ai-cart-controls'>
                                  <img onClick={() => removefromcart(food._id)} src={assets.remove_icon_red} alt='-' />
                                  <span>{cartitems[food._id]}</span>
                                  <img onClick={() => addtocart(food._id)} src={assets.add_icon_green} alt='+' />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message ai typing-indicator">
                <div className="message-content">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BOX */}
          <div className="input-area">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="send-btn" disabled={!message.trim()}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button className='chat-fab-btn' onClick={() => setshow(true)}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Aichat;