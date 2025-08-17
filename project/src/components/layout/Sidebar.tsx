import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  BookOpen, 
  MessageSquare, 
  PieChart, 
  Settings,
  UserCheck,
  ClipboardList,
  Palette,
  Bus,
  DollarSign,
  Shield,
  Heart,
  Award,
  Clock,
  BarChart3,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  roles: UserRole[];
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin', 'cr', 'counsellor', 'medical_staff', 'librarian', 'transport_staff', 'moderator'],
  },
  {
    id: 'academics',
    label: 'Academics',
    icon: BookOpen,
    href: '/academics',
    roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin'],
    children: [
      {
        id: 'timetable',
        label: 'Timetable',
        icon: Clock,
        href: '/academics/timetable',
        roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin'],
      },
      {
        id: 'assignments',
        label: 'Assignments',
        icon: ClipboardList,
        href: '/academics/assignments',
        roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin'],
      },
      {
        id: 'exams',
        label: 'Exams',
        icon: Award,
        href: '/academics/exams',
        roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin'],
      },
    ],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: UserCheck,
    href: '/attendance',
    roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin'],
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageSquare,
    href: '/communication',
    roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin', 'cr'],
  },
  {
    id: 'leave',
    label: 'Leave Requests',
    icon: Calendar,
    href: '/leave',
    roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin'],
  },
  {
    id: 'creative',
    label: 'Creative Corner',
    icon: Palette,
    href: '/creative',
    roles: ['student', 'teacher', 'class_teacher', 'admin', 'moderator'],
  },
  {
    id: 'wellbeing',
    label: 'Wellbeing',
    icon: Heart,
    href: '/wellbeing',
    roles: ['student', 'parent', 'counsellor', 'medical_staff', 'admin'],
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: Settings,
    href: '/operations',
    roles: ['admin', 'teacher', 'class_teacher'],
    children: [
      {
        id: 'fees',
        label: 'Fee Management',
        icon: DollarSign,
        href: '/operations/fees',
        roles: ['parent', 'admin'],
      },
      {
        id: 'transport',
        label: 'Transport',
        icon: Bus,
        href: '/operations/transport',
        roles: ['parent', 'student', 'transport_staff', 'admin'],
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: PieChart,
    href: '/reports',
    roles: ['teacher', 'class_teacher', 'admin'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
    roles: ['admin', 'teacher', 'class_teacher', 'parent', 'student'],
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    href: '/profile',
    roles: ['student', 'parent', 'teacher', 'class_teacher', 'admin', 'cr', 'counsellor', 'medical_staff', 'librarian', 'transport_staff', 'moderator'],
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    href: '/users',
    roles: ['admin'],
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    href: '/security',
    roles: ['admin', 'counsellor'],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const isItemVisible = (item: MenuItem) => {
    return user?.role && item.roles.includes(user.role);
  };

  const isItemActive = (item: MenuItem) => {
    return location.pathname === item.href || 
           (item.children && item.children.some(child => location.pathname === child.href));
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    if (!isItemVisible(item)) return null;

    const Icon = item.icon;
    const isActive = isItemActive(item);
    
    return (
      <div key={item.id}>
        <Link
          to={item.href}
          onClick={onClose}
          className={`
            flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
            ${depth === 0 ? 'mx-2' : 'mx-6 ml-8'}
            ${isActive
              ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
          `}
        >
          <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
          {item.label}
        </Link>
        
        {item.children && (
          <div className="mt-1 space-y-1">
            {item.children.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center flex-shrink-0 px-4 lg:hidden">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SM</span>
          </div>
          <span className="ml-2 text-lg font-semibold text-gray-900">
            School Manager
          </span>
        </div>
        
        <nav className="mt-8 lg:mt-5 space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>

        {/* User info at bottom */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center">
              {user.avatar ? (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}