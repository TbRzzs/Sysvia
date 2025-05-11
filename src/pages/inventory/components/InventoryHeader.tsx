
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-between'} px-4 py-4 md:px-6`}>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Inventario de Equipos</h1>
          <p className="text-xs md:text-sm text-envio-gray-500">Gestiona los equipos de la organización</p>
        </div>
        
        <div className={`flex ${isMobile ? 'w-full' : ''} items-center space-x-3`}>
          <Button 
            variant="default" 
            onClick={onAddEquipo}
            className={`${isMobile ? 'flex-1' : ''} bg-envio-red text-white hover:bg-envio-red/90`}
          >
            <span>Añadir Equipo</span>
            <Plus className="ml-2 h-4 w-4" />
          </Button>
          
          {selectedItemsCount > 0 && (
            <Button 
              variant="outline" 
              onClick={onConfirmDeleteOpen}
              className={`${isMobile ? 'flex-1' : ''} border-red-500 text-red-500 hover:bg-red-50`}
            >
              Eliminar ({selectedItemsCount})
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
