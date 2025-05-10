
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventory from './pages/inventory';
import { Toaster } from "@/components/ui/toaster";
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
