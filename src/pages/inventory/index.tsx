
import React, { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { useToast } from '@/hooks/use-toast';

import { InventoryHeader } from './components/InventoryHeader';
import { InventoryContent } from './components/InventoryContent';
import { AddEquipmentForm } from './components/AddEquipmentForm';
import { ImportExportModals } from './components/ImportExportModals';

import { useEquipment } from '@/hooks/useEquipment';
import { useInventorySelection } from '@/hooks/useInventorySelection';
import { useInventoryFilters } from '@/hooks/useInventoryFilters';
import { Equipo } from '@/services/equipmentService';

const Inventory = () => {
  const [addEquipoModalOpen, setAddEquipoModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { toast } = useToast();
  
  const { 
    equipos, 
    loading, 
    addEquipo, 
    editEquipo, 
    removeSelectedEquipos, 
    fetchEquipos 
  } = useEquipment();
  
  const {
    selectedItems,
    expandedItems,
    toggleSelectItem,
    toggleExpandItem,
    clearSelection
  } = useInventorySelection();
  
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
  
  const handleAddEquipo = (equipo: Partial<Equipo>) => {
    if (isEditMode && equipo.id) {
      editEquipo(equipo.id, equipo);
      setIsEditMode(false);
    } else {
      addEquipo(equipo as Omit<Equipo, 'id'>);
    }
    setAddEquipoModalOpen(false);
  };
  
  const handleEditEquipo = (equipo: Equipo) => {
    setNewEquipo(equipo);
    setIsEditMode(true);
    setAddEquipoModalOpen(true);
  };
  
  const handleDeleteSelected = () => {
    const ids = selectedItems.map(item => item.id);
    removeSelectedEquipos(ids);
    setConfirmDeleteOpen(false);
    clearSelection();
  };
  
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
