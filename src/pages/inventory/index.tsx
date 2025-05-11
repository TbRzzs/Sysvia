
import React, { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { useToast } from '@/hooks/use-toast';

// Import components
import { InventoryHeader } from './components/InventoryHeader';
import { InventoryContent } from './components/InventoryContent';
import { AddEquipmentForm } from './components/AddEquipmentForm';
import { ImportExportModals } from './components/ImportExportModals';

// Import hooks
import { useEquipment } from '@/hooks/useEquipment';
import { useInventorySelection } from '@/hooks/useInventorySelection';
import { useInventoryFilters } from '@/hooks/useInventoryFilters';
import { Equipo } from '@/services/equipmentService';

const Inventory = () => {
  // Estados para modales
  const [addEquipoModalOpen, setAddEquipoModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Hook de toast
  const { toast } = useToast();
  
  // Hook de equipos
  const { 
    equipos, 
    loading, 
    addEquipo, 
    editEquipo, 
    removeSelectedEquipos, 
    fetchEquipos 
  } = useEquipment();
  
  // Hook de selección
  const {
    selectedItems,
    expandedItems,
    toggleSelectItem,
    toggleExpandItem,
    clearSelection
  } = useInventorySelection();
  
  // Hook de filtrado
  const {
    searchQuery,
    setSearchQuery,
    selectedSede,
    setSelectedSede,
    selectedArea,
    setSelectedArea,
    currentPage,
    setCurrentPage,
    filteredEquipos,
    paginatedEquipos
  } = useInventoryFilters(equipos);
  
  // Estado para equipo nuevo/edición
  const [newEquipo, setNewEquipo] = useState<Partial<Equipo>>({
    hostname: '',
    ip: '',
    sede: '',
    area: '',
    responsable: '',
    mac: '',
    procesador: '',
    memoriaRam: '',
    discoDuro: '',
    tipoDisco: '',
    activo: '',
    marca: '',
    referencia: '',
    serial: '',
    tipoEquipo: '',
    monitor: false,
  });
  
  // Manejar añadir equipo
  const handleAddEquipo = (equipo: Partial<Equipo>) => {
    if (isEditMode && equipo.id) {
      // Editar equipo existente
      editEquipo(equipo.id, equipo);
      setIsEditMode(false);
    } else {
      // Añadir nuevo equipo
      addEquipo(equipo as Omit<Equipo, 'id'>);
    }
    setAddEquipoModalOpen(false);
  };
  
  // Manejar edición de equipo
  const handleEditEquipo = (equipo: Equipo) => {
    setNewEquipo(equipo);
    setIsEditMode(true);
    setAddEquipoModalOpen(true);
  };
  
  // Manejar eliminación de equipos seleccionados
  const handleDeleteSelected = () => {
    const ids = selectedItems.map(item => item.id);
    removeSelectedEquipos(ids);
    setConfirmDeleteOpen(false);
    clearSelection();
  };
  
  // Abrir modal para añadir equipo
  const handleOpenAddEquipoModal = () => {
    setIsEditMode(false);
    setAddEquipoModalOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 overflow-auto">
        <InventoryHeader 
          selectedItemsCount={selectedItems.length}
          onAddEquipo={handleOpenAddEquipoModal}
          onConfirmDeleteOpen={() => setConfirmDeleteOpen(true)}
        />
        
        <InventoryContent 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSede={selectedSede}
          setSelectedSede={setSelectedSede}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          selectedItems={selectedItems}
          expandedItems={expandedItems}
          toggleSelectItem={toggleSelectItem}
          toggleExpandItem={toggleExpandItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
          filteredEquipos={filteredEquipos}
          paginatedEquipos={paginatedEquipos}
          onEditEquipo={handleEditEquipo}
          onExportOpen={() => setExportModalOpen(true)}
          onImportOpen={() => setImportModalOpen(true)}
        />
      </div>

      {/* Modals */}
      <AddEquipmentForm 
        open={addEquipoModalOpen}
        onOpenChange={setAddEquipoModalOpen}
        newEquipo={newEquipo}
        setNewEquipo={setNewEquipo}
        onSubmit={handleAddEquipo}
        isEdit={isEditMode}
      />
      
      <ImportExportModals 
        importModalOpen={importModalOpen}
        setImportModalOpen={setImportModalOpen}
        exportModalOpen={exportModalOpen}
        setExportModalOpen={setExportModalOpen}
        confirmDeleteOpen={confirmDeleteOpen}
        setConfirmDeleteOpen={setConfirmDeleteOpen}
        onDeleteSelected={handleDeleteSelected}
        onImportComplete={fetchEquipos}
      />
    </div>
  );
};

export default Inventory;
