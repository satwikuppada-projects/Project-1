import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// Mock chart component (in a real app, you'd use a library like Chart.js or Recharts)
const MockChart = ({ title, type = 'bar' }: { title: string; type?: string }) => (
  <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xs text-gray-500 mt-1">Chart visualization would appear here</p>
    </div>
  </div>
);

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('attendance');

  const analyticsStats = [
    {
      title: 'Overall Attendance',
      value: '94.2%',
      subtitle: 'This month',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
      trend: { value: 2.1, direction: 'up' as const, label: 'from last month' },
    },
    {
      title: 'Assignment Completion',
      value: '87%',
      subtitle: 'On-time submissions',
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
      trend: { value: 5.3, direction: 'up' as const, label: 'improvement' },
    },
    {
      title: 'Academic Performance',
      value: '82.5%',
      subtitle: 'Average score',
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
      trend: { value: 1.2, direction: 'down' as const, label: 'from last term' },
    },
    {
      title: 'Parent Engagement',
      value: '91%',
      subtitle: 'Message response rate',
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      color: 'bg-orange-500',
      trend: { value: 8.7, direction: 'up' as const, label: 'this quarter' },
    },
  ];

  const getAnalyticsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: 'School Analytics Dashboard',
          description: 'Comprehensive insights across all departments and classes',
          charts: [
            'School-wide Attendance Trends',
            'Academic Performance by Grade',
            'Teacher Performance Metrics',
            'Parent Engagement Statistics',
            'Fee Collection Analysis',
            'Transport Utilization'
          ]
        };
      
      case 'teacher':
      case 'class_teacher':
        return {
          title: 'Class Analytics',
          description: 'Insights for your classes and subjects',
          charts: [
            'Class Attendance Patterns',
            'Assignment Submission Rates',
            'Student Performance Trends',
            'Parent Communication Stats',
            'Syllabus Coverage Progress',
            'At-Risk Student Identification'
          ]
        };
      
      case 'parent':
        return {
          title: 'Child Progress Analytics',
          description: 'Detailed insights into your child\'s academic journey',
          charts: [
            'Attendance History',
            'Academic Performance Trends',
            'Assignment Completion Rates',
            'Subject-wise Progress',
            'Extracurricular Participation',
            'Peer Comparison (Anonymous)'
          ]
        };
      
      case 'student':
        return {
          title: 'My Progress Dashboard',
          description: 'Track your academic progress and achievements',
          charts: [
            'My Attendance Streak',
            'Grade Trends by Subject',
            'Assignment Performance',
            'Creative Corner Engagement',
            'Goal Achievement Progress',
            'Skill Development Radar'
          ]
        };
      
      default:
        return {
          title: 'Analytics Dashboard',
          description: 'Data insights and reports',
          charts: ['General Analytics']
        };
    }
  };

  const analyticsData = getAnalyticsForRole();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{analyticsData.title}</h1>
          <p className="mt-1 text-sm text-gray-600">{analyticsData.description}</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {analyticsStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="attendance">Attendance</option>
                <option value="performance">Academic Performance</option>
                <option value="engagement">Engagement</option>
                <option value="behavior">Behavior</option>
              </select>
            </div>
            
            {(user?.role === 'admin' || user?.role === 'teacher') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class/Grade</label>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Classes</option>
                  <option value="grade-1">Grade 1</option>
                  <option value="grade-2">Grade 2</option>
                  <option value="grade-3">Grade 3</option>
                  <option value="grade-4">Grade 4</option>
                  <option value="grade-5">Grade 5</option>
                </select>
              </div>
            )}
          </div>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analyticsData.charts.map((chartTitle, index) => (
          <Card key={index}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">{chartTitle}</h3>
            <MockChart title={chartTitle} />
          </Card>
        ))}
      </div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Attendance Improvement</p>
                <p className="text-sm text-gray-600">Overall attendance has increased by 2.1% this month, with Grade 5 showing the most improvement.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Assignment Trends</p>
                <p className="text-sm text-gray-600">Mathematics assignments show 15% higher completion rates compared to other subjects.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Parent Engagement</p>
                <p className="text-sm text-gray-600">Parent response rates to school communications have improved significantly this quarter.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Focus on Science Engagement</p>
              <p className="text-sm text-blue-700">Consider interactive experiments to improve science assignment completion rates.</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Maintain Attendance Momentum</p>
              <p className="text-sm text-green-700">Continue current attendance incentive programs as they're showing positive results.</p>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-900">Early Intervention Needed</p>
              <p className="text-sm text-yellow-700">3 students showing declining performance patterns - recommend counselor consultation.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Summary Table */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user?.role === 'admin' ? 'Class' : user?.role === 'parent' ? 'Subject' : 'Metric'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {['Mathematics', 'English', 'Science', 'History', 'Art'].map((subject, index) => (
                <tr key={subject} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {95 - index}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {88 - index * 2}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TrendingUp className={`h-4 w-4 mr-1 ${index % 2 === 0 ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm ${index % 2 === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {index % 2 === 0 ? '+' : '-'}{Math.abs(2.1 - index * 0.5)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      index < 2 ? 'bg-green-100 text-green-800' : 
                      index < 4 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {index < 2 ? 'Excellent' : index < 4 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}