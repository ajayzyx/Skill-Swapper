import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, Activity, Zap } from 'lucide-react';
import StatCard from '../ui/StatCard';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      description: 'Registered users'
    },
    {
      title: 'Pending Moderations',
      value: '23',
      change: '-8.2%',
      changeType: 'positive', // Decrease in pending is good
      icon: AlertTriangle,
      description: 'Skills awaiting review'
    },
    {
      title: "Today's Activities",
      value: '156',
      change: '+23.1%',
      changeType: 'positive',
      icon: Activity,
      description: 'User actions today'
    },
    {
      title: 'Active Sessions',
      value: '1,234',
      change: '+5.7%',
      changeType: 'positive',
      icon: Zap,
      description: 'Currently online'
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registered',
      message: 'New user registered',
      details: 'john.doe@example.com joined the platform',
      timestamp: '2 min ago',
      color: 'green'
    },
    {
      id: 2,
      type: 'skill_approved',
      message: 'Skill approved',
      details: 'Web Development skill by Jane Smith',
      timestamp: '5 min ago',
      color: 'blue'
    },
    {
      id: 3,
      type: 'skill_flagged',
      message: 'Skill flagged for review',
      details: 'Photography skill reported by user',
      timestamp: '10 min ago',
      color: 'orange'
    },
    {
      id: 4,
      type: 'user_banned',
      message: 'User account suspended',
      details: 'Inappropriate behavior reported',
      timestamp: '15 min ago',
      color: 'red'
    },
    {
      id: 5,
      type: 'swap_completed',
      message: 'Skill swap completed',
      details: 'React.js ↔ Python tutoring',
      timestamp: '20 min ago',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-blue-100">Monitor and manage your Skill-Swapper platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            description={stat.description}
            loading={loading}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full mt-2`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
                <div className="text-xs text-gray-500">{activity.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="font-medium text-gray-900">Send Global Notification</div>
              <div className="text-sm text-gray-600">Notify all users about updates</div>
            </button>
            <button className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="font-medium text-gray-900">Review Flagged Content</div>
              <div className="text-sm text-gray-600">Check skills pending moderation</div>
            </button>
            <button className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="font-medium text-gray-900">Export User Data</div>
              <div className="text-sm text-gray-600">Download user analytics</div>
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Backup</span>
              <span className="text-sm text-gray-900">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
