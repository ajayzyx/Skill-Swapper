import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';   
import Pagination from '../components/Pagination';
import UserCard from '../components/UserCards'; 

const mockUsers = [
  {
    id: 1,
    name: 'Marc Demo',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: 3.9,
  },
  {
    id: 2,
    name: 'Michell',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: 2.5,
  },
  {
    id: 3,
    name: 'Joe wills',
    skillsOffered: ['JavaScript', 'Python'],
    skillsWanted: ['Photoshop', 'Graphic designer'],
    rating: 4.0,
  },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('');


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginClick = (email, password) => {

    setUser({ name: 'Abhijeet Kumar', email });
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* ✅ Pass login-related props */}
      <Navbar isLoggedIn={isLoggedIn} user={user} onLoginClick={handleLoginClick} />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        availability={availability}
        setAvailability={setAvailability}
      />

      <div>
        {mockUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default HomePage;
