import React, { useState } from 'react';
import { Send, Clock, Users, Bell, Calendar, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import StatusBadge from '../ui/StatusBadge';

const Notifications = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'normal',
    audience: 'all',
    scheduleType: 'immediate',
    scheduleDate: '',
    scheduleTime: '',
  });

  const [recentNotifications] = useState([
    {
      id: 1,
      title: 'Platform Maintenance',
      message: 'Scheduled maintenance on Sunday 2AM-4AM EST',
      priority: 'high',
      audience: 'all',
      sentAt: '2024-01-20 10:30:00',
      status: 'sent',
      recipients: 2847
    },
    {
      id: 2,
      title: 'New Feature Launch',
      message: 'Introducing skill ratings and reviews!',
      priority: 'normal',
      audience: 'active',
      sentAt: '2024-01-19 14:15:00',
      status: 'sent',
      recipients: 1892
    },
    {
      id: 3,
      title: 'Welcome New Users',
      message: 'Welcome to Skill-Swapper! Get started with your first skill exchange.',
      priority: 'low',
      audience: 'new',
      sentAt: '2024-01-18 09:00:00',
      status: 'scheduled',
      recipients: 156
    },
    {
      id: 4,
      title: 'Security Update',
      message: 'Important security patches have been applied to protect your account.',
      priority: 'high',
      audience: 'all',
      sentAt: '2024-01-17 16:45:00',
      status: 'sent',
      recipients: 2847
    },
    {
      id: 5,
      title: 'Weekly Digest',
      message: 'Check out this week\'s most popular skills and successful swaps!',
      priority: 'low',
      audience: 'active',
      sentAt: '2024-01-16 08:00:00',
      status: 'sent',
      recipients: 1892
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.scheduleType === 'scheduled' && (!formData.scheduleDate || !formData.scheduleTime)) {
      toast.error('Please set schedule date and time');
      return;
    }

    // Mock API call
    const isScheduled = formData.scheduleType === 'scheduled';
    const action = isScheduled ? 'scheduled' : 'sent';
    const recipientCount = getAudienceCount(formData.audience);

    toast.success(`Notification ${action} successfully to ${recipientCount} users!`);

    // Reset form
    setFormData({
      title: '',
      message: '',
      priority: 'normal',
      audience: 'all',
      scheduleType: 'immediate',
      scheduleDate: '',
      scheduleTime: '',
    });
  };

  // Utility functions
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Bell className="w-4 h-4 text-blue-600" />;
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high':
        return 'high';
      case 'low':
        return 'low';
      default:
        return 'normal';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'sent':
        return 'success';
      case 'scheduled':
        return 'info';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getAudienceCount = (audience) => {
    switch (audience) {
      case 'all':
        return 2847;
      case 'active':
        return 1892;
      case 'new':
        return 156;
      case 'inactive':
        return 955;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notification Center</h1>
            <p className="text-gray-600">Send global notifications to users and manage communication</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Quick Send
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Form */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Send New Notification</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter notification title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.message.length}/500 characters
              </p>
            </div>

            {/* Priority and Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div>
                <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <select
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Users (2,847)</option>
                  <option value="active">Active Users (1,892)</option>
                  <option value="new">New Users (156)</option>
                  <option value="inactive">Inactive Users (955)</option>
                  <option value="specific">Specific User</option>
                </select>
              </div>
            </div>

            {/* Schedule Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Delivery Options
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="scheduleType"
                    value="immediate"
                    checked={formData.scheduleType === 'immediate'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700 flex items-center">
                    <Send className="w-4 h-4 mr-2 text-blue-600" />
                    Send Immediately
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="scheduleType"
                    value="scheduled"
                    checked={formData.scheduleType === 'scheduled'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    Schedule for Later
                  </span>
                </label>
              </div>
            </div>

            {/* Schedule Date/Time */}
            {formData.scheduleType === 'scheduled' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="scheduleDate"
                    name="scheduleDate"
                    value={formData.scheduleDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    id="scheduleTime"
                    name="scheduleTime"
                    value={formData.scheduleTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Preview */}
            {(formData.title || formData.message) && (
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-3">
                    {getPriorityIcon(formData.priority)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-gray-900">{formData.title || 'Notification Title'}</h5>
                        <StatusBadge
                          status={formData.priority}
                          variant={getPriorityVariant(formData.priority)}
                          size="xs"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{formData.message || 'Your message will appear here...'}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        To: {getAudienceCount(formData.audience)} users
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                {formData.scheduleType === 'immediate' ? (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Now to {getAudienceCount(formData.audience)} Users
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Notification
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
            <span className="text-sm text-gray-500">{recentNotifications.length} total</span>
          </div>

          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                  <StatusBadge
                    status={notification.status}
                    variant={getStatusVariant(notification.status)}
                    size="xs"
                  />
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{notification.message}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <StatusBadge
                      status={notification.priority}
                      variant={getPriorityVariant(notification.priority)}
                      size="xs"
                    />
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {notification.recipients.toLocaleString()}
                    </span>
                  </div>
                  <span>{new Date(notification.sentAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium py-2 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
