import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from '../types';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random()}`,
      createdAt: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true, readAt: new Date() } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true, readAt: new Date() }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Initialize with some sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: 'notif-1',
        userId: 'current-user',
        title: 'Assignment Due Tomorrow',
        message: 'Mathematics assignment is due tomorrow at 9:00 AM',
        type: 'assignment',
        priority: 'high',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: 'notif-2',
        userId: 'current-user',
        title: 'Attendance Marked',
        message: 'Your attendance has been marked as present for today',
        type: 'attendance',
        priority: 'low',
        read: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: 'notif-3',
        userId: 'current-user',
        title: 'New Announcement',
        message: 'Sports day has been rescheduled to next Friday',
        type: 'announcement',
        priority: 'medium',
        read: true,
        readAt: new Date(),
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    ];
    
    setNotifications(sampleNotifications);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}