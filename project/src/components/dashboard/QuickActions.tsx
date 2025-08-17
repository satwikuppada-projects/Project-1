import React from 'react';
import { 
  UserCheck, 
  ClipboardList, 
  MessageSquare, 
  Calendar, 
  Users, 
  Settings,
  Palette,
  PlusCircle,
  FileText,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import Card from '../common/Card';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  href: string;
  roles: UserRole[];
  onClick?: () => void;
}

const quickActions: QuickAction[] = [
  {
    id: 'mark-attendance',
    label: 'Mark Attendance',
    icon: UserCheck,
    color: 'bg-green-100 text-green-600',
    href: '/attendance',
    roles: ['teacher', 'class_teacher'],
  },
  {
    id: 'create-assignment',
    label: 'Create Assignment',
    icon: ClipboardList,
    color: 'bg-blue-100 text-blue-600',
    href: '/academics/assignments',
    roles: ['teacher', 'class_teacher'],
  },
  {
    id: 'send-message',
    label: 'Send Message',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-600',
    href: '/communication',
    roles: ['teacher', 'class_teacher', 'parent', 'admin'],
  },
  {
    id: 'request-leave',
    label: 'Request Leave',
    icon: Calendar,
    color: 'bg-yellow-100 text-yellow-600',
    href: '/leave',
    roles: ['student', 'parent', 'teacher'],
  },
  {
    id: 'create-post',
    label: 'Create Post',
    icon: Palette,
    color: 'bg-pink-100 text-pink-600',
    href: '/creative',
    roles: ['student', 'teacher'],
  },
  {
    id: 'manage-users',
    label: 'Manage Users',
    icon: Users,
    color: 'bg-indigo-100 text-indigo-600',
    href: '/users',
    roles: ['admin'],
  },
  {
    id: 'create-announcement',
    label: 'Create Announcement',
    icon: Bell,
    color: 'bg-red-100 text-red-600',
    href: '/communication',
    roles: ['admin', 'class_teacher'],
  },
  {
    id: 'generate-report',
    label: 'Generate Report',
    icon: FileText,
    color: 'bg-gray-100 text-gray-600',
    href: '/reports',
    roles: ['admin', 'teacher', 'class_teacher'],
  },
];

export default function QuickActions() {
  const { user } = useAuth();

  const visibleActions = quickActions.filter(action => 
    user?.role && action.roles.includes(user.role)
  );

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-900 mt-2 text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}