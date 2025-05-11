
import { useState, useMemo } from 'react';
import { Equipo } from '@/services/equipmentService';

export const useInventoryFilters = (equipos: Equipo[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSede, setSelectedSede] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtrar los equipos basados en los filtros seleccionados
  const filteredEquipos = useMemo(() => {
    return equipos.filter(equipo => {
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
  }, [equipos, searchQuery, selectedSede, selectedArea]);
  
  // Páginar los resultados
  const itemsPerPage = 10;
  const paginatedEquipos = useMemo(() => {
    return filteredEquipos.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredEquipos, currentPage]);
  
  return {
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
  };
};
