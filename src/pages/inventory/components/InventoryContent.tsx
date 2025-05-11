
import React, { useState, useEffect } from 'react';
import { InventoryStats } from './InventoryStats';
import { HistoryChart } from './HistoryChart';
import { InventoryFilters } from './InventoryFilters';
import { EquipmentTable } from './EquipmentTable';

interface InventoryContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSede: string;
  setSelectedSede: (sede: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedItems: any[];
  expandedItems: string[];
  toggleSelectItem: (item: any) => void;
  toggleExpandItem: (id: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loading: boolean;
  filteredEquipos: any[];
  paginatedEquipos: any[];
  onEditEquipo: (equipo: any) => void;
  onExportOpen: () => void;
  onImportOpen: () => void;
}

export const InventoryContent: React.FC<InventoryContentProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSede,
  setSelectedSede,
  selectedArea,
  setSelectedArea,
  selectedItems,
  expandedItems,
  toggleSelectItem,
  toggleExpandItem,
  currentPage,
  setCurrentPage,
  loading,
  filteredEquipos,
  paginatedEquipos,
  onEditEquipo,
  onExportOpen,
  onImportOpen
}) => {
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSede, selectedArea, setCurrentPage]);

  return (
    <div className="p-6">
      <InventoryStats 
        selectedSede={selectedSede}
        selectedArea={selectedArea}
        searchQuery={searchQuery}
      />
      
      <HistoryChart 
        selectedSede={selectedSede}
        selectedArea={selectedArea}
        searchQuery={searchQuery}
      />
      
      <InventoryFilters 
        onSearch={setSearchQuery}
        selectedSede={selectedSede}
        setSelectedSede={setSelectedSede}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        onExport={onExportOpen}
        onImport={onImportOpen}
      />
      
      <EquipmentTable 
        data={paginatedEquipos}
        loading={loading}
        selectedItems={selectedItems}
        expandedItems={expandedItems}
        onSelectItem={toggleSelectItem}
        toggleExpandItem={toggleExpandItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onEditEquipo={onEditEquipo}
      />
    </div>
  );
};
