import React from 'react'
import HomeStart from './HomeStart'
import Category from './Category'
import TrindingProducts from './TrindingProducts'

const Home = () => {
  return (
    <div className='bg-blue-50'>
      <HomeStart/>
      <Category />
      <TrindingProducts />
    </div>
  )
}

export default Home
