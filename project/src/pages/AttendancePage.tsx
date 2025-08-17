import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, Clock, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AttendanceMarker from '../components/attendance/AttendanceMarker';
import DashboardCard from '../components/dashboard/DashboardCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Mock data
const mockStudents = [
  { id: '1', name: 'Alex Kumar', rollNumber: 1, avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=100&h=100&fit=crop&crop=face' },
  { id: '2', name: 'Sarah Johnson', rollNumber: 2, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face' },
  { id: '3', name: 'Michael Chen', rollNumber: 3, avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=100&h=100&fit=crop&crop=face' },
  { id: '4', name: 'Emily Davis', rollNumber: 4, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face' },
  { id: '5', name: 'James Wilson', rollNumber: 5 },
  { id: '6', name: 'Lisa Anderson', rollNumber: 6 },
  { id: '7', name: 'David Brown', rollNumber: 7 },
  { id: '8', name: 'Maria Garcia', rollNumber: 8 },
];

export default function AttendancePage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('5A');
  
  const isTeacher = user?.role === 'teacher' || user?.role === 'class_teacher';

  const handleSaveAttendance = async (attendance: Record<string, string>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Attendance saved:', attendance);
    // Show success message
  };

  const attendanceStats = [
    {
      title: 'Present Today',
      value: '36/40',
      subtitle: '90% attendance',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
      trend: { value: 5, direction: 'up' as const, label: 'from yesterday' },
    },
    {
      title: 'Weekly Average',
      value: '94%',
      subtitle: 'Class 5A',
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Late Arrivals',
      value: '3',
      subtitle: 'Today',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Medical Leave',
      value: '1',
      subtitle: 'Current',
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
    },
  ];

  // Student view - show their attendance summary
  if (user?.role === 'student') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
          <p className="mt-1 text-sm text-gray-600">Track your attendance and maintain streaks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <DashboardCard
            title="Current Streak"
            value="15 days"
            subtitle="Keep it going!"
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            color="bg-green-500"
          />
          <DashboardCard
            title="This Month"
            value="95%"
            subtitle="22/23 days"
            icon={<Calendar className="h-6 w-6 text-white" />}
            color="bg-blue-500"
          />
          <DashboardCard
            title="Best Streak"
            value="28 days"
            subtitle="Personal record"
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-purple-500"
          />
          <DashboardCard
            title="Overall"
            value="92%"
            subtitle="This academic year"
            icon={<Clock className="h-6 w-6 text-white" />}
            color="bg-orange-500"
          />
        </div>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Calendar</h3>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Interactive attendance calendar coming soon</p>
          </div>
        </Card>
      </div>
    );
  }

  // Parent view - show child's attendance
  if (user?.role === 'parent') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Child's Attendance</h1>
          <p className="mt-1 text-sm text-gray-600">Monitor your child's attendance and patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {attendanceStats.map((stat, index) => (
            <DashboardCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Attendance</h3>
            <div className="space-y-3">
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const status = Math.random() > 0.1 ? 'present' : Math.random() > 0.5 ? 'late' : 'absent';
                
                return (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">
                      {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      status === 'present' ? 'bg-green-100 text-green-800' :
                      status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Present Days</span>
                <span className="text-sm font-medium text-green-600">22 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Absent Days</span>
                <span className="text-sm font-medium text-red-600">1 day</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Late Arrivals</span>
                <span className="text-sm font-medium text-yellow-600">2 days</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Attendance Rate</span>
                  <span className="text-lg font-bold text-blue-600">95%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Teacher/Admin view - attendance management
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="mt-1 text-sm text-gray-600">Mark and track student attendance</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5A">Class 5A</option>
            <option value="5B">Class 5B</option>
            <option value="6A">Class 6A</option>
            <option value="6B">Class 6B</option>
          </select>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <AttendanceMarker
        students={mockStudents}
        onSave={handleSaveAttendance}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Trends</h3>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Attendance analytics chart will be displayed here</p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">At-Risk Students</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">John Smith</p>
                <p className="text-xs text-gray-500">Attendance: 78% (Below 80%)</p>
              </div>
              <Button size="sm" variant="outline">Contact Parent</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Mary Johnson</p>
                <p className="text-xs text-gray-500">5 late arrivals this week</p>
              </div>
              <Button size="sm" variant="outline">Send Notice</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}