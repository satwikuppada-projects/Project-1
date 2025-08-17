import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AttendancePage from './pages/AttendancePage';
import CreativePage from './pages/CreativePage';
import AcademicsPage from './pages/AcademicsPage';
import CommunicationPage from './pages/CommunicationPage';
import LeaveRequestsPage from './pages/LeaveRequestsPage';
import WellbeingPage from './pages/WellbeingPage';
import ProfilePage from './pages/ProfilePage';
import AnalyticsPage from './pages/AnalyticsPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route path="/*" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="creative" element={<CreativePage />} />
        <Route path="academics/*" element={<AcademicsPage />} />
        <Route path="communication" element={<CommunicationPage />} />
        <Route path="leave" element={<LeaveRequestsPage />} />
        <Route path="wellbeing" element={<WellbeingPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        
        {/* Placeholder routes for other pages */}
        <Route path="operations/*" element={
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Operations Module</h2>
            <p className="text-gray-600">Fees, Transport, and Administrative functions</p>
          </div>
        } />
        
        <Route path="users" element={
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
            <p className="text-gray-600">Manage users and permissions</p>
          </div>
        } />
        
        <Route path="security" element={
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Center</h2>
            <p className="text-gray-600">Safety and security management</p>
          </div>
        } />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;