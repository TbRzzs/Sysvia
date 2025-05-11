
import React, { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Plus, Smartphone, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/stat-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Moviles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  const mockMobileDevices = [
    { id: '1', modelo: 'iPhone 13', serial: 'APLE123456', responsable: 'Juan Pérez', estado: 'Activo' },
    { id: '2', modelo: 'Samsung Galaxy S22', serial: 'SAMG789012', responsable: 'María Gómez', estado: 'Activo' },
    { id: '3', modelo: 'Xiaomi Redmi Note 10', serial: 'XIAMI345678', responsable: 'Carlos López', estado: 'Inactivo' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-between'} px-4 py-4 md:px-6`}>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Dispositivos Móviles</h1>
              <p className="text-xs md:text-sm text-envio-gray-500">Gestiona los dispositivos móviles de la organización</p>
            </div>
            
            <div className={`flex ${isMobile ? 'w-full' : ''} items-center space-x-3`}>
              <Button 
                variant="default" 
                className={`${isMobile ? 'flex-1' : ''} bg-envio-red text-white hover:bg-envio-red/90`}
              >
                <span>Añadir Dispositivo</span>
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        
        <div className="p-4 md:p-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard 
              title="Total Dispositivos" 
              value="24"
              icon={<Smartphone className="h-5 w-5" />}
              trend={{ value: 3, isPositive: true }}
            />
            
            <StatCard 
              title="Activos" 
              value="20"
              icon={<Smartphone className="h-5 w-5" />}
            />
            
            <StatCard 
              title="Inactivos" 
              value="4"
              icon={<Smartphone className="h-5 w-5" />}
              trend={{ value: 1, isPositive: false }}
            />
          </div>
          
          {/* Búsqueda y Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-envio-gray-400" size={18} />
              <Input 
                placeholder="Buscar por modelo, serie o responsable..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[60vh]">
                  <div className="py-4">
                    <h3 className="text-lg font-medium mb-4">Filtros</h3>
                    {/* Contenido de filtros para móvil */}
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            )}
          </div>
          
          {/* Tabla de Dispositivos */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ScrollArea className="h-[calc(100vh-350px)]">
              <table className="w-full">
                <thead>
                  <tr className="bg-envio-gray-50 text-envio-gray-600 text-left">
                    <th className="py-3 px-4 font-medium">Modelo</th>
                    <th className="py-3 px-4 font-medium hidden md:table-cell">Serial</th>
                    <th className="py-3 px-4 font-medium">Responsable</th>
                    <th className="py-3 px-4 font-medium">Estado</th>
                    <th className="py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMobileDevices.map(device => (
                    <tr key={device.id} className="border-t hover:bg-envio-gray-50">
                      <td className="py-3 px-4">{device.modelo}</td>
                      <td className="py-3 px-4 hidden md:table-cell">{device.serial}</td>
                      <td className="py-3 px-4">{device.responsable}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          device.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {device.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700">
                            Editar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviles;
