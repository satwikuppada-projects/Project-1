import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

const roleLabels: Record<UserRole, string> = {
  student: 'Student',
  parent: 'Parent',
  teacher: 'Teacher',
  class_teacher: 'Class Teacher',
  admin: 'Administrator',
  cr: 'Class Representative',
  counsellor: 'Counsellor',
  medical_staff: 'Medical Staff',
  librarian: 'Librarian',
  transport_staff: 'Transport Staff',
  moderator: 'Moderator',
};

// Available roles for demo purposes
const availableRoles: UserRole[] = ['admin', 'teacher', 'parent', 'student'];

export default function UserRoleSwitcher() {
  const { user, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{roleLabels[user.role]}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-200">
            Switch Role (Demo)
          </div>
          {availableRoles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSwitch(role)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                user.role === role ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              {roleLabels[role]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}