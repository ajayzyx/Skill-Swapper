import React, { useState } from 'react';
import { Camera, MapPin, Save, X, Eye, EyeOff, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import ProfilePhoto from './ProfilePhoto';
import FormInput from '../ui/FormInput';
import SkillsSelector from './SkillsSelector';
import AvailabilitySelector from './AvailabilitySelector';

const UserProfile = ({ onLogout }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    location: 'San Francisco, CA',
    skillsOffered: ['React', 'JavaScript', 'Node.js', 'Python'],
    skillsWanted: ['Machine Learning', 'Data Science', 'AWS'],
    availability: ['morning', 'evening', 'weekends'],
    profilePhoto: '/api/placeholder/400/400'
  });

  const [originalData, setOriginalData] = useState({ ...formData });
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOriginalData({ ...formData });
      setHasChanges(false);
      toast.success('Profile updated successfully!', {
        duration: 3000,
        style: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          color: '#1f2937'
        }
      });
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleDiscard = () => {
    setFormData({ ...originalData });
    setHasChanges(false);
    toast.success('Changes discarded');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your profile information and skill preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 sticky top-6">
              {/* Profile Photo */}
              <ProfilePhoto
                src={formData.profilePhoto}
                alt={formData.fullName}
                onPhotoChange={(newPhoto) => handleInputChange('profilePhoto', newPhoto)}
              />

              {/* Privacy Toggle */}
              <div className="mt-6 p-4 bg-gray-50/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    Profile Visibility
                  </span>
                  <button
                    onClick={() => setIsPublic(!isPublic)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isPublic ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPublic ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  {isPublic ? (
                    <>
                      <Eye className="w-3 h-3 mr-1" />
                      Public profiles can be discovered by others
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 mr-1" />
                      Your profile is private and hidden
                    </>
                  )}
                </div>
              </div>

              {/* Profile Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50/50 rounded-xl">
                  <div className="text-lg font-bold text-blue-600">
                    {formData.skillsOffered.length}
                  </div>
                  <div className="text-xs text-gray-600">Skills Offered</div>
                </div>
                <div className="text-center p-3 bg-purple-50/50 rounded-xl">
                  <div className="text-lg font-bold text-purple-600">
                    {formData.skillsWanted.length}
                  </div>
                  <div className="text-xs text-gray-600">Skills Wanted</div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Form Section - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/20">
              <form className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Personal Information
                  </h2>
                  <div className="space-y-6">
                    <FormInput
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(value) => handleInputChange('fullName', value)}
                      placeholder="Enter your full name"
                      required
                    />
                    <FormInput
                      label="Location"
                      value={formData.location}
                      onChange={(value) => handleInputChange('location', value)}
                      placeholder="City, Country"
                      icon={MapPin}
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Skills & Expertise
                  </h2>
                  <div className="space-y-6">
                    <SkillsSelector
                      label="Skills I Can Offer"
                      skills={formData.skillsOffered}
                      onChange={(skills) => handleInputChange('skillsOffered', skills)}
                      placeholder="Add skills you can teach or help with"
                      color="blue"
                    />
                    <SkillsSelector
                      label="Skills I Want to Learn"
                      skills={formData.skillsWanted}
                      onChange={(skills) => handleInputChange('skillsWanted', skills)}
                      placeholder="Add skills you want to learn"
                      color="purple"
                    />
                  </div>
                </div>

                {/* Availability Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Availability Preferences
                  </h2>
                  <AvailabilitySelector
                    selected={formData.availability}
                    onChange={(availability) => handleInputChange('availability', availability)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!hasChanges}
                    className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      hasChanges
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    disabled={!hasChanges}
                    className={`flex-1 sm:flex-none px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      hasChanges
                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                    }`}
                  >
                    <X className="w-4 h-4" />
                    Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
