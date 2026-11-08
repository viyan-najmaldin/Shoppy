import HomeStart from './HomeStart'
import Category from './Category'
import TrindingProducts from './TrindingProducts'
import Aboutwebsite from './Aboutwebsite'


const Home = ({ orders, setOrders }) => {
  return (
    <div className='bg-mist pb-10'>
      <HomeStart />
      <Category />
      <TrindingProducts orders={orders} setOrders={setOrders} />
      <Aboutwebsite />
    </div>
  )
}

export default Home
