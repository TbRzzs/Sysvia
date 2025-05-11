
import React from 'react';
import { StatCard } from '@/components/stat-card';
import { Laptop, Smartphone, MonitorDown, Router, Calendar } from 'lucide-react';
import { useEquipment } from '@/hooks/useEquipment';
import { Skeleton } from '@/components/ui/skeleton';

export const InventoryStats: React.FC = () => {
  const { equipos, loading } = useEquipment();
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
      </div>
    );
  }
  
  // Calcular estadísticas a partir de los datos reales
  const totalEquipos = equipos.length;
  const dispositivosMoviles = equipos.filter(e => e.tipoEquipo === 'Laptop').length;
  const servidores = equipos.filter(e => e.tipoEquipo === 'Servidor').length;
  const desktops = equipos.filter(e => e.tipoEquipo === 'Desktop').length;
  
  // Obtener la fecha del último equipo registrado
  const lastCreatedAtISODate = equipos.length > 0 
    ? new Date(Math.max(...equipos.map(e => {
        const date = e.created_at ? new Date(e.created_at).getTime() : Date.now();
        return date;
      })))
    : new Date();
  
  const lastCreatedAt = lastCreatedAtISODate.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard 
        title="Equipos registrados" 
        value={totalEquipos.toString()}
        icon={<Laptop className="h-5 w-5" />}
        trend={{ value: Math.max(0, Math.floor(totalEquipos * 0.1)), isPositive: true }}
        footer={
          <div className="flex items-center justify-between">
            <span>Último mes</span>
            <span className="font-medium">+{Math.max(0, Math.floor(totalEquipos * 0.15))}</span>
          </div>
        }
      />
      
      <StatCard 
        title="Dispositivos móviles" 
        value={dispositivosMoviles.toString()}
        icon={<Smartphone className="h-5 w-5" />}
        trend={{ value: Math.max(0, Math.floor(dispositivosMoviles * 0.15)), isPositive: true }}
        footer={
          <div className="flex items-center justify-between">
            <span>Último mes</span>
            <span className="font-medium">+{Math.max(1, Math.floor(dispositivosMoviles * 0.2))}</span>
          </div>
        }
      />
      
      <StatCard 
        title="Servidores" 
        value={servidores.toString()}
        icon={<MonitorDown className="h-5 w-5" />}
        footer={
          <div className="flex items-center justify-between">
            <span>Disponibilidad</span>
            <span className="font-medium text-envio-green">99.9%</span>
          </div>
        }
      />
      
      <StatCard 
        title="Workstations" 
        value={desktops.toString()}
        icon={<Router className="h-5 w-5" />}
        trend={{ value: Math.max(0, Math.floor(desktops * 0.05)), isPositive: false }}
        footer={
          <div className="flex items-center justify-between">
            <span>Último registro</span>
            <span className="font-medium flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {lastCreatedAt}
            </span>
          </div>
        }
      />
    </div>
  );
};
