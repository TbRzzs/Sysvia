
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { BarChart, PieChart, AreaChart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataChart } from '@/components/data-chart';

const Reportes = () => {
  const equiposByTypeData = [
    { name: 'Laptop', value: 65 },
    { name: 'Desktop', value: 90 },
    { name: 'Servidor', value: 30 },
    { name: 'Otros', value: 15 },
  ];
  
  const areaDistributionData = [
    { name: 'Tecnología', desktop: 30, laptop: 40, servidor: 25 },
    { name: 'Administración', desktop: 25, laptop: 15, servidor: 3 },
    { name: 'Operaciones', desktop: 35, laptop: 10, servidor: 2 },
  ];
  
  const monthlyMaintenanceData = [
    { name: 'Ene', preventivo: 12, correctivo: 5 },
    { name: 'Feb', preventivo: 15, correctivo: 7 },
    { name: 'Mar', preventivo: 18, correctivo: 4 },
    { name: 'Abr', preventivo: 14, correctivo: 8 },
    { name: 'May', preventivo: 21, correctivo: 6 },
  ];
  
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">Reportes y Estadísticas</h1>
              <p className="text-sm text-envio-gray-500">Visualiza indicadores clave de rendimiento</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center text-sm text-envio-red border-envio-red hover:bg-envio-red/5">
                <Download className="h-4 w-4 mr-2" />
                Exportar Reportes
              </Button>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-medium text-lg">Equipos por Tipo</h2>
                  <p className="text-envio-gray-500 text-sm">Distribución actual</p>
                </div>
                <BarChart className="h-5 w-5 text-envio-gray-400" />
              </div>
              
              <div className="h-[300px]">
                <DataChart 
                  data={equiposByTypeData} 
                  lines={[
                    { dataKey: 'value', stroke: '#0A84FF', name: 'Cantidad' }
                  ]}
                  height={300}
                />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-medium text-lg">Distribución por Áreas</h2>
                  <p className="text-envio-gray-500 text-sm">Equipos por departamento</p>
                </div>
                <AreaChart className="h-5 w-5 text-envio-gray-400" />
              </div>
              
              <div className="h-[300px]">
                <DataChart 
                  data={areaDistributionData} 
                  lines={[
                    { dataKey: 'desktop', stroke: '#0A84FF', name: 'Desktop' },
                    { dataKey: 'laptop', stroke: '#30D158', name: 'Laptop' },
                    { dataKey: 'servidor', stroke: '#FF9F0A', name: 'Servidor' }
                  ]}
                  height={300}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-medium text-lg">Mantenimientos Mensuales</h2>
                <p className="text-envio-gray-500 text-sm">Preventivos vs. correctivos</p>
              </div>
              <PieChart className="h-5 w-5 text-envio-gray-400" />
            </div>
            
            <div className="h-[300px]">
              <DataChart 
                data={monthlyMaintenanceData} 
                lines={[
                  { dataKey: 'preventivo', stroke: '#0A84FF', name: 'Preventivo' },
                  { dataKey: 'correctivo', stroke: '#FF453A', name: 'Correctivo' }
                ]}
                height={300}
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-medium mb-4">Estadísticas generales</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Indicador</th>
                    <th className="text-left py-3 px-4">Valor actual</th>
                    <th className="text-left py-3 px-4">Tendencia</th>
                    <th className="text-left py-3 px-4">% Cambio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Tiempo medio entre fallos</td>
                    <td className="py-3 px-4">45 días</td>
                    <td className="py-3 px-4">
                      <div className="w-24 bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-600">+12.5%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Tiempo de resolución promedio</td>
                    <td className="py-3 px-4">1.2 días</td>
                    <td className="py-3 px-4">
                      <div className="w-24 bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-600">+5.2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Satisfacción del usuario</td>
                    <td className="py-3 px-4">92%</td>
                    <td className="py-3 px-4">
                      <div className="w-24 bg-gray-200 h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-600">+3.8%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Eficacia de mantenimiento preventivo</td>
                    <td className="py-3 px-4">87%</td>
                    <td className="py-3 px-4">
                      <div className="w-24 bg-gray-200 h-2 rounded-full">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '87%'}}></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-yellow-600">+0.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
