
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  footer?: ReactNode;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend,
  className,
  footer
}: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-5 shadow-sm border", 
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-envio-gray-500 text-sm font-medium">{title}</span>
        {icon && <div className="text-envio-gray-400">{icon}</div>}
      </div>
      
      <div className="flex items-end gap-2">
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <div className={cn(
            "text-sm font-medium flex items-center",
            trend.isPositive ? "text-envio-green" : "text-envio-red"
          )}>
            <span className="mr-1">
              {trend.isPositive ? '↑' : '↓'}
            </span>
            {trend.value}%
          </div>
        )}
      </div>

      {footer && (
        <div className="mt-4 pt-4 border-t text-sm text-envio-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
}
