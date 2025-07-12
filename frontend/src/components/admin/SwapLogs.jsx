import React, { useState } from 'react';
import { Search, Download, Filter, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const SwapLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - replace with actual API calls
  const [swapLogs] = useState([
    {
      id: 1,
      requester: 'John Doe',
      receiver: 'Jane Smith',
      skillOffered: 'React Development',
      skillRequested: 'Python Programming',
      status: 'Completed',
      timestamp: '2024-01-20 14:30:00',
      duration: '2 hours',
      rating: 4.8
    },
    {
      id: 2,
      requester: 'Mike Johnson',
      receiver: 'Sarah Wilson',
      skillOffered: 'Graphic Design',
      skillRequested: 'Digital Marketing',
      status: 'In Progress',
      timestamp: '2024-01-20 10:15:00',
      duration: 'Ongoing',
      rating: null
    },
    {
      id: 3,
      requester: 'Alice Brown',
      receiver: 'Bob Davis',
      skillOffered: 'Photography',
      skillRequested: 'Video Editing',
      status: 'Cancelled',
      timestamp: '2024-01-19 16:45:00',
      duration: 'N/A',
      rating: null
    },
    {
      id: 4,
      requester: 'Emma Wilson',
      receiver: 'Tom Anderson',
      skillOffered: 'Web Design',
      skillRequested: 'SEO Optimization',
      status: 'Completed',
      timestamp: '2024-01-19 09:20:00',
      duration: '3 hours',
      rating: 4.5
    },
    {
      id: 5,
      requester: 'David Lee',
      receiver: 'Lisa Garcia',
      skillOffered: 'Data Analysis',
      skillRequested: 'Machine Learning',
      status: 'Pending',
      timestamp: '2024-01-18 13:10:00',
      duration: 'N/A',
      rating: null
    },
    {
      id: 6,
      requester: 'Chris Taylor',
      receiver: 'Amy Johnson',
      skillOffered: 'Content Writing',
      skillRequested: 'Social Media Management',
      status: 'Completed',
      timestamp: '2024-01-18 11:30:00',
      duration: '1.5 hours',
      rating: 4.9
    },
    {
      id: 7,
      requester: 'Ryan Miller',
      receiver: 'Kate Brown',
      skillOffered: 'Mobile App Development',
      skillRequested: 'UI/UX Design',
      status: 'In Progress',
      timestamp: '2024-01-17 15:45:00',
      duration: 'Ongoing',
      rating: null
    },
    {
      id: 8,
      requester: 'Jessica Davis',
      receiver: 'Mark Wilson',
      skillOffered: 'Project Management',
      skillRequested: 'Business Strategy',
      status: 'Completed',
      timestamp: '2024-01-17 08:15:00',
      duration: '2.5 hours',
      rating: 4.7
    },
  ]);

  const filteredLogs = swapLogs.filter(log => {
    const matchesSearch = 
      log.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.skillOffered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.skillRequested.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || log.status.toLowerCase() === statusFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const logDate = new Date(log.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      
      switch (dateFilter) {
        case 'today':
          return logDate.toDateString() === today.toDateString();
        case 'yesterday':
          return logDate.toDateString() === yesterday.toDateString();
        case 'week':
          return logDate >= lastWeek;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'Completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'In Progress':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Requester', 'Receiver', 'Skill Offered', 'Skill Requested', 'Status', 'Timestamp', 'Duration', 'Rating'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.id,
        `"${log.requester}"`,
        `"${log.receiver}"`,
        `"${log.skillOffered}"`,
        `"${log.skillRequested}"`,
        log.status,
        log.timestamp,
        `"${log.duration}"`,
        log.rating || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swap_logs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swap_logs.json';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('JSON exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Swap Logs</h1>
        <p className="text-gray-600">Monitor all skill swap activities and transactions</p>
        
        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm font-medium text-green-900">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {swapLogs.filter(log => log.status === 'Completed').length}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm font-medium text-blue-900">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">
              {swapLogs.filter(log => log.status === 'In Progress').length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4">
            <p className="text-sm font-medium text-yellow-900">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {swapLogs.filter(log => log.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-sm font-medium text-red-900">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">
              {swapLogs.filter(log => log.status === 'Cancelled').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by user, skill, or transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last Week</option>
            </select>
          </div>

          {/* Export Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={exportToCSV}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </button>
            <button
              onClick={exportToJSON}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Swap Logs Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills Exchange
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-200">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-medium text-xs">
                            {log.requester.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.requester}</div>
                          <div className="text-xs text-gray-500">Requester</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-medium text-xs">
                            {log.receiver.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.receiver}</div>
                          <div className="text-xs text-gray-500">Receiver</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-green-600">Offered:</span>
                        <span className="ml-1 text-gray-900">{log.skillOffered}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-blue-600">Requested:</span>
                        <span className="ml-1 text-gray-900">{log.skillRequested}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(log.status)}>{log.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="space-y-1">
                      <div>
                        <span className="font-medium">Time:</span> {log.timestamp}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> {log.duration}
                      </div>
                      {log.rating && (
                        <div>
                          <span className="font-medium">Rating:</span> ⭐ {log.rating}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white/50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredLogs.length)}</span> of{' '}
                  <span className="font-medium">{filteredLogs.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No swap logs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapLogs;
