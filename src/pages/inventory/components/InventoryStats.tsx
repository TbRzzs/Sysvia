
import React from 'react';
import { StatCard } from '@/components/stat-card';
import { Laptop, Smartphone, MonitorDown, Router, Calendar } from 'lucide-react';

export const InventoryStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard 
        title="Equipos registrados" 
        value="127"
        icon={<Laptop className="h-5 w-5" />}
        trend={{ value: 12, isPositive: true }}
        footer={
          <div className="flex items-center justify-between">
            <span>Último mes</span>
            <span className="font-medium">+15</span>
          </div>
        }
      />
      
      <StatCard 
        title="Dispositivos móviles" 
        value="43"
        icon={<Smartphone className="h-5 w-5" />}
        trend={{ value: 8, isPositive: true }}
        footer={
          <div className="flex items-center justify-between">
            <span>Último mes</span>
            <span className="font-medium">+5</span>
          </div>
        }
      />
      
      <StatCard 
        title="Servidores" 
        value="12"
        icon={<MonitorDown className="h-5 w-5" />}
        footer={
          <div className="flex items-center justify-between">
            <span>Disponibilidad</span>
            <span className="font-medium text-envio-green">99.9%</span>
          </div>
        }
      />
      
      <StatCard 
        title="Networking" 
        value="35"
        icon={<Router className="h-5 w-5" />}
        trend={{ value: 2, isPositive: false }}
        footer={
          <div className="flex items-center justify-between">
            <span>Último registro</span>
            <span className="font-medium flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              16-11-2025
            </span>
          </div>
        }
      />
    </div>
  );
};
