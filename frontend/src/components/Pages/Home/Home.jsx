import React, { useState, useEffect } from 'react'
import Header from '../../Header/Header'
import Explore from '../../Explore_menu/Explore'
import FoodDisplay from '../../Food-display/FoodDisplay'
import Appdownload from '../../App_download/Appdownload'
import useCustomhook from '../../useCustomhook'
import Aichat from '../../AIchat/Aichat'

const Home = () => {
  const [category, setcategory] = useState("All")
  const { scrollToTop } = useCustomhook()
  

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className='home'>
      <Header />
      <Explore category={category} setcategory={setcategory} />
      <Aichat />
      <FoodDisplay category={category} />
      <Appdownload />

    </div>
  )
}

export default Home