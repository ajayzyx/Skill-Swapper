import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, user }) => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Skill Swapper</h1>

      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm uppercase">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <span className="text-sm">{user?.name || 'User'}</span>
        </div>
      ) : (
        <Link
          to="/signin"
          className="border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
