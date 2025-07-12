import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import UserRow from '../ui/UserRow';
import StatusBadge from '../ui/StatusBadge';
import TableHeader from '../ui/TableHeader';
import EmptyState from '../ui/EmptyState';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('joinDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data - replace with actual API calls
  const [users, setUsers] = useState([
    {
      id: 1001,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      skillsCount: 5,
      swapsCount: 12
    },
    {
      id: 1002,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Banned',
      joinDate: '2024-01-10',
      lastActive: '2024-01-18',
      skillsCount: 3,
      swapsCount: 8
    },
    {
      id: 1003,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2023-12-01',
      lastActive: '2024-01-20',
      skillsCount: 10,
      swapsCount: 25
    },
    {
      id: 1004,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'User',
      status: 'Active',
      joinDate: '2024-01-12',
      lastActive: '2024-01-19',
      skillsCount: 7,
      swapsCount: 15
    },
    {
      id: 1005,
      name: 'Alex Chen',
      email: 'alex@example.com',
      role: 'User',
      status: 'Pending',
      joinDate: '2024-01-22',
      lastActive: '2024-01-22',
      skillsCount: 2,
      swapsCount: 0
    },
    {
      id: 1006,
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: 'User',
      status: 'Inactive',
      joinDate: '2023-11-15',
      lastActive: '2023-12-20',
      skillsCount: 8,
      swapsCount: 18
    },
  ]);

  // Filter and sort users
  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle date sorting
      if (sortBy === 'joinDate' || sortBy === 'lastActive') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Handler functions
  const handleSort = (key, order) => {
    setSortBy(key);
    setSortOrder(order);
  };

  const handleEditUser = (user) => {
    // TODO: Open edit modal
    toast.success(`Edit user: ${user.name}`);
  };

  const handleViewUser = (user) => {
    // TODO: Open user details modal
    toast.success(`View user: ${user.name}`);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast.success(`User ${selectedUser.name} deleted successfully`);
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  const handleExportUsers = () => {
    // TODO: Implement CSV export
    toast.success('Exporting users to CSV...');
  };

  // Table columns configuration
  const columns = [
    { key: 'id', label: 'User ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage registered users, their roles, and account status</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={handleExportUsers}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedUsers.length} of {users.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        {filteredAndSortedUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader
                columns={columns}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <tbody className="bg-white/50 divide-y divide-gray-200">
                {filteredAndSortedUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    onView={handleViewUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={searchTerm || filterRole !== 'all' || filterStatus !== 'all' ? Search : Users}
            title={searchTerm || filterRole !== 'all' || filterStatus !== 'all' ? "No users found" : "No users yet"}
            description={searchTerm || filterRole !== 'all' || filterStatus !== 'all' ? "Try adjusting your search or filter criteria." : "Users will appear here once they register."}
            action={
              !(searchTerm || filterRole !== 'all' || filterStatus !== 'all') && (
                <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First User
                </button>
              )
            }
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowDeleteModal(false)}
            ></div>
            <div className="inline-block align-bottom bg-white/90 backdrop-blur-xl rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 border border-white/20">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete User</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete <strong>{selectedUser.name}</strong>? This action cannot be undone and will remove all associated data.
                    </p>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-600">
                        <div>Email: {selectedUser.email}</div>
                        <div>Skills: {selectedUser.skillsCount}</div>
                        <div>Swaps: {selectedUser.swapsCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDeleteUser}
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                >
                  Delete User
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
