import React, { useState, useEffect } from 'react'
import './list.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url, isAuthenticated }) => {


  const [list, setlist] = useState([])
  const [loading, setloading] = useState(true)

  const fetchList = async () => {
    setloading(true)
    const response = await axios.get(`${url}/api/food/list`, { withCredentials: true })
    if (response.data.success) {
      setlist(response.data.data)
    }
    else {
      toast.error(response.data.message)
    }
    setloading(false)
  }


  const [status, setstatus] = useState("Open")

  const adminStatusHandler = async (event) => {
    const value = event.target.value
    setstatus(value)
    
    try {
      const response = await axios.post(`${url}/api/food/adminStatus`, { isOpen: value === "Open" ? true : false }, { withCredentials: true })
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }




  const removefood = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, { id })
    await fetchList()
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      {loading ? (
        <div className="list-loader">
          <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
      ) :
        isAuthenticated ? (
          <div className='list add flex-col' >
            <div className="top-bar-list">
              <p>All Food List</p>

              <div className="restaurant-status">
                <h4>Restaurant Status:</h4>

                <select onChange={adminStatusHandler} value={status} className='admin-status'>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="list-table">
              <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Actions</b>
              </div>
              {list.map((item, index) => {
                return (
                  <div className="list-table-format" key={index}>
                    <img src={`${url}/images/` + item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p onClick={() => { removefood(item._id) }} className='cursor'>X</p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <p className='not-sign-in'>Please Login To List Items !</p>
        )}
    </>
  )
}

export default List
