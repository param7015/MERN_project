import React, { useContext, useEffect, useState } from 'react'
import './food_display.css'
import { StoreContext } from '../Storecontext/Storecontext'
import Fooditem from '../Fooditem/Fooditem'
import axios from 'axios'
import SkeletonCard from '../SkeletonCard/SkeletonCard'

const FoodDisplay = ({ category }) => {

  // const { food_list, input, url } = useContext(StoreContext)
  const { url } = useContext(StoreContext)
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [fetchfoodlist, setfetchfoodlist] = useState([])

  // const filteredFood = food_list.filter((item) => {
  //   return item.name.toLowerCase().includes(input)
  // })


  const fetchProducts = async () => {
    setloading(true);
    const response = await axios.get(`${url}/api/food/limitFoodList?page=${page}&limit=10`);
    
    if(response.data.success) {
      setfetchfoodlist(prev => [...prev, ...response.data.data]);
    }
    setloading(false);
  }


  useEffect(() => {
    fetchProducts()
  }, [page])

  

  return (
    <div className='food-display' id='food-display'>
      <h1>Top Dishes Near YOU</h1>
      <div className="food-display-list">
        
        {fetchfoodlist.map((item, index) => {
            if (category === "All" || category === item.category) {
              return <Fooditem key={index} id={item._id} name={item.name} price={item.price} image={item.image} description={item.description} category={item.category} />
            }
          })
        }
        
        {loading && 
        (
          [...Array(5)].map((_, index) => (
            <SkeletonCard key={index} />
          ))
        )}


      </div>
      <div className="load-more-container">
          
          <button className='load-more' onClick={() => setPage(prev => prev + 1)}>Load More +</button>
        </div>

    </div>
  )
}

export default FoodDisplay

