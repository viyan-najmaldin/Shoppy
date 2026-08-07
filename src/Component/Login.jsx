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
      alert('Successfully logged in!');
    } catch (err) {
      setError(err.message); // Displays error if password or email is incorrect
    }
  };

  return (
    <div className='text-center'>
      <h2 className='text-center text-xl p-5'>Sign In to Shoppy</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='bg-white mb-4 p-10 rounded-2xl shadow-sm flex justify-center flex-col gap-4 border border-slate-300 mx-40' onSubmit={handleSubmit}>
        <div className='flex w-full gap-4'>
        <input type="email" value={email} 
        onChange={(e) => setEmail(e.target.value)}
         className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
         placeholder="Email" 
         required />
        <input type="password" value={password}
         onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
          required />
          </div>
        <button 
        className='bg-red-500 text-white  rounded-xl p-3 px-10 hover:bg-gradient-to-r from-cyan-600 to-red-400 hover:font-semibold transition'
        type="submit">Log In</button>
      </form>
      <span>You don't have account? </span>
      <button className='text-cyan-700' 
      onClick={()=>navigate('/signup')}
      >SignUp</button>
    </div>
  );
}
