
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, department: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Fetch user profile
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          } else {
            setProfile(data);
          }
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        // Fetch user profile
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching profile:', error);
            } else {
              setProfile(data);
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Login exitoso",
        description: "Has iniciado sesión correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Ha ocurrido un error al iniciar sesión",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string, department: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            department,
          },
        },
      });
      if (error) throw error;
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente. Revisa tu correo para confirmar.",
      });
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Ha ocurrido un error al crear la cuenta",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Ha ocurrido un error al cerrar la sesión",
        variant: "destructive",
      });
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
