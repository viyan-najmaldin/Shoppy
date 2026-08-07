import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await signup(email, password);
      alert('Welcome! Account created successfully.');
    } catch (err) {
      setError(err.message); // Set Firebase error (e.g., "auth/email-already-in-use")
    }
  };

  return (
    <div>
      <h2 className='text-center text-xl p-5'>Create Shoppy Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='bg-white mb-4 p-10 rounded-2xl shadow-sm flex justify-center flex-col gap-4 border border-slate-300 mx-40' onSubmit={handleSubmit}>
               <div className='flex w-full gap-4'>
        <input
         className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
         type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input
        className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
        type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        <button 
        className='bg-red-500 text-white  rounded-xl p-3 px-10 hover:bg-gradient-to-r from-cyan-600 to-red-400 hover:font-semibold transition'
       type="submit">Sign Up</button>
      </form>
    </div>
  );
}
