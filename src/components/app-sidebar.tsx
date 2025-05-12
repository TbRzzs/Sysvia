
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Monitor, 
  Smartphone, 
  Printer, 
  Settings, 
  User, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const menuItems = [
  { icon: Monitor, label: "Equipos", path: "/" },
  { icon: Smartphone, label: "Móviles", path: "/moviles" },
  { icon: Printer, label: "Impresoras", path: "/impresoras" },
  { icon: User, label: "Usuarios", path: "/usuarios" },
  { icon: Settings, label: "Configuración", path: "/configuracion" }
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  // Generate initials from user's full name
  const getInitials = () => {
    if (!profile?.full_name) return 'U';
    
    return profile.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-white border-r transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex items-center justify-center border-b">
        {isCollapsed ? (
          <div className="p-1 flex justify-center">
            <img src="/envia-logo.png" alt="" className="h-5" />
          </div>
        ) : (
          <img 
            src="/envia-logo.png" 
            alt="Envía Logo" 
            className="h-8" 
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>

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

      <div className={cn(
        "p-4 border-t",
        isCollapsed ? "flex justify-center" : ""
      )}>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "w-full flex items-center",
                isCollapsed ? "justify-center" : "justify-between"
              )}>
                <div className={cn("flex items-center", isCollapsed ? "" : "gap-2")}>
                  <Avatar className="w-8 h-8 border border-envio-gray-200">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || "Usuario"} />
                    <AvatarFallback className="bg-envio-red/10 text-envio-red text-xs">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {!isCollapsed && (
                    <div className="text-left">
                      <div className="text-sm font-medium truncate max-w-[120px]">
                        {profile?.full_name || 'Usuario'}
                      </div>
                      <div className="text-xs text-envio-gray-500 truncate max-w-[120px]">
                        {profile?.department || 'Departamento'}
                      </div>
                    </div>
                  )}
                </div>
                
                {!isCollapsed && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCollapsed(!isCollapsed);
                    }}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-envio-gray-500 hover:bg-envio-gray-100"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            <button
              onClick={handleLogin}
              className={cn(
                "flex items-center text-envio-gray-600 hover:text-envio-red transition-colors",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <LogIn className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2">Iniciar Sesión</span>}
            </button>
            
            {!isCollapsed && (
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-envio-gray-500 hover:bg-envio-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
            )}
          </div>
        )}
        
        {isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 rounded-full flex items-center justify-center text-envio-gray-500 hover:bg-envio-gray-100 mt-4"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
