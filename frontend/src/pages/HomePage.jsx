import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import UserCard from '../components/UserCards';
import UserCardRequest from '../components/UserCardRequest';

const mockUsers = [
  { id: 1, name: 'Marc Demo', skillsOffered: ['JavaScript', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 3.9 },
  { id: 2, name: 'Michell', skillsOffered: ['JavaScript', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 2.5 },
  { id: 3, name: 'Joe Wills', skillsOffered: ['JavaScript', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 4.0 },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('');
  const [skillRequests, setSkillRequests] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginClick = (email, password) => {
    setUser({ name: 'Abhijeet Kumar', email });
    setIsLoggedIn(true);
  };

  const handleSkillRequestSubmit = (receiver, formData) => {
    const newRequest = {
      id: Date.now(),
      name: receiver.name,
      offeredSkill: formData.offeredSkill,
      wantedSkill: formData.wantedSkill,
      message: formData.message,
      rating: receiver.rating,
      status: 'Pending',
    };
    setSkillRequests(prev => [...prev, newRequest]);
  };

  const handleAcceptRequest = (id) => {
    setSkillRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Accepted' } : req));
  };

  const handleRejectRequest = (id) => {
    setSkillRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Navbar isLoggedIn={isLoggedIn} user={user} onLoginClick={handleLoginClick} />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        availability={availability}
        setAvailability={setAvailability}
      />

      <div className="mb-10">
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onRequestSubmit={(formData) => handleSkillRequestSubmit(user, formData)}
          />
        ))}
      </div>

      {skillRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
          {skillRequests.map(req => (
            <UserCardRequest
              key={req.id}
              request={req}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          ))}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default HomePage;