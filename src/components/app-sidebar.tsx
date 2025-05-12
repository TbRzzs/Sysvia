
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings, Package, Tool, Users, FileText, Laptop, Printer } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AppSidebar() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  // Menú principal
  const mainMenu = [
    {
      title: "Inventario",
      url: "/",
      icon: Package,
    },
    {
      title: "Mantenimiento",
      url: "/mantenimiento",
      icon: Tool,
    },
    {
      title: "Usuarios",
      url: "/usuarios",
      icon: Users,
    },
    {
      title: "Reportes",
      url: "/reportes",
      icon: FileText,
    }
  ];

  // Menú de equipos
  const deviceMenu = [
    {
      title: "Móviles",
      url: "/moviles",
      icon: Laptop,
    },
    {
      title: "Impresoras",
      url: "/impresoras",
      icon: Printer,
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b py-4 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/envia-logo.png" alt="Envia Logo" className="h-8" />
            <span className="font-bold text-xl">Sysvia</span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Menú principal */}
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={location.pathname === item.url ? "bg-accent" : ""}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menú de equipos */}
        <SidebarGroup>
          <SidebarGroupLabel>Equipos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {deviceMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={location.pathname === item.url ? "bg-accent" : ""}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Configuración */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/configuracion" className={location.pathname === "/configuracion" ? "bg-accent" : ""}>
                    <Settings />
                    <span>Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Perfil de usuario */}
      <SidebarFooter className="border-t p-4">
        {user && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>
                  {profile?.full_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{profile?.full_name || 'Administrador'}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut} title="Cerrar sesión">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
