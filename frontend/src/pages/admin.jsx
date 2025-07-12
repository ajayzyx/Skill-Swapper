import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import UserManagement from '../components/admin/UserManagement';
import SkillModeration from '../components/admin/SkillModeration';
import SwapLogs from '../components/admin/SwapLogs';
import Analytics from '../components/admin/Analytics';
import NotificationSender from '../components/admin/NotificationSender';

const AdminPanel = ({ onLogout }) => {
  return (
    <AdminLayout onLogout={onLogout}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="skills" element={<SkillModeration />} />
        <Route path="logs" element={<SwapLogs />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<NotificationSender />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;