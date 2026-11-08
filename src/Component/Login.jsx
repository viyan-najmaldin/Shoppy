import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // alert('Successfully logged in!');
      navigate("/account");
    } catch (err) {
      setError(err.message); // Displays error if password or email is incorrect
    }
  };

  return (
    <div className='text-center my-10 mb-15'>
      <h2 className='text-center text-xl p-5'>Sign In to Shoppy</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='bg-white mb-4 p-10 mx-5  rounded-2xl shadow-sm flex justify-center flex-col gap-4 border border-slate-300 sm:w-full sm:max-w-md sm:mx-auto' onSubmit={handleSubmit}>
        
        <input type="email" value={email} 
        onChange={(e) => setEmail(e.target.value)}
         className=" border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-tigris-500"
         placeholder="Email" 
         required />
        <input type="password" value={password}
         onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className=" border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-tigris-500"
          required />
          
        <button 
        className='bg-red-500 text-white rounded-xl p-3 px-10 hover:font-semibold transition'
        type="submit">Log In</button>
      </form>
      <span>You don't have account? </span>
      <button className='text-tigris-700' 
      onClick={()=>navigate('/signup')}
      >SignUp</button>
    </div>
  );
}
