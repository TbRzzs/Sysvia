
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

const AuthPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    try {
      await signIn(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Mostrar un mensaje de error más descriptivo
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales inválidas. Por favor verifica tu email y contraseña.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const createAdminUserAndLogin = async () => {
    setIsSubmitting(true);
    try {
      const testEmail = 'admin@enviacolombia.com';
      const testPassword = 'admin123456'; // Changed to longer password
      
      // Primero intentamos iniciar sesión
      try {
        await signIn(testEmail, testPassword);
        navigate('/');
        return;
      } catch (error) {
        console.log('Usuario no existe, creando uno nuevo...');
        
        // Si falla el inicio de sesión, creamos un nuevo usuario
        const { data, error } = await supabase.auth.signUp({
          email: testEmail,
          password: testPassword,
          options: {
            data: {
              full_name: 'Administrador',
              department: 'TI',
            }
          }
        });
        
        if (error) throw error;
        
        // Iniciar sesión automáticamente
        if (data) {
          await signIn(testEmail, testPassword);
          
          toast({
            title: "Usuario administrador creado",
            description: "Se ha creado y autenticado como administrador automáticamente.",
          });
          
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Error al crear/autenticar usuario admin:', error);
      toast({
        title: "Error al crear usuario administrador",
        description: error.message || "No se pudo crear el usuario administrador.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillTestCredentials = () => {
    loginForm.setValue('email', 'admin@enviacolombia.com');
    loginForm.setValue('password', 'admin123456'); // Cambiado a contraseña más larga
    toast({
      title: "Credenciales de prueba cargadas",
      description: "Puedes iniciar sesión con estos datos.",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="/envia-logo.png" alt="Envia Logo" className="h-10" />
          </div>
          <CardTitle>Bienvenido a Sysvia</CardTitle>
          <CardDescription>Sistema de Inventario para Administradores</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="correo@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-envio-red hover:bg-envio-red/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2" 
                onClick={fillTestCredentials}
              >
                Usar credenciales de prueba
              </Button>
              
              <Button 
                type="button"
                variant="secondary"
                className="w-full mt-2"
                onClick={createAdminUserAndLogin}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando usuario...
                  </>
                ) : (
                  'Crear y acceder como administrador'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Envía Colombia
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
