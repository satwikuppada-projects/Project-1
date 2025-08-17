import React, { useState } from 'react';
import { Check, X, Clock, Heart } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface Student {
  id: string;
  name: string;
  rollNumber: number;
  avatar?: string;
  status?: 'present' | 'absent' | 'late' | 'medical';
}

interface AttendanceMarkerProps {
  students: Student[];
  onSave: (attendance: Record<string, string>) => void;
}

const statusOptions = [
  { value: 'present', label: 'Present', icon: Check, color: 'text-green-600' },
  { value: 'absent', label: 'Absent', icon: X, color: 'text-red-600' },
  { value: 'late', label: 'Late', icon: Clock, color: 'text-yellow-600' },
  { value: 'medical', label: 'Medical', icon: Heart, color: 'text-blue-600' },
];

export default function AttendanceMarker({ students, onSave }: AttendanceMarkerProps) {
  const [attendance, setAttendance] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    students.forEach(student => {
      initial[student.id] = student.status || 'present';
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(attendance);
    } finally {
      setLoading(false);
    }
  };

  const getStatusCounts = () => {
    const counts = { present: 0, absent: 0, late: 0, medical: 0 };
    Object.values(attendance).forEach(status => {
      counts[status as keyof typeof counts]++;
    });
    return counts;
  };

  const counts = getStatusCounts();

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Mark Attendance</h3>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-green-600">Present: {counts.present}</span>
          <span className="text-red-600">Absent: {counts.absent}</span>
          <span className="text-yellow-600">Late: {counts.late}</span>
          <span className="text-blue-600">Medical: {counts.medical}</span>
        </div>
      </div>

      <div className="space-y-4">
        {students.map(student => (
          <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              {student.avatar ? (
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-500">Roll No: {student.rollNumber}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {statusOptions.map(option => {
                const Icon = option.icon;
                const isSelected = attendance[student.id] === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleStatusChange(student.id, option.value)}
                    className={`p-2 rounded-lg border transition-colors duration-200 ${
                      isSelected
                        ? `bg-${option.value === 'present' ? 'green' : 
                              option.value === 'absent' ? 'red' : 
                              option.value === 'late' ? 'yellow' : 'blue'}-100 
                           border-${option.value === 'present' ? 'green' : 
                                    option.value === 'absent' ? 'red' : 
                                    option.value === 'late' ? 'yellow' : 'blue'}-300 
                           ${option.color}`
                        : 'border-gray-200 text-gray-400 hover:bg-gray-50'
                    }`}
                    title={option.label}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Total Students: {students.length}
        </p>
        
        <Button onClick={handleSave} loading={loading}>
          Save Attendance
        </Button>
      </div>
    </Card>
  );
}