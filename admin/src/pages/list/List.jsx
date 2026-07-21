import React, { useState, useEffect } from 'react'
import './list.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url, isAuthenticated }) => {


  const [list, setlist] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`, {withCredentials: true})
    if (response.data.success) {
      setlist(response.data.data)
    }
    else {
      toast.error(response.data.message)
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
      {isAuthenticated ? (
        <div className='list add flex-col' >
          <p>All Food List</p>
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
                  <img src={`${url}/images/` + item.image} alt="" srcset="" />
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