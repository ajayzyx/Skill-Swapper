import React, { useState } from 'react';
import SkillRequestModal from './SkillRequestModel';

const UserCard = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    offeredSkill: '',
    wantedSkill: '',
    message: '',
  });

  const handleOpenModal = () => {
    setFormData({
      offeredSkill: '',
      wantedSkill: '',
      message: '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    console.log('Submitted data:', formData);
    setIsModalOpen(false);
    // You can send this data to your backend here
  };

  return (
    <>
      <div className="border rounded-2xl p-4 shadow-md bg-gray-800 text-white flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-sm">
            Profile Photo
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-green-400 text-sm mt-1">
              Skills Offered =&gt;{' '}
              {user.skillsOffered.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-gray-800 px-2 py-1 rounded-md mr-1"
                >
                  {skill}
                </span>
              ))}
            </p>
            <p className="text-blue-400 text-sm mt-1">
              Skills Wanted =&gt;{' '}
              {user.skillsWanted.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-gray-800 px-2 py-1 rounded-md mr-1"
                >
                  {skill}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button
            className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded text-white mb-2"
            onClick={handleOpenModal}
          >
            Request
          </button>
          <span className="text-sm">Rating: {user.rating}/5</span>
        </div>
      </div>

      {/* Pass modal only when triggered */}
      <SkillRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        offeredSkills={user.skillsOffered}
        wantedSkills={user.skillsWanted}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default UserCard;
