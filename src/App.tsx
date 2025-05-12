
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inventory from './pages/inventory';
import Mantenimiento from './pages/mantenimiento';
import Usuarios from './pages/usuarios';
import Reportes from './pages/reportes';
import Moviles from './pages/moviles';
import Impresoras from './pages/impresoras';
import Configuracion from './pages/configuracion';
import AuthPage from './pages/auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import NotFound from './pages/NotFound';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  // Show loading state if auth is being determined
  if (loading) {
    return <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-envio-red"></div>
    </div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/auth"
        element={user ? <Navigate to="/" /> : <AuthPage />}
      />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="/mantenimiento" element={<ProtectedRoute><Mantenimiento /></ProtectedRoute>} />
      <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
      <Route path="/reportes" element={<ProtectedRoute><Reportes /></ProtectedRoute>} />
      <Route path="/moviles" element={<ProtectedRoute><Moviles /></ProtectedRoute>} />
      <Route path="/impresoras" element={<ProtectedRoute><Impresoras /></ProtectedRoute>} />
      <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
