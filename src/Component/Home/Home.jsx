import React from 'react'
import HomeStart from './HomeStart'
import Category from './Category'
import TrindingProducts from './TrindingProducts'
import Aboutwebsite from './Aboutwebsite'

const Home = ({Data}) => {
  return (
    <div className='bg-blue-50'>
      <HomeStart/>
      <Category />
      <TrindingProducts Data={Data} />
      <Aboutwebsite />
      <div className='bg-blue-50 h-20'></div>
    </div>
  )
}

export default Home
