import React from 'react';

const Filters = ({ searchTerm, setSearchTerm, availability, setAvailability }) => (
  <div className="flex items-center gap-4 mb-6">
    <select
      value={availability}
      onChange={(e) => setAvailability(e.target.value)}
      className="bg-gray-800 text-white px-4 py-2 rounded"
    >
      <option value="">Availability</option>
      <option value="available">Available</option>
      <option value="unavailable">Unavailable</option>
      <option value="Pending">Pending</option>
    </select>

    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-600"
    />

    <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white">Search</button>
  </div>
);

export default Filters;
