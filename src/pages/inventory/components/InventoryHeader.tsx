
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InventoryHeaderProps {
  selectedItemsCount: number;
  onAddEquipo: () => void;
  onConfirmDeleteOpen: () => void;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  selectedItemsCount,
  onAddEquipo,
  onConfirmDeleteOpen
}) => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Inventario de Equipos</h1>
          <p className="text-sm text-envio-gray-500">Gestiona los equipos de la organización</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="default" 
            onClick={onAddEquipo}
            className="bg-envio-red text-white hover:bg-envio-red/90"
          >
            <span>Añadir Equipo</span>
            <Plus className="ml-2 h-4 w-4" />
          </Button>
          
          {selectedItemsCount > 0 && (
            <Button 
              variant="outline" 
              onClick={onConfirmDeleteOpen}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Eliminar seleccionados
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
