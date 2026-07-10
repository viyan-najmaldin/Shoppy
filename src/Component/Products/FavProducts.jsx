import React from 'react'
import Carts from '../Home/Carts'

const FavProducts = ({Data}) => {
const myData =  Data.filter((product) => product.favorite === true) ;

  return (
    <div className='min-h-100'>
      <h1 className='p-5 text-3xl font-semibold'>Favorites</h1>
      <div className='px-5 mb-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5'>
                        
                        {myData.map(data=> <Carts data={data} />)}
                       
                        
                    </div>
    </div>
  )
}

export default FavProducts
