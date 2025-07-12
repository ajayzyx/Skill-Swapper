import React, { useState } from 'react';
import { Search, Download, Filter, Calendar, Clock, User, Globe, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  // Mock data - replace with actual API calls
  const [logs] = useState([
    {
      id: 1,
      timestamp: '2024-01-22 14:30:25',
      action: 'User Login',
      user: 'john.doe@example.com',
      ipAddress: '192.168.1.100',
      details: 'Successful login from Chrome browser',
      status: 'success',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 2,
      timestamp: '2024-01-22 14:28:15',
      action: 'Skill Created',
      user: 'jane.smith@example.com',
      ipAddress: '192.168.1.101',
      details: 'Created new skill: React Development',
      status: 'info',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
    },
    {
      id: 3,
      timestamp: '2024-01-22 14:25:10',
      action: 'Failed Login',
      user: 'unknown@example.com',
      ipAddress: '192.168.1.102',
      details: 'Invalid password attempt',
      status: 'error',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)'
    },
    {
      id: 4,
      timestamp: '2024-01-22 14:20:45',
      action: 'Skill Swap',
      user: 'mike.johnson@example.com',
      ipAddress: '192.168.1.103',
      details: 'Completed swap: Python ↔ JavaScript',
      status: 'success',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    {
      id: 5,
      timestamp: '2024-01-22 14:15:30',
      action: 'User Registration',
      user: 'sarah.wilson@example.com',
      ipAddress: '192.168.1.104',
      details: 'New user account created',
      status: 'info',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)'
    },
    {
      id: 6,
      timestamp: '2024-01-22 14:10:20',
      action: 'Admin Action',
      user: 'admin@skillswapper.com',
      ipAddress: '192.168.1.105',
      details: 'User account banned: spam@example.com',
      status: 'warning',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    {
      id: 7,
      timestamp: '2024-01-22 14:05:15',
      action: 'Password Reset',
      user: 'alex.chen@example.com',
      ipAddress: '192.168.1.106',
      details: 'Password reset requested',
      status: 'info',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
    },
    {
      id: 8,
      timestamp: '2024-01-22 14:00:10',
      action: 'Skill Flagged',
      user: 'emma.davis@example.com',
      ipAddress: '192.168.1.107',
      details: 'Reported skill: Inappropriate content',
      status: 'warning',
      userAgent: 'Mozilla/5.0 (Android 11; Mobile; rv:68.0)'
    }
  ]);

  // Filter logs based on search and filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress.includes(searchTerm);
    
    const matchesAction = filterAction === 'all' || log.action.toLowerCase().includes(filterAction.toLowerCase());
    
    // Simple date filtering - in real app, you'd use proper date comparison
    const matchesDate = dateRange === 'all' || true; // Simplified for demo
    
    return matchesSearch && matchesAction && matchesDate;
  });

  // Handler functions
  const handleExportCSV = () => {
    // TODO: Implement CSV export
    toast.success('Exporting logs to CSV...');
  };

  const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
      case 'user login':
      case 'user registration':
        return <User className="w-4 h-4" />;
      case 'skill created':
      case 'skill swap':
      case 'skill flagged':
        return <Activity className="w-4 h-4" />;
      case 'admin action':
        return <Globe className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">System Logs</h1>
            <p className="text-gray-600">Monitor system activities and user actions</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Action Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Actions</option>
              <option value="login">Login</option>
              <option value="skill">Skill Actions</option>
              <option value="admin">Admin Actions</option>
              <option value="registration">Registration</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredLogs.length} of {logs.length} log entries
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        {filteredLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/80 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg mr-3">
                          {getActionIcon(log.action)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.action}</div>
                          <StatusBadge 
                            status={log.status} 
                            variant={getStatusVariant(log.status)} 
                            size="xs"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={log.details}>
                        {log.details}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={searchTerm || filterAction !== 'all' ? Search : Activity}
            title={searchTerm || filterAction !== 'all' ? "No logs found" : "No logs available"}
            description={searchTerm || filterAction !== 'all' ? "Try adjusting your search or filter criteria." : "System logs will appear here as activities occur."}
          />
        )}
      </div>
    </div>
  );
};

export default Logs;
