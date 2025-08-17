import React, { useState } from 'react';
import { MessageSquare, Bell, Users, Send, Plus, Search, Filter, Pin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const mockAnnouncements = [
  {
    id: '1',
    title: 'Sports Day Rescheduled',
    content: 'Due to weather conditions, Sports Day has been rescheduled to next Friday, December 20th.',
    author: 'Principal Office',
    priority: 'high',
    targetAudience: ['students', 'parents'],
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    readBy: ['user-1', 'user-2'],
    pinned: true,
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    content: 'Monthly parent-teacher meeting scheduled for December 15th from 10 AM to 4 PM.',
    author: 'Academic Office',
    priority: 'medium',
    targetAudience: ['parents'],
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    readBy: [],
    pinned: false,
  },
  {
    id: '3',
    title: 'Library New Books',
    content: 'New collection of science and mathematics books available in the library.',
    author: 'Library',
    priority: 'low',
    targetAudience: ['students', 'teachers'],
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    readBy: ['user-1'],
    pinned: false,
  },
];

const mockMessages = [
  {
    id: '1',
    sender: 'Ms. Johnson',
    senderRole: 'teacher',
    subject: 'Math Assignment Clarification',
    preview: 'Regarding the homework assigned yesterday...',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    sender: 'Principal Office',
    senderRole: 'admin',
    subject: 'Field Trip Permission',
    preview: 'Please submit the permission slip for...',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '3',
    sender: 'Transport Department',
    senderRole: 'transport_staff',
    subject: 'Bus Route Change',
    preview: 'There will be a temporary change in...',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
];

export default function CommunicationPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('announcements');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const communicationStats = [
    {
      title: 'Unread Messages',
      value: '3',
      subtitle: '1 from teacher',
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'New Announcements',
      value: '2',
      subtitle: 'This week',
      icon: <Bell className="h-6 w-6 text-white" />,
      color: 'bg-orange-500',
    },
    {
      title: 'Active Chats',
      value: '5',
      subtitle: 'Teachers & Parents',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Response Rate',
      value: '95%',
      subtitle: 'Within 24 hours',
      icon: <Send className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const canCreateAnnouncement = user?.role === 'admin' || user?.role === 'class_teacher';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
          <p className="mt-1 text-sm text-gray-600">Stay connected with announcements and messages</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          {canCreateAnnouncement && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          )}
          <Button variant="outline" onClick={() => setShowComposeModal(true)}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Compose Message
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {communicationStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['announcements', 'messages', 'events'].map((tab) => (
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

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">School Announcements</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search announcements..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {mockAnnouncements.map((announcement) => (
              <Card key={announcement.id} hover className="relative">
                {announcement.pinned && (
                  <div className="absolute top-4 right-4">
                    <Pin className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{announcement.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>By {announcement.author}</span>
                      <span>{announcement.publishedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Target: {announcement.targetAudience.join(', ')}</span>
                    <span>Read by {announcement.readBy.length} users</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Mark as Read
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Messages</h3>
            <Button onClick={() => setShowComposeModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1">
              <Card padding="none">
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {mockMessages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => setSelectedMessage(message.id)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 ${
                        selectedMessage === message.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {message.sender}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className={`text-sm ${!message.read ? 'text-gray-900' : 'text-gray-600'} mb-1`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                      {!message.read && (
                        <div className="mt-2">
                          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Message Content */}
            <div className="lg:col-span-2">
              <Card>
                {selectedMessage ? (
                  <div>
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <h4 className="font-medium text-gray-900">Math Assignment Clarification</h4>
                      <p className="text-sm text-gray-500">From Ms. Johnson • 30 minutes ago</p>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <p>Dear Parent,</p>
                      <p>
                        I wanted to clarify the mathematics assignment that was given yesterday. 
                        The students need to complete exercises 1-20 from Chapter 5, focusing on 
                        algebraic equations.
                      </p>
                      <p>
                        If your child needs any additional help, please don't hesitate to reach out. 
                        I'm available during office hours from 2:00 PM to 3:00 PM.
                      </p>
                      <p>Best regards,<br />Ms. Johnson</p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Button>
                          <Send className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="outline">Forward</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select a message to view its content</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Event Memories</h3>
          
          <Card>
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Event Memories</h4>
              <p className="text-gray-500 mb-4">Share and view photos from school events</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Event Photos
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Compose Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select recipient...</option>
                  <option>Ms. Johnson (Math Teacher)</option>
                  <option>Mr. Smith (Class Teacher)</option>
                  <option>Principal Office</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowComposeModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowComposeModal(false)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}