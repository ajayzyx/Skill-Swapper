import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePhoto = ({ src, alt, onPhotoChange }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(src);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
      simulateUpload(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const simulateUpload = async (imageData) => {
    setIsUploading(true);
    try {
      // Simulate API upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPhotoChange(imageData);
      toast.success('Profile photo updated successfully!', {
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
      toast.error('Failed to upload photo. Please try again.');
      setPreviewUrl(src); // Revert to original
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl('/api/placeholder/400/400');
    onPhotoChange('/api/placeholder/400/400');
    toast.success('Profile photo removed');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Profile Photo Container */}
      <div
        className="relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Main Photo */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg ring-4 ring-white">
          <img
            src={previewUrl}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Upload Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
              isHovering || isUploading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center text-white">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                <span className="text-xs font-medium">Uploading...</span>
              </div>
            ) : (
              <Camera className="w-8 h-8 text-white" />
            )}
          </div>
        </div>

        {/* Remove Photo Button */}
        {previewUrl !== '/api/placeholder/400/400' && !isUploading && (
          <button
            onClick={handleRemovePhoto}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={triggerFileInput}
        disabled={isUploading}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        {isUploading ? 'Uploading...' : 'Change Photo'}
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Guidelines */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          Recommended: Square image, min 400×400px
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Max file size: 5MB (JPEG, PNG, WebP)
        </p>
      </div>
    </div>
  );
};

export default ProfilePhoto;
