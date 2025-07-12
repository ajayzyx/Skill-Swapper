import React from 'react';

const Pagination = () => (
  <div className="flex justify-center items-center mt-6 gap-2">
    {['<', '1', '2', '3', '4', '5', '6', '7', '>'].map((num, idx) => (
      <button
        key={idx}
        className={`px-3 py-1 rounded-full ${
          num === '2' ? 'bg-white text-black' : 'text-white'
        } hover:bg-white hover:text-black`}
      >
        {num}
      </button>
    ))}
  </div>
);

export default Pagination;
