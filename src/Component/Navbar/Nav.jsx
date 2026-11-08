import PageLogo from './PageLogo'
import Search from './Search'
import UserAction from './UserAction'
import MenuLinks from './MenuLinks'


const Nav = ({ isMenuOpen, setIsMenuOpen, orders }) => {
  return (
    <header className='sticky top-0 z-40 bg-tigris-800 shadow-lg'>
      <div className='flex flex-wrap md:flex-nowrap items-center justify-between gap-x-6 gap-y-2 px-4 sm:px-6 lg:px-8 pt-2 pb-3 md:pb-2'>
        <PageLogo />
        <Search />
        <UserAction
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          orders={orders}
        />
      </div>

      <nav aria-label='Categories' className='hidden md:block px-4 sm:px-6 lg:px-8 pb-2.5'>
        <MenuLinks />
      </nav>

      {/* Phones: the menu drops down under the sticky header */}
      {isMenuOpen &&
        <nav aria-label='Menu' className='md:hidden absolute left-0 right-0 top-full max-h-[75vh] overflow-y-auto bg-white border-b border-line shadow-xl'>
          <MenuLinks mobile />
        </nav>}
    </header>
  )
}

export default Nav
