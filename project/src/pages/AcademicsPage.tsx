import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, FileText, Plus, Filter, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const mockTimetable = [
  { id: '1', time: '09:00-09:45', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
  { id: '2', time: '09:45-10:30', subject: 'English', teacher: 'Ms. Johnson', room: 'Room 102' },
  { id: '3', time: '10:30-10:45', subject: 'Break', teacher: '', room: '' },
  { id: '4', time: '10:45-11:30', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
  { id: '5', time: '11:30-12:15', subject: 'History', teacher: 'Mrs. Davis', room: 'Room 103' },
  { id: '6', time: '12:15-01:00', subject: 'Lunch', teacher: '', room: '' },
  { id: '7', time: '01:00-01:45', subject: 'Art', teacher: 'Ms. Wilson', room: 'Art Room' },
  { id: '8', time: '01:45-02:30', subject: 'Physical Education', teacher: 'Mr. Taylor', room: 'Gym' },
];

const mockAssignments = [
  {
    id: '1',
    title: 'Math Problem Set 5',
    subject: 'Mathematics',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: 'pending',
    totalMarks: 50,
    description: 'Complete exercises 1-20 from Chapter 5'
  },
  {
    id: '2',
    title: 'Science Project',
    subject: 'Science',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'in_progress',
    totalMarks: 100,
    description: 'Create a working model of the solar system'
  },
  {
    id: '3',
    title: 'English Essay',
    subject: 'English',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'submitted',
    totalMarks: 25,
    description: 'Write a 500-word essay on environmental conservation'
  },
];

const mockExams = [
  {
    id: '1',
    subject: 'Mathematics',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    duration: '2 hours',
    syllabus: 'Chapters 1-5',
    totalMarks: 100
  },
  {
    id: '2',
    subject: 'Science',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    duration: '2.5 hours',
    syllabus: 'Physics: Motion, Chemistry: Acids & Bases',
    totalMarks: 100
  },
];

export default function AcademicsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('timetable');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const academicStats = [
    {
      title: 'Pending Assignments',
      value: '3',
      subtitle: '2 due this week',
      icon: <FileText className="h-6 w-6 text-white" />,
      color: 'bg-orange-500',
    },
    {
      title: 'Upcoming Exams',
      value: '2',
      subtitle: 'Next in 14 days',
      icon: <BookOpen className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Syllabus Coverage',
      value: '78%',
      subtitle: 'On track',
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Average Score',
      value: '85%',
      subtitle: 'Last 5 assignments',
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academics</h1>
          <p className="mt-1 text-sm text-gray-600">Manage timetable, assignments, and exams</p>
        </div>
        
        {(user?.role === 'teacher' || user?.role === 'class_teacher') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Assignment
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {academicStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['timetable', 'assignments', 'exams'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Card>
            <div className="space-y-4">
              {mockTimetable.map((period) => (
                <div key={period.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{period.subject}</h4>
                      <p className="text-sm text-gray-500">{period.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{period.time}</p>
                    <p className="text-sm text-gray-500">{period.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Assignments</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockAssignments.map((assignment) => (
              <Card key={assignment.id} hover>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                    <p className="text-sm text-gray-500">{assignment.subject}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status.replace('_', ' ').charAt(0).toUpperCase() + assignment.status.replace('_', ' ').slice(1)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{assignment.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Due: {assignment.dueDate.toLocaleDateString()}
                  </span>
                  <span className="text-gray-500">
                    {assignment.totalMarks} marks
                  </span>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button size="sm">
                    {assignment.status === 'pending' ? 'Start Assignment' : 'View Details'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Exams Tab */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Exams</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockExams.map((exam) => (
              <Card key={exam.id} hover>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{exam.subject}</h4>
                    <p className="text-sm text-gray-500">{exam.date.toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      {getDaysUntil(exam.date)}
                    </span>
                    <p className="text-xs text-gray-500">days left</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="text-gray-900">{exam.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Marks:</span>
                    <span className="text-gray-900">{exam.totalMarks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Syllabus:</span>
                    <span className="text-gray-900 text-right">{exam.syllabus}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button size="sm" variant="outline">
                    View Syllabus
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}