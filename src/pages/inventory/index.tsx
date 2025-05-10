
import React, { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Import components
import { InventoryStats } from './components/InventoryStats';
import { HistoryChart } from './components/HistoryChart';
import { InventoryFilters } from './components/InventoryFilters';
import { EquipmentTable } from './components/EquipmentTable';
import { AddEquipmentForm } from './components/AddEquipmentForm';
import { ImportExportModals } from './components/ImportExportModals';

// Import mock data
import { equiposData, chartData, defaultNewEquipo } from './constants/mockData';

const Inventory = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSede, setSelectedSede] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [addEquipoModalOpen, setAddEquipoModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const { toast } = useToast();
  
  // Form state for adding new equipment
  const [newEquipo, setNewEquipo] = useState(defaultNewEquipo);

  const toggleSelectItem = (item: any) => {
    if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const toggleExpandItem = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(itemId => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  const handleAddEquipo = () => {
    setAddEquipoModalOpen(false);
    toast({
      title: "Equipo agregado",
      description: "El equipo ha sido agregado exitosamente."
    });
  };

  const handleImport = () => {
    setImportModalOpen(false);
    toast({
      title: "Importación exitosa",
      description: "Los equipos han sido importados correctamente."
    });
  };

  const handleExport = () => {
    setExportModalOpen(false);
    toast({
      title: "Exportación exitosa",
      description: "Los datos han sido exportados correctamente."
    });
  };

  const handleDeleteSelected = () => {
    setConfirmDeleteOpen(false);
    toast({
      title: "Equipos eliminados",
      description: `${selectedItems.length} equipos han sido eliminados.`
    });
    setSelectedItems([]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">Inventario de Equipos</h1>
              <p className="text-sm text-envio-gray-500">Gestiona los equipos de la organización</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="default" 
                onClick={() => setAddEquipoModalOpen(true)}
                className="bg-envio-red text-white hover:bg-envio-red/90"
              >
                <span>Añadir Equipo</span>
                <Plus className="ml-2 h-4 w-4" />
              </Button>
              
              {selectedItems.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => setConfirmDeleteOpen(true)}
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  Eliminar seleccionados
                </Button>
              )}
            </div>
          </div>
        </header>
        
        <div className="p-6">
          {/* Stats Section */}
          <InventoryStats />
          
          {/* Chart Section */}
          <HistoryChart data={chartData} />
          
          {/* Filters Section */}
          <InventoryFilters 
            onSearch={setSearchQuery}
            selectedSede={selectedSede}
            setSelectedSede={setSelectedSede}
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            onExport={() => setExportModalOpen(true)}
            onImport={() => setImportModalOpen(true)}
          />
          
          {/* Equipment Table */}
          <EquipmentTable 
            data={equiposData}
            selectedItems={selectedItems}
            expandedItems={expandedItems}
            onSelectItem={toggleSelectItem}
            toggleExpandItem={toggleExpandItem}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {/* Modals */}
      <AddEquipmentForm 
        open={addEquipoModalOpen}
        onOpenChange={setAddEquipoModalOpen}
        newEquipo={newEquipo}
        setNewEquipo={setNewEquipo}
        onSubmit={handleAddEquipo}
      />
      
      <ImportExportModals 
        importModalOpen={importModalOpen}
        setImportModalOpen={setImportModalOpen}
        exportModalOpen={exportModalOpen}
        setExportModalOpen={setExportModalOpen}
        confirmDeleteOpen={confirmDeleteOpen}
        setConfirmDeleteOpen={setConfirmDeleteOpen}
        onImport={handleImport}
        onExport={handleExport}
        onDeleteSelected={handleDeleteSelected}
      />
    </div>
  );
};

export default Inventory;
