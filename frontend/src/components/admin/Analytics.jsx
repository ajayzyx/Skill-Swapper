import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, Activity, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');

  // Mock data - replace with actual API calls
  const userGrowthData = [
    { month: 'Jan', users: 120, active: 95 },
    { month: 'Feb', users: 180, active: 142 },
    { month: 'Mar', users: 250, active: 198 },
    { month: 'Apr', users: 320, active: 256 },
    { month: 'May', users: 410, active: 328 },
    { month: 'Jun', users: 520, active: 416 },
    { month: 'Jul', users: 650, active: 520 },
    { month: 'Aug', users: 780, active: 624 },
    { month: 'Sep', users: 920, active: 736 },
    { month: 'Oct', users: 1080, active: 864 },
    { month: 'Nov', users: 1250, active: 1000 },
    { month: 'Dec', users: 1420, active: 1136 },
  ];

  const skillCategoryData = [
    { name: 'Technology', value: 35, count: 450 },
    { name: 'Creative', value: 25, count: 320 },
    { name: 'Business', value: 20, count: 260 },
    { name: 'Language', value: 12, count: 155 },
    { name: 'Lifestyle', value: 8, count: 105 },
  ];

  const popularSkillsData = [
    { skill: 'React Development', swaps: 85 },
    { skill: 'Python Programming', swaps: 72 },
    { skill: 'Graphic Design', swaps: 68 },
    { skill: 'Digital Marketing', swaps: 61 },
    { skill: 'Photography', swaps: 55 },
    { skill: 'Web Design', swaps: 48 },
    { skill: 'Data Analysis', swaps: 42 },
    { skill: 'Content Writing', swaps: 38 },
  ];

  const activityData = [
    { day: 'Mon', swaps: 12, registrations: 8 },
    { day: 'Tue', swaps: 19, registrations: 12 },
    { day: 'Wed', swaps: 15, registrations: 6 },
    { day: 'Thu', swaps: 22, registrations: 15 },
    { day: 'Fri', swaps: 28, registrations: 18 },
    { day: 'Sat', swaps: 16, registrations: 9 },
    { day: 'Sun', swaps: 11, registrations: 5 },
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  const stats = [
    {
      name: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Active Skills',
      value: '1,290',
      change: '+8.2%',
      changeType: 'positive',
      icon: BarChart3,
    },
    {
      name: 'Monthly Swaps',
      value: '456',
      change: '+23.1%',
      changeType: 'positive',
      icon: Activity,
    },
    {
      name: 'Growth Rate',
      value: '18.7%',
      change: '+2.4%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">Monitor platform performance and user engagement</p>
          </div>
          
          {/* Date Range Filter */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Total Users"
              />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Active Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Categories Pie Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {skillCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Skills Bar Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Skills</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularSkillsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="skill" type="category" width={120} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="swaps" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Bar dataKey="swaps" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Skill Swaps" />
              <Bar dataKey="registrations" fill="#10B981" radius={[4, 4, 0, 0]} name="New Registrations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {[
              { name: 'John Doe', swaps: 28, rating: 4.9 },
              { name: 'Jane Smith', swaps: 24, rating: 4.8 },
              { name: 'Mike Johnson', swaps: 22, rating: 4.7 },
              { name: 'Sarah Wilson', swaps: 19, rating: 4.8 },
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-medium text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.swaps} swaps</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-yellow-600">⭐ {user.rating}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="text-sm font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Response Time</span>
              <span className="text-sm font-medium text-blue-600">2.3 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">User Satisfaction</span>
              <span className="text-sm font-medium text-purple-600">4.7/5.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="text-sm font-medium text-indigo-600">87.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trends</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-green-50">
              <div className="text-sm font-medium text-green-900">↗️ User Growth</div>
              <div className="text-xs text-green-700">+15% increase this month</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <div className="text-sm font-medium text-blue-900">🔥 Popular Category</div>
              <div className="text-xs text-blue-700">Technology skills trending</div>
            </div>
            <div className="p-3 rounded-xl bg-purple-50">
              <div className="text-sm font-medium text-purple-900">⭐ High Ratings</div>
              <div className="text-xs text-purple-700">Average rating improved</div>
            </div>
            <div className="p-3 rounded-xl bg-orange-50">
              <div className="text-sm font-medium text-orange-900">📱 Mobile Usage</div>
              <div className="text-xs text-orange-700">68% users on mobile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
