import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../common/Card';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
  action,
}: DashboardCardProps) {
  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          
          {trend && (
            <div className="flex items-center mt-2">
              {trend.direction === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ml-1 ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.value}% {trend.label}
              </span>
            </div>
          )}
          
          {action && (
            <button
              onClick={action.onClick}
              className="text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium"
            >
              {action.label}
            </button>
          )}
        </div>
        
        <div className={`flex-shrink-0 p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
      
      {/* Decorative background */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-5 rounded-full -mr-16 -mt-16`} />
    </Card>
  );
}