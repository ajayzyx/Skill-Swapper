import React, { useState } from 'react';
import { Search, Check, X, AlertTriangle, Eye, Flag, Filter, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';

const SkillModeration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReviewPanel, setShowReviewPanel] = useState(false);

  // Mock data - replace with actual API calls
  const [flaggedSkills, setFlaggedSkills] = useState([
    {
      id: 1,
      title: 'Advanced Hacking Techniques',
      description: 'Learn how to hack into systems and steal data',
      category: 'Technology',
      submittedBy: 'John Doe',
      submittedDate: '2024-01-20',
      flagReason: 'Inappropriate content',
      flaggedBy: 'System',
      status: 'Flagged',
      reportCount: 3,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Web Development Basics',
      description: 'Learn HTML, CSS, and JavaScript fundamentals',
      category: 'Technology',
      submittedBy: 'Jane Smith',
      submittedDate: '2024-01-19',
      flagReason: 'Spam content',
      flaggedBy: 'User Report',
      status: 'Flagged',
      reportCount: 1,
      priority: 'low'
    },
    {
      id: 3,
      title: 'Photography Skills',
      description: 'Professional photography techniques and editing',
      category: 'Creative',
      submittedBy: 'Mike Johnson',
      submittedDate: '2024-01-18',
      flagReason: 'Copyright violation',
      flaggedBy: 'Auto-detection',
      status: 'Under Review',
      reportCount: 2,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Cooking Masterclass',
      description: 'Learn to cook amazing dishes from around the world',
      category: 'Lifestyle',
      submittedBy: 'Sarah Wilson',
      submittedDate: '2024-01-17',
      flagReason: 'Misleading information',
      flaggedBy: 'User Report',
      status: 'Flagged',
      reportCount: 1,
      priority: 'low'
    },
    {
      id: 5,
      title: 'Cryptocurrency Trading',
      description: 'Get rich quick with crypto trading secrets',
      category: 'Finance',
      submittedBy: 'Alex Chen',
      submittedDate: '2024-01-21',
      flagReason: 'Misleading information',
      flaggedBy: 'User Report',
      status: 'Flagged',
      reportCount: 4,
      priority: 'high'
    },
  ]);

  // Filter skills based on search and status
  const filteredSkills = flaggedSkills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || skill.status.toLowerCase().replace(' ', '_') === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handler functions
  const handleApproveSkill = (skillId) => {
    setFlaggedSkills(flaggedSkills.map(skill =>
      skill.id === skillId
        ? { ...skill, status: 'Approved' }
        : skill
    ));
    toast.success('Skill approved successfully');
    setShowReviewPanel(false);
    setSelectedSkill(null);
  };

  const handleRejectSkill = (skillId) => {
    setFlaggedSkills(flaggedSkills.map(skill =>
      skill.id === skillId
        ? { ...skill, status: 'Rejected' }
        : skill
    ));
    toast.success('Skill rejected successfully');
    setShowReviewPanel(false);
    setSelectedSkill(null);
  };

  const handleViewDetails = (skill) => {
    setSelectedSkill(skill);
    setShowDetailModal(true);
  };

  const handleReviewSkill = (skill) => {
    setSelectedSkill(skill);
    setShowReviewPanel(true);
  };

  // Utility functions
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'low':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase().replace(' ', '_')) {
      case 'flagged':
        return 'flagged';
      case 'under_review':
        return 'under_review';
      case 'approved':
        return 'approved';
      case 'rejected':
        return 'rejected';
      default:
        return 'default';
    }
  };

  const getFlagReasonVariant = (reason) => {
    switch (reason) {
      case 'Inappropriate content':
        return 'error';
      case 'Spam content':
        return 'warning';
      case 'Copyright violation':
        return 'info';
      case 'Misleading information':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Skill Moderation</h1>
        <p className="text-gray-600">Review and moderate flagged skills for inappropriate content</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-900">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {flaggedSkills.filter(s => s.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <div className="flex items-center">
              <Flag className="w-5 h-5 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-orange-900">Medium Priority</p>
                <p className="text-2xl font-bold text-orange-600">
                  {flaggedSkills.filter(s => s.priority === 'medium').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <div className="flex items-center">
              <Eye className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Low Priority</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {flaggedSkills.filter(s => s.priority === 'low').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-900">Under Review</p>
                <p className="text-2xl font-bold text-blue-600">
                  {flaggedSkills.filter(s => s.status === 'Under Review').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search flagged skills by title, description, or submitter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[160px]"
            >
              <option value="all">All Status</option>
              <option value="flagged">Flagged</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredSkills.length} of {flaggedSkills.length} skills
        </div>
      </div>

      {/* Skills Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills List */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            {filteredSkills.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredSkills.map((skill) => (
                  <div key={skill.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{skill.title}</h3>
                          <StatusBadge
                            status={skill.status}
                            variant={getStatusVariant(skill.status)}
                            size="sm"
                          />
                          <StatusBadge
                            status={skill.priority}
                            variant={skill.priority}
                            size="sm"
                          />
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{skill.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Category: {skill.category}</span>
                          <span>By: {skill.submittedBy}</span>
                          <span>{skill.submittedDate}</span>
                          <span>{skill.reportCount} report{skill.reportCount !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="mt-3">
                          <StatusBadge
                            status={skill.flagReason}
                            variant={getFlagReasonVariant(skill.flagReason)}
                            size="sm"
                          />
                          <span className="ml-2 text-xs text-gray-500">Flagged by: {skill.flaggedBy}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleViewDetails(skill)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {skill.status === 'Flagged' && (
                          <>
                            <button
                              onClick={() => handleApproveSkill(skill.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve Skill"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectSkill(skill.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject Skill"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={searchTerm || filterStatus !== 'all' ? Search : Flag}
                title={searchTerm || filterStatus !== 'all' ? "No skills found" : "No flagged skills"}
                description={searchTerm || filterStatus !== 'all' ? "Try adjusting your search or filter criteria." : "All skills have been reviewed or no skills have been flagged yet."}
              />
            )}
          </div>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-1">
          {selectedSkill && showReviewPanel ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill Title</label>
                  <p className="text-sm text-gray-900">{selectedSkill.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-sm text-gray-900">{selectedSkill.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flag Reason</label>
                  <StatusBadge
                    status={selectedSkill.flagReason}
                    variant={getFlagReasonVariant(selectedSkill.flagReason)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <StatusBadge
                    status={selectedSkill.priority}
                    variant={selectedSkill.priority}
                  />
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApproveSkill(selectedSkill.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectSkill(selectedSkill.id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Reject
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setShowReviewPanel(false);
                      setSelectedSkill(null);
                    }}
                    className="w-full mt-2 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-center text-gray-500">
                <Flag className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <p className="text-sm">Select a skill to review</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedSkill && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowDetailModal(false)}></div>
            <div className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Skill Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedSkill.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedSkill.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedSkill.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted By</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedSkill.submittedBy}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Flag Reason</label>
                    <span className={getFlagReasonBadge(selectedSkill.flagReason)}>
                      {selectedSkill.flagReason}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Report Count</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedSkill.reportCount} reports</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    handleRejectSkill(selectedSkill.id);
                    setShowDetailModal(false);
                  }}
                  className="inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    handleApproveSkill(selectedSkill.id);
                    setShowDetailModal(false);
                  }}
                  className="inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillModeration;
