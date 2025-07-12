import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 w-96">
        <h2 className="text-white text-xl font-semibold mb-6 text-center">Sign Up</h2>
        <p className="text-gray-400 text-center mb-6 text-sm">Join Skill Swapper and exchange skills with others</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="text-gray-300 text-sm block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            onClick={() => onSignup(name, email, password)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Sign Up
          </button>

          <Link to='/' className="flex items-center justify-center  text-blue-400 text-sm hover:underline">
          Already have an account? SignIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
