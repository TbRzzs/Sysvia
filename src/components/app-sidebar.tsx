
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Monitor, 
  Smartphone, 
  Printer, 
  Settings, 
  User, 
  ChevronLeft,
  ChevronRight,
  Search,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Monitor, label: "Equipos", path: "/" },
  { icon: Smartphone, label: "Móviles", path: "/moviles" },
  { icon: Printer, label: "Impresoras", path: "/impresoras" },
  { icon: BarChart2, label: "Reportes", path: "/reportes" },
  { icon: User, label: "Usuarios", path: "/usuarios" },
  { icon: Settings, label: "Configuración", path: "/configuracion" }
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-white border-r transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b">
        {isCollapsed ? (
          <div className="p-1 flex justify-center">
            <div className="text-envio-red font-bold text-2xl">e</div>
          </div>
        ) : (
          <img 
            src="/lovable-uploads/028914a5-7d44-4928-83e2-2f46905306f7.png" 
            alt="Envía Logo" 
            className="h-8" 
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link 
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-envio-gray-600",
                  "hover:bg-envio-gray-100 transition-colors duration-150",
                  location.pathname === item.path && "text-envio-red border-r-4 border-envio-red bg-envio-red/5"
                )}
              >
                <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile */}
      <div className={cn(
        "p-4 border-t flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-envio-gray-200 flex items-center justify-center text-envio-gray-600 mr-2">
              SC
            </div>
            <div>
              <div className="text-sm font-medium">Stiven Castillo</div>
              <div className="text-xs text-envio-gray-500">Tecnología</div>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 rounded-full flex items-center justify-center text-envio-gray-500 hover:bg-envio-gray-100"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </div>
  );
}
