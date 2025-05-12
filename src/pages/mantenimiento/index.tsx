
import React from 'react';
import { Wrench, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { StatCard } from '@/components/stat-card';

const Mantenimiento = () => {
  return (
    <div className="p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Mantenimientos totales" 
          value="124"
          icon={<Wrench className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
          footer={
            <div className="flex items-center justify-between">
              <span>Este mes</span>
              <span className="font-medium">+18</span>
            </div>
          }
        />
        
        <StatCard 
          title="Pendientes" 
          value="23"
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: 5, isPositive: false }}
          footer={
            <div className="flex items-center justify-between">
              <span>Urgentes</span>
              <span className="font-medium text-envio-red">8</span>
            </div>
          }
        />
        
        <StatCard 
          title="Incidencias" 
          value="17"
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: 3, isPositive: false }}
          footer={
            <div className="flex items-center justify-between">
              <span>Sin resolver</span>
              <span className="font-medium">5</span>
            </div>
          }
        />
        
        <StatCard 
          title="Completados" 
          value="84"
          icon={<CheckCircle className="h-5 w-5" />}
          trend={{ value: 15, isPositive: true }}
          footer={
            <div className="flex items-center justify-between">
              <span>Satisfacción</span>
              <span className="font-medium text-envio-green">98%</span>
            </div>
          }
        />
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
        <h2 className="text-xl font-medium mb-4">Próximos mantenimientos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Equipo</th>
                <th className="text-left py-3 px-4">Tipo</th>
                <th className="text-left py-3 px-4">Técnico</th>
                <th className="text-left py-3 px-4">Fecha</th>
                <th className="text-left py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">M001</td>
                <td className="py-3 px-4">01SISPE01</td>
                <td className="py-3 px-4">Preventivo</td>
                <td className="py-3 px-4">Carlos Mendez</td>
                <td className="py-3 px-4">15/05/2025</td>
                <td className="py-3 px-4"><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Pendiente</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">M002</td>
                <td className="py-3 px-4">01SISPT01</td>
                <td className="py-3 px-4">Correctivo</td>
                <td className="py-3 px-4">Laura Gómez</td>
                <td className="py-3 px-4">17/05/2025</td>
                <td className="py-3 px-4"><span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Urgente</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">M003</td>
                <td className="py-3 px-4">01SRV01</td>
                <td className="py-3 px-4">Preventivo</td>
                <td className="py-3 px-4">Juan Pérez</td>
                <td className="py-3 px-4">20/05/2025</td>
                <td className="py-3 px-4"><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">Programado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Últimas incidencias</h2>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-medium">Fallo en disco duro</h3>
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Alto</span>
              </div>
              <p className="text-sm mt-1">Equipo: 01DTOP02 - Reportado: 10/05/2025</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-medium">Problemas de conectividad</h3>
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Medio</span>
              </div>
              <p className="text-sm mt-1">Equipo: 01SISPE02 - Reportado: 08/05/2025</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-medium">Actualización sistema</h3>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Bajo</span>
              </div>
              <p className="text-sm mt-1">Equipo: 01SRV01 - Reportado: 05/05/2025</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Resumen de mantenimientos</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-32">Preventivos:</div>
              <div className="flex-1 bg-gray-200 h-4 rounded-full">
                <div className="bg-blue-500 h-4 rounded-full" style={{width: '70%'}}></div>
              </div>
              <div className="w-12 text-right">70%</div>
            </div>
            <div className="flex items-center">
              <div className="w-32">Correctivos:</div>
              <div className="flex-1 bg-gray-200 h-4 rounded-full">
                <div className="bg-orange-500 h-4 rounded-full" style={{width: '20%'}}></div>
              </div>
              <div className="w-12 text-right">20%</div>
            </div>
            <div className="flex items-center">
              <div className="w-32">Emergencia:</div>
              <div className="flex-1 bg-gray-200 h-4 rounded-full">
                <div className="bg-red-500 h-4 rounded-full" style={{width: '10%'}}></div>
              </div>
              <div className="w-12 text-right">10%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mantenimiento;
