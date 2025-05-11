
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Settings, User, Database, Shield, Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const Configuracion = () => {
  const isMobile = useIsMobile();

  const configSections = [
    {
      title: "General",
      icon: <Settings className="h-5 w-5" />,
      description: "Configuración general del sistema",
      options: [
        "Información de la organización",
        "Personalización de la interfaz",
        "Preferencias de notificaciones"
      ]
    },
    {
      title: "Usuarios",
      icon: <User className="h-5 w-5" />,
      description: "Administración de usuarios y permisos",
      options: [
        "Gestión de usuarios",
        "Roles y permisos",
        "Políticas de contraseñas"
      ]
    },
    {
      title: "Base de datos",
      icon: <Database className="h-5 w-5" />,
      description: "Configuración de la base de datos",
      options: [
        "Respaldo y restauración",
        "Optimización",
        "Mantenimiento programado"
      ]
    },
    {
      title: "Seguridad",
      icon: <Shield className="h-5 w-5" />,
      description: "Configuración de seguridad",
      options: [
        "Autenticación de dos factores",
        "Registro de actividad",
        "Políticas de seguridad"
      ]
    },
    {
      title: "Comunicaciones",
      icon: <Mail className="h-5 w-5" />,
      description: "Configuración de correos y notificaciones",
      options: [
        "Configuración SMTP",
        "Plantillas de correo",
        "Programación de notificaciones"
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-between'} px-4 py-4 md:px-6`}>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Configuración</h1>
              <p className="text-xs md:text-sm text-envio-gray-500">Administra la configuración del sistema</p>
            </div>
          </div>
        </header>
        
        <div className="p-4 md:p-6">
          {!isMobile && (
            <NavigationMenu className="mb-6">
              <NavigationMenuList className="flex gap-2">
                {configSections.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger className="bg-white">{section.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[320px] gap-3 p-4">
                        {section.options.map((option) => (
                          <li key={option}>
                            <NavigationMenuLink asChild>
                              <a
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                href="#"
                              >
                                <div className="text-sm font-medium leading-none">{option}</div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configSections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {section.options.map((option) => (
                      <li key={option} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-envio-gray-400" />
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" className="w-full mt-4">
                    Configurar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
