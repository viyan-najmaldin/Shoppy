import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

      if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

    try {
      await signup(name, email, password);
      alert('Welcome! Account created successfully.');
       navigate("/account");
    } catch (err) {
      setError(err.message); // Set Firebase error (e.g., "auth/email-already-in-use")
    }
  };

  return (
    <div className='my-10 mb-15'>
      <h2 className='text-center text-xl p-5'>Create Shoppy Account</h2>
      <form className='bg-white mb-4 p-10 rounded-2xl shadow-sm flex justify-center flex-col gap-4 border border-slate-300 sm:w-full sm:max-w-md sm:mx-auto mx-5' onSubmit={handleSubmit}>
               <div className='flex flex-col w-full gap-4'>
       <label >Full Name <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
          required /></label>
        
        <label > Your Email<input
         className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
         type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      </label> 
      <label> Password <input
        className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
        type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
       </label> 
       <label>
             Confirm Password <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter Password"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
              required
            />
          </label>
       
       </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

        <button 
        className='bg-red-500 text-white  rounded-xl p-3 px-10 hover:bg-gradient-to-r from-cyan-600 to-red-400 hover:font-semibold transition'
       type="submit">Sign Up</button>
      </form>
    </div>
  );
}
