import React from 'react'
import PageLogo from './PageLogo'
import Search from './Search'
import UserAction from './UserAction'
import MenuLinks from './MenuLinks'



const Nav = ({ isMenuOpen, setIsMenuOpen , categories ,orders, search, setSearch }) => {
  return (
    <div className='flex flex-wrap p-3 z-20 shadow-lg sticky sm:top-0 bg-[#003049] items-center justify-between '>
      <PageLogo/>
      <Search 
        search={search}
        setSearch={setSearch}
        />
      <UserAction 
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen} 
      orders={orders}
      />
     
     {/* <Menu /> */}
     <div className='hidden  sm:block'>
      <MenuLinks categories={categories} />
     </div>

    </div>
  )
}

export default Nav
