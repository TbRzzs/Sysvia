
import React, { useState, useEffect } from 'react';
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

// Import hooks and services
import { useEquipment } from '@/hooks/useEquipment';
import { Equipo } from '@/services/equipmentService';

const Inventory = () => {
  // Estados para filtros y paginación
  const [selectedItems, setSelectedItems] = useState<Equipo[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSede, setSelectedSede] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todos");
  
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
  
  // Filtrar los equipos basados en los filtros seleccionados
  const filteredEquipos = equipos.filter(equipo => {
    // Filtrar por búsqueda
    const matchesSearch = searchQuery 
      ? equipo.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        equipo.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        equipo.responsable?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
      
    // Filtrar por sede
    const matchesSede = selectedSede === "Todos" 
      ? true 
      : equipo.sede === selectedSede;
      
    // Filtrar por área
    const matchesArea = selectedArea === "Todos" 
      ? true 
      : equipo.area === selectedArea;
      
    return matchesSearch && matchesSede && matchesArea;
  });
  
  // Páginar los resultados
  const itemsPerPage = 10;
  const paginatedEquipos = filteredEquipos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Seleccionar/deseleccionar ítem
  const toggleSelectItem = (item: Equipo) => {
    if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  
  // Expandir/colapsar ítem
  const toggleExpandItem = (id: string) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(itemId => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };
  
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
    setSelectedItems([]);
  };
  
  // Reset formulario al abrir modal para añadir equipo
  useEffect(() => {
    if (!addEquipoModalOpen && !isEditMode) {
      setNewEquipo({
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
    }
  }, [addEquipoModalOpen]);
  
  // Resetear página actual cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSede, selectedArea]);

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
                onClick={() => {
                  setIsEditMode(false);
                  setAddEquipoModalOpen(true);
                }}
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
          {/* Stats Section - Pasando filtros */}
          <InventoryStats 
            selectedSede={selectedSede}
            selectedArea={selectedArea}
            searchQuery={searchQuery}
          />
          
          {/* Chart Section - Pasando filtros */}
          <HistoryChart 
            selectedSede={selectedSede}
            selectedArea={selectedArea}
            searchQuery={searchQuery}
          />
          
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
            data={paginatedEquipos}
            loading={loading}
            selectedItems={selectedItems}
            expandedItems={expandedItems}
            onSelectItem={toggleSelectItem}
            toggleExpandItem={toggleExpandItem}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onEditEquipo={handleEditEquipo}
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
