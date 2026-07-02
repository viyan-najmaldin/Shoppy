import React from 'react'
import PageLogo from './PageLogo'
import Search from './Search'
import UserAction from './UserAction'
import MenuLinks from './MenuLinks'



const Nav = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className='flex flex-wrap p-3 py-5 sticky top-0 z-10 shadow-lg bg-[#003049] items-center justify-between '>
      <PageLogo/>
      <Search />
      <UserAction isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen} />
     
     {/* <Menu /> */}
     <div className='hidden  sm:block'>
      <MenuLinks/>
     </div>

    </div>
  )
}

export default Nav
