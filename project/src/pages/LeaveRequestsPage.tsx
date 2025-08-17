import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Plus, Filter, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const mockLeaveRequests = [
  {
    id: '1',
    studentName: 'Alex Kumar',
    parentName: 'Raj Kumar',
    fromDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    toDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    type: 'full_day',
    reason: 'Medical appointment',
    status: 'pending',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    attachments: ['medical_certificate.pdf'],
  },
  {
    id: '2',
    studentName: 'Sarah Johnson',
    parentName: 'Emily Johnson',
    fromDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    toDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    type: 'full_day',
    reason: 'Family wedding',
    status: 'approved',
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    reviewedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    reviewedBy: 'Ms. Wilson',
  },
  {
    id: '3',
    studentName: 'Michael Chen',
    parentName: 'Li Chen',
    fromDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    toDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    type: 'half_day',
    reason: 'Dental appointment',
    status: 'rejected',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    reviewedBy: 'Mr. Smith',
    comments: 'Please reschedule for after school hours',
  },
];

export default function LeaveRequestsPage() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    type: 'full_day',
    reason: '',
    attachments: null as File | null,
  });

  const leaveStats = [
    {
      title: 'Pending Requests',
      value: '3',
      subtitle: 'Awaiting approval',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Approved This Month',
      value: '8',
      subtitle: '2 days total',
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Rejected',
      value: '1',
      subtitle: 'This month',
      icon: <XCircle className="h-6 w-6 text-white" />,
      color: 'bg-red-500',
    },
    {
      title: 'Attendance Rate',
      value: '96%',
      subtitle: 'After leaves',
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredRequests = selectedStatus === 'all' 
    ? mockLeaveRequests 
    : mockLeaveRequests.filter(req => req.status === selectedStatus);

  const canCreateRequest = user?.role === 'parent' || user?.role === 'student';
  const canApproveRequests = user?.role === 'class_teacher' || user?.role === 'admin';

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting leave request:', formData);
    setShowCreateModal(false);
    // Reset form
    setFormData({
      fromDate: '',
      toDate: '',
      type: 'full_day',
      reason: '',
      attachments: null,
    });
  };

  const handleApproveReject = (requestId: string, action: 'approve' | 'reject') => {
    console.log(`${action} request:`, requestId);
    // Handle approval/rejection logic
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
          <p className="mt-1 text-sm text-gray-600">
            {canCreateRequest ? 'Manage your leave requests' : 'Review and approve leave requests'}
          </p>
        </div>
        
        {canCreateRequest && (
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Request Leave
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {leaveStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Leave Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} hover>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">
                    {user?.role === 'parent' || user?.role === 'student' 
                      ? `Leave Request - ${request.type.replace('_', ' ')}`
                      : `${request.studentName} - ${request.type.replace('_', ' ')}`
                    }
                  </h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status}</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-500">Dates</p>
                    <p className="text-sm font-medium text-gray-900">
                      {request.fromDate.toLocaleDateString()} 
                      {request.fromDate.getTime() !== request.toDate.getTime() && 
                        ` - ${request.toDate.toLocaleDateString()}`
                      }
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Reason</p>
                    <p className="text-sm font-medium text-gray-900">{request.reason}</p>
                  </div>
                  
                  {(user?.role === 'class_teacher' || user?.role === 'admin') && (
                    <div>
                      <p className="text-sm text-gray-500">Requested by</p>
                      <p className="text-sm font-medium text-gray-900">{request.parentName}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="text-sm font-medium text-gray-900">
                      {request.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {request.attachments && request.attachments.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">Attachments</p>
                    <div className="flex flex-wrap gap-2">
                      {request.attachments.map((attachment, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {attachment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {request.comments && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500">Comments</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{request.comments}</p>
                  </div>
                )}

                {request.reviewedAt && (
                  <div className="text-xs text-gray-500">
                    Reviewed by {request.reviewedBy} on {request.reviewedAt.toLocaleDateString()}
                  </div>
                )}
              </div>

              {canApproveRequests && request.status === 'pending' && (
                <div className="flex items-center space-x-2 ml-4">
                  <Button 
                    size="sm" 
                    onClick={() => handleApproveReject(request.id, 'approve')}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => handleApproveReject(request.id, 'reject')}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
          <p className="text-gray-500 mb-4">
            {selectedStatus === 'all' 
              ? 'No leave requests have been submitted yet' 
              : `No ${selectedStatus} leave requests found`}
          </p>
          {canCreateRequest && (
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Request
            </Button>
          )}
        </Card>
      )}

      {/* Create Leave Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Request Leave</h3>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    required
                    value={formData.fromDate}
                    onChange={(e) => setFormData({...formData, fromDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    required
                    value={formData.toDate}
                    onChange={(e) => setFormData({...formData, toDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as 'full_day' | 'half_day'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full_day">Full Day</option>
                  <option value="half_day">Half Day</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea
                  required
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide reason for leave"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (Optional)</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFormData({...formData, attachments: e.target.files?.[0] || null})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG files only</p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}