import React from 'react';

const StatusBadge = ({ status, variant = 'default', size = 'sm' }) => {
  const getStatusStyles = () => {
    const baseStyles = `inline-flex items-center font-medium rounded-full transition-colors`;
    
    const sizeStyles = {
      xs: 'px-2 py-0.5 text-xs',
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-sm'
    };

    const variantStyles = {
      // User Status
      active: 'bg-green-100 text-green-800 border border-green-200',
      banned: 'bg-red-100 text-red-800 border border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      inactive: 'bg-gray-100 text-gray-800 border border-gray-200',
      
      // Skill Status
      approved: 'bg-green-100 text-green-800 border border-green-200',
      rejected: 'bg-red-100 text-red-800 border border-red-200',
      flagged: 'bg-orange-100 text-orange-800 border border-orange-200',
      under_review: 'bg-blue-100 text-blue-800 border border-blue-200',
      
      // Priority Levels
      high: 'bg-red-100 text-red-800 border border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      low: 'bg-green-100 text-green-800 border border-green-200',
      normal: 'bg-blue-100 text-blue-800 border border-blue-200',
      
      // General
      success: 'bg-green-100 text-green-800 border border-green-200',
      error: 'bg-red-100 text-red-800 border border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      info: 'bg-blue-100 text-blue-800 border border-blue-200',
      default: 'bg-gray-100 text-gray-800 border border-gray-200'
    };

    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.default}`;
  };

  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    return status.toString().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <span className={getStatusStyles()}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
