// Core entity types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 
  | 'student' 
  | 'parent' 
  | 'teacher' 
  | 'class_teacher' 
  | 'admin' 
  | 'cr' 
  | 'counsellor' 
  | 'medical_staff' 
  | 'librarian' 
  | 'transport_staff' 
  | 'moderator';

export interface Student extends User {
  studentId: string;
  class: string;
  section: string;
  rollNumber: number;
  parentIds: string[];
  admissionDate: Date;
  bloodGroup?: string;
  address?: string;
}

export interface Parent extends User {
  children: string[]; // student IDs
  occupation?: string;
  relationToChild: 'mother' | 'father' | 'guardian';
}

export interface Teacher extends User {
  employeeId: string;
  subjects: string[];
  classes: string[];
  department: string;
  joinDate: Date;
  isClassTeacher?: boolean;
  classTeacherOf?: string; // class-section
}

export interface Class {
  id: string;
  name: string; // "Class 5"
  section: string; // "A"
  classTeacherId?: string;
  students: string[];
  subjects: string[];
  academicYear: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  class: string;
  teacherIds: string[];
  syllabus?: string;
  books: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'medical' | 'authorized';
  markedBy: string;
  reason?: string;
  markedAt: Date;
}

export interface AttendanceStreak {
  studentId: string;
  currentStreak: number;
  bestStreak: number;
  lastAttendanceDate: Date;
  totalPresent: number;
  totalDays: number;
  percentage: number;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  parentId: string;
  fromDate: Date;
  toDate: Date;
  type: 'full_day' | 'half_day';
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  attachments?: string[];
  submittedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  comments?: string;
}

export interface TeacherLeave {
  id: string;
  teacherId: string;
  fromDate: Date;
  toDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  replacementTeacherId?: string;
  affectedClasses: string[];
  submittedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  classId: string;
  teacherId: string;
  dueDate: Date;
  totalMarks: number;
  attachments?: string[];
  rubric?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  attachments?: string[];
  submittedAt: Date;
  marksObtained?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
}

export interface CreativePost {
  id: string;
  title: string;
  description: string;
  category: CreativeCategory;
  authorId: string;
  authorType: 'student' | 'teacher';
  content: string;
  images?: string[];
  videos?: string[];
  status: 'draft' | 'pending_review' | 'published' | 'rejected';
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  moderatedBy?: string;
  moderatedAt?: Date;
}

export type CreativeCategory = 
  | 'art' 
  | 'writing' 
  | 'science_models' 
  | 'music' 
  | 'dance' 
  | 'coding' 
  | 'other';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  targetAudience: ('students' | 'parents' | 'teachers')[];
  targetClasses?: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: string[];
  publishedAt: Date;
  expiresAt?: Date;
  readBy: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionUrl?: string;
  data?: Record<string, any>;
  createdAt: Date;
  readAt?: Date;
}

export type NotificationType = 
  | 'announcement' 
  | 'assignment' 
  | 'attendance' 
  | 'leave' 
  | 'exam' 
  | 'fee' 
  | 'transport' 
  | 'creative' 
  | 'system';

export interface Timetable {
  id: string;
  classId: string;
  day: string;
  periods: Period[];
  effectiveDate: Date;
  createdBy: string;
}

export interface Period {
  id: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  teacherId: string;
  room?: string;
  type: 'regular' | 'break' | 'lunch' | 'assembly' | 'sports';
}

export interface TimetableChange {
  id: string;
  originalPeriodId: string;
  newTeacherId?: string;
  newSubjectId?: string;
  newRoom?: string;
  reason: string;
  changeDate: Date;
  affectedClasses: string[];
  notificationsSent: boolean;
  createdBy: string;
  createdAt: Date;
}

// Dashboard and UI types
export interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  color: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label: string;
  };
  action?: {
    label: string;
    href: string;
  };
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  href: string;
  roles: UserRole[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  roles: UserRole[];
  children?: MenuItem[];
}