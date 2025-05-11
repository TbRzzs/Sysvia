
import { useState } from 'react';
import { Equipo } from '@/services/equipmentService';
import { useIsMobile } from '@/hooks/use-mobile';

export const useInventorySelection = () => {
  const [selectedItems, setSelectedItems] = useState<Equipo[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  // Seleccionar/deseleccionar ítem
  const toggleSelectItem = (item: Equipo) => {
    if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
      
      // En móvil, al seleccionar un ítem, expandirlo automáticamente
      if (isMobile && !expandedItems.includes(item.id)) {
        setExpandedItems([...expandedItems, item.id]);
      }
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
  
  // Limpiar selección
  const clearSelection = () => {
    setSelectedItems([]);
  };
  
  return {
    selectedItems,
    expandedItems,
    toggleSelectItem,
    toggleExpandItem,
    clearSelection,
    isMobile
  };
};
