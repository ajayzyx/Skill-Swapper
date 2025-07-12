import React from 'react';
import { Edit, Trash2, MoreHorizontal, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

const UserRow = ({ 
  user, 
  onEdit, 
  onDelete, 
  onView,
  showActions = true 
}) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'active';
      case 'banned':
        return 'banned';
      case 'pending':
        return 'pending';
      case 'inactive':
        return 'inactive';
      default:
        return 'default';
    }
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      {/* User ID */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        #{user.id}
      </td>
      
      {/* User Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-medium text-sm">
              {getInitials(user.name)}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      
      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={user.status} variant={getStatusVariant(user.status)} />
      </td>
      
      {/* Join Date */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(user.joinDate)}
      </td>
      
      {/* Actions */}
      {showActions && (
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-2">
            {onView && (
              <button
                onClick={() => onView(user)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(user)}
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="Edit User"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(user)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete User"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default UserRow;
