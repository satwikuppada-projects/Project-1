import React, { useState } from 'react';
import { Heart, Shield, AlertTriangle, Phone, MessageCircle, FileText, Plus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const mockMedicalVisits = [
  {
    id: '1',
    studentName: 'Alex Kumar',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    symptoms: 'Headache, mild fever',
    actionTaken: 'Rest, paracetamol given, parent notified',
    followUp: 'Monitor temperature',
    attendedBy: 'Nurse Sarah',
  },
  {
    id: '2',
    studentName: 'Sarah Johnson',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    symptoms: 'Stomach ache',
    actionTaken: 'Rest, water given',
    followUp: 'Returned to class after 30 minutes',
    attendedBy: 'Nurse Sarah',
  },
];

const mockReports = [
  {
    id: '1',
    type: 'bullying',
    reportedBy: 'Anonymous',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'in_review',
    priority: 'high',
    description: 'Student being teased during lunch break',
    assignedTo: 'Ms. Wilson (Counsellor)',
  },
  {
    id: '2',
    type: 'safety',
    reportedBy: 'Parent',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'resolved',
    priority: 'medium',
    description: 'Broken playground equipment',
    assignedTo: 'Maintenance Team',
  },
];

export default function WellbeingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    type: 'bullying',
    description: '',
    anonymous: false,
    location: '',
    witnesses: '',
  });

  const wellbeingStats = [
    {
      title: 'Medical Visits',
      value: '12',
      subtitle: 'This month',
      icon: <Heart className="h-6 w-6 text-white" />,
      color: 'bg-red-500',
    },
    {
      title: 'Safety Reports',
      value: '3',
      subtitle: '2 resolved',
      icon: <Shield className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Counselling Sessions',
      value: '8',
      subtitle: 'This week',
      icon: <MessageCircle className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Emergency Contacts',
      value: '24/7',
      subtitle: 'Always available',
      icon: <Phone className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'in_review': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canViewMedicalRecords = user?.role === 'medical_staff' || user?.role === 'admin' || user?.role === 'parent';
  const canViewReports = user?.role === 'counsellor' || user?.role === 'admin';
  const canCreateReport = true; // All users can report issues

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting report:', reportForm);
    setShowReportModal(false);
    setReportForm({
      type: 'bullying',
      description: '',
      anonymous: false,
      location: '',
      witnesses: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wellbeing & Safety</h1>
          <p className="mt-1 text-sm text-gray-600">Student health, safety, and support services</p>
        </div>
        
        {canCreateReport && (
          <Button onClick={() => setShowReportModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {wellbeingStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Emergency Contacts */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <div className="flex-shrink-0">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Emergency</p>
              <p className="text-sm text-red-600">911</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">School Nurse</p>
              <p className="text-sm text-blue-600">(555) 123-4567</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="flex-shrink-0">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Counsellor</p>
              <p className="text-sm text-green-600">(555) 123-4568</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'medical', 'reports', 'resources'].map((tab) => (
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Medical visit logged</p>
                  <p className="text-sm text-gray-500">Student visited nurse for headache - 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Safety report resolved</p>
                  <p className="text-sm text-gray-500">Playground equipment fixed - 1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Counselling session scheduled</p>
                  <p className="text-sm text-gray-500">Parent meeting arranged - 3 days ago</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Wellbeing Resources</h3>
            <div className="space-y-3">
              <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-gray-900">Mental Health Guidelines</h4>
                <p className="text-sm text-gray-500">Resources for students and parents</p>
              </a>
              
              <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-gray-900">Anti-Bullying Policy</h4>
                <p className="text-sm text-gray-500">School policies and procedures</p>
              </a>
              
              <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-gray-900">Emergency Procedures</h4>
                <p className="text-sm text-gray-500">What to do in emergencies</p>
              </a>
            </div>
          </Card>
        </div>
      )}

      {/* Medical Tab */}
      {activeTab === 'medical' && (
        <div className="space-y-6">
          {canViewMedicalRecords ? (
            <>
              <h3 className="text-lg font-medium text-gray-900">Medical Visit Records</h3>
              <div className="space-y-4">
                {mockMedicalVisits.map((visit) => (
                  <Card key={visit.id} hover>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{visit.studentName}</h4>
                          <span className="text-sm text-gray-500">{visit.date.toLocaleDateString()}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Symptoms</p>
                            <p className="text-gray-900">{visit.symptoms}</p>
                          </div>
                          
                          <div>
                            <p className="text-gray-500">Action Taken</p>
                            <p className="text-gray-900">{visit.actionTaken}</p>
                          </div>
                          
                          <div>
                            <p className="text-gray-500">Follow Up</p>
                            <p className="text-gray-900">{visit.followUp}</p>
                          </div>
                          
                          <div>
                            <p className="text-gray-500">Attended By</p>
                            <p className="text-gray-900">{visit.attendedBy}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Medical Records</h3>
              <p className="text-gray-500">Access restricted to medical staff and parents</p>
            </Card>
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {canViewReports ? (
            <>
              <h3 className="text-lg font-medium text-gray-900">Safety & Wellbeing Reports</h3>
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <Card key={report.id} hover>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900 capitalize">{report.type} Report</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Reported By</p>
                            <p className="text-gray-900">{report.reportedBy}</p>
                          </div>
                          
                          <div>
                            <p className="text-gray-500">Date</p>
                            <p className="text-gray-900">{report.date.toLocaleDateString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-gray-500">Assigned To</p>
                            <p className="text-gray-900">{report.assignedTo}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="text-center py-12">
              <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Safety Reports</h3>
              <p className="text-gray-500 mb-4">Access restricted to counsellors and administrators</p>
              <Button onClick={() => setShowReportModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Report an Issue
              </Button>
            </Card>
          )}
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mental Health Resources</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900">Student Helpline</h4>
                <p className="text-sm text-gray-500">24/7 support for students</p>
                <p className="text-sm text-blue-600">(555) HELP-123</p>
              </div>
              
              <div className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900">Parent Support Group</h4>
                <p className="text-sm text-gray-500">Monthly meetings and resources</p>
                <p className="text-sm text-blue-600">Every 2nd Saturday</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Safety Guidelines</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900">Bullying Prevention</h4>
                <p className="text-sm text-gray-500">How to recognize and report bullying</p>
              </div>
              
              <div className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900">Online Safety</h4>
                <p className="text-sm text-gray-500">Digital citizenship and safety tips</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Report Issue Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Report Safety or Wellbeing Issue</h3>
            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                <select
                  value={reportForm.type}
                  onChange={(e) => setReportForm({...reportForm, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bullying">Bullying</option>
                  <option value="safety">Safety Concern</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={4}
                  value={reportForm.description}
                  onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe the issue in detail..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
                <input
                  type="text"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Where did this occur?"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={reportForm.anonymous}
                  onChange={(e) => setReportForm({...reportForm, anonymous: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900">
                  Submit anonymously
                </label>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                      For immediate emergencies, please call 911 or contact school security directly.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowReportModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Report
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}