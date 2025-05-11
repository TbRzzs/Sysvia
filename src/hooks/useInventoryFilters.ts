
import { useState, useMemo } from 'react';
import { Equipo } from '@/services/equipmentService';

export const useInventoryFilters = (equipos: Equipo[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSede, setSelectedSede] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  
  const sedes = useMemo(() => {
    const uniqueSedes = new Set<string>();
    equipos.forEach(equipo => {
      if (equipo.sede && equipo.sede.trim() !== '') {
        uniqueSedes.add(equipo.sede);
      }
    });
    return ['Todos', ...Array.from(uniqueSedes)];
  }, [equipos]);
  
  const areas = useMemo(() => {
    const uniqueAreas = new Set<string>();
    equipos.forEach(equipo => {
      if (equipo.area && equipo.area.trim() !== '') {
        uniqueAreas.add(equipo.area);
      }
    });
    return ['Todos', ...Array.from(uniqueAreas)];
  }, [equipos]);
  
  const filteredEquipos = useMemo(() => {
    return equipos.filter(equipo => {
      const matchesSearch = searchQuery 
        ? (equipo.hostname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           equipo.ip?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           equipo.responsable?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           equipo.serial?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           equipo.activo?.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
        
      const matchesSede = selectedSede === "Todos" 
        ? true 
        : equipo.sede === selectedSede;
        
      const matchesArea = selectedArea === "Todos" 
        ? true 
        : equipo.area === selectedArea;
        
      return matchesSearch && matchesSede && matchesArea;
    });
  }, [equipos, searchQuery, selectedSede, selectedArea]);
  
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSede, selectedArea]);
  
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
    sedes,
    areas,
    currentPage,
    setCurrentPage,
    filteredEquipos,
    paginatedEquipos,
    totalPages: Math.ceil(filteredEquipos.length / itemsPerPage)
  };
};
