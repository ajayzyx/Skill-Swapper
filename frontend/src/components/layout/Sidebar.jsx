import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  FileText, 
  Bell, 
  Settings, 
  LogOut,
  X,
  Activity
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentPath, onLogout }) => {
  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Skill Moderation', href: '/admin/moderation', icon: Shield },
    { name: 'Logs', href: '/admin/logs', icon: FileText },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  ];

  const bottomNavigation = [
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href) => {
    return currentPath === href || (href !== '/admin/dashboard' && currentPath.startsWith(href));
  };

  const NavItem = ({ item, onClick }) => (
    <Link
      to={item.href}
      onClick={onClick}
      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
        isActive(item.href)
          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
          : 'text-gray-700 hover:bg-white/60 hover:text-gray-900'
      }`}
    >
      <item.icon
        className={`mr-3 h-5 w-5 transition-colors ${
          isActive(item.href) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
        }`}
      />
      {item.name}
    </Link>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl">
          {/* Logo */}
          <div className="flex h-16 flex-shrink-0 items-center px-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Skill-Swapper
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>

            {/* Bottom Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200/50">
              <nav className="space-y-2">
                {bottomNavigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
                <button
                  onClick={onLogout}
                  className="group flex w-full items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col bg-white/90 backdrop-blur-xl shadow-xl">
          {/* Mobile Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Skill-Swapper
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} onClick={onClose} />
              ))}
            </nav>

            {/* Mobile Bottom Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200/50">
              <nav className="space-y-2">
                {bottomNavigation.map((item) => (
                  <NavItem key={item.name} item={item} onClick={onClose} />
                ))}
                <button
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="group flex w-full items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
