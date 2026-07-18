import { useContext, useState } from 'react'
import './searchpage.css'
import { StoreContext } from '../Storecontext/Storecontext'
import SkeletonSearch from '../SkeletonCard/SkeletonSearch'
import axios from 'axios'

const SearchPage = () => {

  const { input, setinput, url, cartitems, addtocart, removefromcart } = useContext(StoreContext)

  const [searchFood, setsearchFood] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")



  const foodSearchApi = async () => {
    setloading(true)
    seterror("")
    setsearchFood([])

    try {
      setloading(true)
      const response = await axios.get(`${url}/api/food/searchFood?query=${input}`)
      if (response.data.success) {
        console.log(response.data.data)
        setsearchFood(response.data.data)
      }
    }
    catch (error) {
      seterror(error.response.data.message)
    }
    finally {
      setloading(false)
    }
  }


  return (
    <div className='search-page'>
      <div className="search-page-header">
        <div>
          <p className='search-page-label'>Find your craving</p>
          <h1>Search Food</h1>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder='Search food items...'
            className='search-page-input'
            value={input}
            onChange={(e) => setinput(e.target.value)}
            autoFocus
          />
          <span onClick={foodSearchApi}>search</span>
        </div>

      </div>

      <div className="search-results">
        
        {error && (
          <p className='no-food-available'>{error}</p>
        )}

        {!input && (
          <p className='search-empty'>Delicious food on your finger tips. Don't belive me? Try searching it ...</p>
        )}

        {searchFood.map((item) => (
          <div className="search-item" key={item._id}>
            <img
              className='search-item-image'
              src={`${url}/images/${item.image}`}
              alt={item.name}
            />

            <div className="search-item-details">
              <div>
                <p className='search-item-category'>{item.category}</p>
                <h2>{item.name}</h2>
                <p className='search-item-description'>{item.description}</p>
              </div>

              <div className="search-item-bottom">
                <p className='search-item-price'>${item.price}</p>
                {!cartitems?.[item._id]
                  ? <button onClick={() => addtocart(item._id)}>Add to Cart</button>
                  : (
                    <div className='search-item-counter'>
                      <button onClick={() => removefromcart(item._id)}>-</button>
                      <span>{cartitems[item._id]}</span>
                      <button onClick={() => addtocart(item._id)}>+</button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}

      </div>

      {loading && (
        [...Array(5)].map((_, index) => (
          <SkeletonSearch key={index} />
        ))
      )}

    </div>
  )
}

export default SearchPage
