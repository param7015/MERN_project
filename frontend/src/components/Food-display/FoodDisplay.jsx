import React, { useContext } from 'react'
import './food_display.css'
import { StoreContext } from '../Storecontext/Storecontext'
import Fooditem from '../Fooditem/Fooditem'
const FoodDisplay = ({ category }) => {

  const { food_list, input } = useContext(StoreContext)

  const filteredFood = food_list.filter((item) => {
    return item.name.toLowerCase().includes(input)
  })
  return (
    <div className='food-display' id='food-display'>
      <h1>Top Dishes Near YOU</h1>
      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item, index) => {
            if (category === "All" || category === item.category) {
              return <Fooditem key={index} id={item._id} name={item.name} price={item.price} image={item.image} description={item.description} category={item.category} />
            }
          })
        ) : (
          <div className="no">
            <img src="https://media.istockphoto.com/id/1412920498/vector/no-eating-or-drinking-sign-food-and-beverage-rules-vector.jpg?s=612x612&w=0&k=20&c=Hv_HjvkwxvmzIlkXgtVAcd6zHjJdCV1NvLLM2dIdXkQ=" className='foodie' alt="" srcset="" />
            <h1 className='food-not'>Uh oh! Looks Like Item Is not in our menu</h1>
          </div>
        )}

      </div>
      
    </div>
  )
}

export default FoodDisplay

