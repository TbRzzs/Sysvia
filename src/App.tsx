
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventory from './pages/inventory';
import Mantenimiento from './pages/mantenimiento';
import Usuarios from './pages/usuarios';
import Reportes from './pages/reportes';
import Moviles from './pages/moviles';
import Impresoras from './pages/impresoras';
import Configuracion from './pages/configuracion';
import { Toaster } from "@/components/ui/toaster";
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/moviles" element={<Moviles />} />
        <Route path="/impresoras" element={<Impresoras />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
