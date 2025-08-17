import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  MessageSquare,
  Bell,
  Target,
  Award,
  Heart
} from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import QuickActions from '../components/dashboard/QuickActions';
import Card from '../components/common/Card';

export default function DashboardPage() {
  const { user } = useAuth();

  const getDashboardData = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: 'Administrator Dashboard',
          cards: [
            {
              title: 'Total Students',
              value: '1,247',
              subtitle: '52 new this month',
              icon: <Users className="h-6 w-6 text-white" />,
              color: 'bg-blue-500',
              trend: { value: 4.2, direction: 'up' as const, label: 'from last month' },
            },
            {
              title: 'Active Teachers',
              value: '89',
              subtitle: '3 on leave today',
              icon: <BookOpen className="h-6 w-6 text-white" />,
              color: 'bg-green-500',
            },
            {
              title: 'Attendance Rate',
              value: '94.5%',
              subtitle: 'School average',
              icon: <CheckCircle className="h-6 w-6 text-white" />,
              color: 'bg-emerald-500',
              trend: { value: 2.1, direction: 'up' as const, label: 'from last week' },
            },
            {
              title: 'Pending Approvals',
              value: '23',
              subtitle: '15 leave requests',
              icon: <AlertCircle className="h-6 w-6 text-white" />,
              color: 'bg-orange-500',
            },
          ],
        };
      
      case 'teacher':
      case 'class_teacher':
        return {
          title: 'Teacher Dashboard',
          cards: [
            {
              title: 'My Classes',
              value: '6',
              subtitle: '4 sections today',
              icon: <Users className="h-6 w-6 text-white" />,
              color: 'bg-blue-500',
            },
            {
              title: 'Assignments Due',
              value: '12',
              subtitle: 'Pending review',
              icon: <Clock className="h-6 w-6 text-white" />,
              color: 'bg-yellow-500',
            },
            {
              title: 'Today\'s Attendance',
              value: '96%',
              subtitle: 'Class 5A average',
              icon: <CheckCircle className="h-6 w-6 text-white" />,
              color: 'bg-green-500',
            },
            {
              title: 'Messages',
              value: '8',
              subtitle: 'From parents',
              icon: <MessageSquare className="h-6 w-6 text-white" />,
              color: 'bg-purple-500',
            },
          ],
        };
      
      case 'parent':
        return {
          title: 'Parent Dashboard',
          cards: [
            {
              title: 'Child\'s Attendance',
              value: '95%',
              subtitle: 'This month',
              icon: <CheckCircle className="h-6 w-6 text-white" />,
              color: 'bg-green-500',
              trend: { value: 1.5, direction: 'up' as const, label: 'improvement' },
            },
            {
              title: 'Pending Assignments',
              value: '3',
              subtitle: 'Due this week',
              icon: <Clock className="h-6 w-6 text-white" />,
              color: 'bg-orange-500',
            },
            {
              title: 'Upcoming Events',
              value: '2',
              subtitle: 'Sports day, Parent meet',
              icon: <Calendar className="h-6 w-6 text-white" />,
              color: 'bg-blue-500',
            },
            {
              title: 'Fee Status',
              value: 'Paid',
              subtitle: 'Next due: Dec 15',
              icon: <CheckCircle className="h-6 w-6 text-white" />,
              color: 'bg-emerald-500',
            },
          ],
        };
      
      case 'student':
        return {
          title: 'Student Dashboard',
          cards: [
            {
              title: 'Attendance Streak',
              value: '15 days',
              subtitle: 'Keep it up!',
              icon: <Target className="h-6 w-6 text-white" />,
              color: 'bg-green-500',
            },
            {
              title: 'Assignments',
              value: '2 pending',
              subtitle: 'Due tomorrow',
              icon: <Clock className="h-6 w-6 text-white" />,
              color: 'bg-yellow-500',
            },
            {
              title: 'Creative Posts',
              value: '5',
              subtitle: '23 likes this week',
              icon: <Star className="h-6 w-6 text-white" />,
              color: 'bg-pink-500',
              trend: { value: 12, direction: 'up' as const, label: 'engagement' },
            },
            {
              title: 'Next Exam',
              value: '12 days',
              subtitle: 'Mathematics',
              icon: <Award className="h-6 w-6 text-white" />,
              color: 'bg-blue-500',
            },
          ],
        };
      
      default:
        return {
          title: 'Dashboard',
          cards: [
            {
              title: 'Welcome',
              value: 'Hello!',
              subtitle: 'Have a great day',
              icon: <Heart className="h-6 w-6 text-white" />,
              color: 'bg-pink-500',
            },
          ],
        };
    }
  };

  const dashboardData = getDashboardData();

  const recentActivities = [
    { id: 1, type: 'attendance', message: 'Attendance marked for Class 5A', time: '10 minutes ago', icon: CheckCircle, color: 'text-green-600' },
    { id: 2, type: 'assignment', message: 'New assignment created for Mathematics', time: '1 hour ago', icon: BookOpen, color: 'text-blue-600' },
    { id: 3, type: 'message', message: 'Message from parent regarding field trip', time: '2 hours ago', icon: MessageSquare, color: 'text-purple-600' },
    { id: 4, type: 'event', message: 'Sports day event scheduled for next Friday', time: '1 day ago', icon: Calendar, color: 'text-orange-600' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Meeting', date: 'Tomorrow, 10:00 AM', type: 'meeting' },
    { id: 2, title: 'Science Exhibition', date: 'Dec 15, 2024', type: 'event' },
    { id: 3, title: 'Winter Holidays', date: 'Dec 20 - Jan 2', type: 'holiday' },
    { id: 4, title: 'Unit Test - Mathematics', date: 'Dec 18, 2024', type: 'exam' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{dashboardData.title}</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, {user?.name}! Here's what's happening today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.cards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
            color={card.color}
            trend={card.trend}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View calendar</button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'meeting' ? 'bg-blue-500' :
                    event.type === 'event' ? 'bg-green-500' :
                    event.type === 'holiday' ? 'bg-orange-500' :
                    'bg-purple-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 6PM Summary (for parents and students) */}
      {(user?.role === 'parent' || user?.role === 'student') && (
        <Card>
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Today's Summary</h3>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-900 mb-2">
              <strong>Daily Digest - {new Date().toLocaleDateString()}</strong>
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Attendance marked as Present (✓)</li>
              <li>• 2 assignments pending - Math homework due tomorrow</li>
              <li>• Science project presentation scheduled for next week</li>
              <li>• Creative post received 8 new likes</li>
              <li>• Parent-teacher meeting reminder for Friday</li>
            </ul>
            <p className="text-xs text-blue-700 mt-3">
              💡 Tip: Complete math homework tonight to maintain your assignment streak!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}