
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Equipo, 
  getEquipos, 
  createEquipo, 
  updateEquipo, 
  deleteEquipo, 
  deleteEquipos 
} from '@/services/equipmentService';

export const useEquipment = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchEquipos = async () => {
    try {
      setLoading(true);
      const data = await getEquipos();
      setEquipos(data);
      setError(null);
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los equipos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  const addEquipo = async (equipo: Omit<Equipo, 'id'>) => {
    try {
      setLoading(true);
      await createEquipo(equipo);
      toast({
        title: 'Éxito',
        description: 'El equipo ha sido agregado correctamente',
      });
      await fetchEquipos(); // Refrescar lista
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Error',
        description: 'No se pudo agregar el equipo',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const editEquipo = async (id: string, equipo: Partial<Equipo>) => {
    try {
      setLoading(true);
      await updateEquipo(id, equipo);
      toast({
        title: 'Éxito',
        description: 'El equipo ha sido actualizado correctamente',
      });
      await fetchEquipos(); // Refrescar lista
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el equipo',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeEquipo = async (id: string) => {
    try {
      setLoading(true);
      await deleteEquipo(id);
      toast({
        title: 'Éxito',
        description: 'El equipo ha sido eliminado correctamente',
      });
      await fetchEquipos(); // Refrescar lista
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el equipo',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeSelectedEquipos = async (ids: string[]) => {
    try {
      setLoading(true);
      await deleteEquipos(ids);
      toast({
        title: 'Éxito',
        description: `${ids.length} equipos han sido eliminados correctamente`,
      });
      await fetchEquipos(); // Refrescar lista
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Error',
        description: 'No se pudieron eliminar los equipos seleccionados',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    equipos,
    loading,
    error,
    fetchEquipos,
    addEquipo,
    editEquipo,
    removeEquipo,
    removeSelectedEquipos,
  };
};
