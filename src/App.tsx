
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventory from './pages/inventory';
import Mantenimiento from './pages/mantenimiento';
import Usuarios from './pages/usuarios';
import Reportes from './pages/reportes';
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
