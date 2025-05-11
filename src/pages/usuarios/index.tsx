
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Users, User, UserPlus, UserCheck } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { Button } from '@/components/ui/button';

const Usuarios = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
              <p className="text-sm text-envio-gray-500">Administra los usuarios del sistema</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="default" className="bg-envio-red text-white hover:bg-envio-red/90">
                <span>Añadir Usuario</span>
                <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Total Usuarios" 
              value="42"
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 5, isPositive: true }}
              footer={
                <div className="flex items-center justify-between">
                  <span>Activos</span>
                  <span className="font-medium">38</span>
                </div>
              }
            />
            
            <StatCard 
              title="Administradores" 
              value="8"
              icon={<UserCheck className="h-5 w-5" />}
              footer={
                <div className="flex items-center justify-between">
                  <span>Con acceso total</span>
                  <span className="font-medium">5</span>
                </div>
              }
            />
            
            <StatCard 
              title="Técnicos" 
              value="15"
              icon={<User className="h-5 w-5" />}
              trend={{ value: 2, isPositive: true }}
              footer={
                <div className="flex items-center justify-between">
                  <span>Asignaciones</span>
                  <span className="font-medium">27</span>
                </div>
              }
            />
            
            <StatCard 
              title="Invitados" 
              value="19"
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 3, isPositive: true }}
              footer={
                <div className="flex items-center justify-between">
                  <span>Último acceso</span>
                  <span className="font-medium">Hoy</span>
                </div>
              }
            />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
            <h2 className="text-xl font-medium mb-4">Lista de Usuarios</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Nombre</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Rol</th>
                    <th className="text-left py-3 px-4">Departamento</th>
                    <th className="text-left py-3 px-4">Estado</th>
                    <th className="text-left py-3 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Juan Pérez</td>
                    <td className="py-3 px-4">juan.perez@empresa.com</td>
                    <td className="py-3 px-4">Administrador</td>
                    <td className="py-3 px-4">Tecnología</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Activo</span></td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">Editar</button>
                        <button className="text-red-500 hover:text-red-700">Desactivar</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Laura Gómez</td>
                    <td className="py-3 px-4">laura.gomez@empresa.com</td>
                    <td className="py-3 px-4">Técnico</td>
                    <td className="py-3 px-4">Operaciones</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Activo</span></td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">Editar</button>
                        <button className="text-red-500 hover:text-red-700">Desactivar</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Carlos Méndez</td>
                    <td className="py-3 px-4">carlos.mendez@empresa.com</td>
                    <td className="py-3 px-4">Invitado</td>
                    <td className="py-3 px-4">Administración</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Inactivo</span></td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">Editar</button>
                        <button className="text-green-500 hover:text-green-700">Activar</button>
                      </div>
                    </td>
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

export default Usuarios;
