import React from 'react';

const SkillRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  offeredSkills,
  wantedSkills,
  formData,
  setFormData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl w-[380px] border border-white relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-white text-xl">&times;</button>
        <h2 className="text-xl mb-4 font-semibold text-center">Send Skill Request</h2>

        {/* Offered Skill Section */}
        <div className="mb-4 p-4 border border-gray-600 rounded-lg bg-gray-800">
          <label className="block mb-1 text-sm font-medium">
            Choose one of <span className="text-green-400">your</span> offered skills
          </label>
          <select
            className="w-full mt-1 px-3 py-2 rounded bg-black border border-white"
            value={formData.offeredSkill}
            onChange={(e) => setFormData({ ...formData, offeredSkill: e.target.value })}
          >
            <option value="">-- Select --</option>
            {offeredSkills.map((skill, idx) => (
              <option key={idx} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        {/* Wanted Skill Section */}
        <div className="mb-4 p-4 border border-gray-600 rounded-lg bg-gray-800">
          <label className="block mb-1 text-sm font-medium">
            Choose one of <span className="text-blue-400">their</span> wanted skills
          </label>
          <select
            className="w-full mt-1 px-3 py-2 rounded bg-black border border-white"
            value={formData.wantedSkill}
            onChange={(e) => setFormData({ ...formData, wantedSkill: e.target.value })}
          >
            <option value="">-- Select --</option>
            {wantedSkills.map((skill, idx) => (
              <option key={idx} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Message</label>
          <textarea
            className="w-full px-3 py-2 rounded bg-black border border-white"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your message..."
          />
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SkillRequestModal;
