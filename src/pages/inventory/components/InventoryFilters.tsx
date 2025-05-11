
import React, { useState } from 'react';
import { SearchBar } from '@/components/search-bar';
import { ChevronDown, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEquipment } from '@/hooks/useEquipment';

interface InventoryFiltersProps {
  onSearch: (query: string) => void;
  selectedSede: string;
  setSelectedSede: (sede: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  onExport: () => void;
  onImport: () => void;
}

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  onSearch,
  selectedSede,
  setSelectedSede,
  selectedArea,
  setSelectedArea,
  onExport,
  onImport
}) => {
  const { equipos } = useEquipment();
  
  const sedes = ['Todos', ...new Set(equipos.map(e => e.sede).filter(Boolean))];
  
  const areas = ['Todos', ...new Set(equipos.map(e => e.area).filter(Boolean))];
  
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <SearchBar 
        placeholder="Buscar por el hostname" 
        onSearch={onSearch}
      />
      
      <div className="flex flex-wrap gap-4">
        <div className="relative">
          <select
            value={selectedSede}
            onChange={(e) => setSelectedSede(e.target.value)}
            className="appearance-none pl-3 pr-10 py-2 bg-white border border-envio-gray-200 rounded-lg focus:ring-2 focus:ring-envio-red/20 focus:border-envio-red text-sm outline-none"
          >
            {sedes.map(sede => (
              <option key={sede} value={sede}>{sede === 'Todos' ? 'Todas las sedes' : sede}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-envio-gray-400" />
          </div>
        </div>
        
        <div className="relative">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="appearance-none pl-3 pr-10 py-2 bg-white border border-envio-gray-200 rounded-lg focus:ring-2 focus:ring-envio-red/20 focus:border-envio-red text-sm outline-none"
          >
            {areas.map(area => (
              <option key={area} value={area}>{area === 'Todos' ? 'Todas las áreas' : area}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-envio-gray-400" />
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center text-sm text-envio-red border-envio-red hover:bg-envio-red/5"
          onClick={onExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>

        <Button 
          variant="outline" 
          className="flex items-center text-sm text-envio-blue border-envio-blue hover:bg-envio-blue/5"
          onClick={onImport}
        >
          <Upload className="h-4 w-4 mr-2" />
          Importar
        </Button>
      </div>
    </div>
  );
};
