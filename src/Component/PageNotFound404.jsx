import React from 'react'
import notfound from '../assets/404 error with portals-cuate.svg'
import { useNavigate } from "react-router-dom";

const PageNotFound404 = () => {

  const navigate = useNavigate();

  return (
    <div className='min-h-100 my-10 text-center'>
        <img src={notfound} alt="404 page not found image" className='w-full max-w-100 mx-auto' />
        <button className='underline hover:text-tigris-500 text-slate-700' onClick={() => navigate('/')}>Go back to home</button>
    </div>
  )
}

export default PageNotFound404
