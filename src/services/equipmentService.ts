
import { supabase } from "@/integrations/supabase/client";

export interface Equipo {
  id: string;
  hostname: string;
  ip: string;
  sede: string;
  area: string;
  responsable: string;
  mac: string;
  procesador: string;
  memoriaRam: string;
  discoDuro: string;
  tipoDisco: string;
  activo: string;
  marca: string;
  referencia: string;
  serial: string;
  tipoEquipo: string;
  monitor: boolean;
  monitorInfo?: {
    id: string;
    marca: string;
    activo: string;
    serial: string;
    estado: string;
  };
}

export interface MonitorInfo {
  marca: string;
  activo: string;
  serial: string;
  estado: string;
}

export interface ChartDataPoint {
  name: string;
  desktop: number;
  laptop: number;
  servidor: number;
}

// Obtener todos los equipos
export const getEquipos = async (): Promise<Equipo[]> => {
  const { data, error } = await supabase
    .from('equipos')
    .select('*');

  if (error) {
    console.error('Error fetching equipos:', error);
    throw error;
  }

  // Obtener los monitores para los equipos que tienen
  const equiposConMonitor = await Promise.all(
    data.map(async (equipo) => {
      if (equipo.monitor) {
        const { data: monitorData, error: monitorError } = await supabase
          .from('monitores')
          .select('*')
          .eq('equipo_id', equipo.id)
          .single();

        if (monitorError && monitorError.code !== 'PGRST116') {
          console.error('Error fetching monitor:', monitorError);
        }

        return {
          ...equipo,
          monitorInfo: monitorData || undefined
        };
      }
      return equipo;
    })
  );

  return equiposConMonitor;
};

// Obtener un equipo por ID
export const getEquipoById = async (id: string): Promise<Equipo | null> => {
  const { data, error } = await supabase
    .rpc('obtener_equipo_con_monitor', { equipo_id: id })
    .single();

  if (error) {
    console.error('Error fetching equipo by ID:', error);
    throw error;
  }

  return data;
};

// Crear un nuevo equipo
export const createEquipo = async (equipo: Omit<Equipo, 'id'>): Promise<Equipo> => {
  // Extraer la información del monitor para insertarla por separado
  const { monitorInfo, ...equipoData } = equipo;
  
  // Insertar el equipo primero
  const { data, error } = await supabase
    .from('equipos')
    .insert(equipoData)
    .select()
    .single();

  if (error) {
    console.error('Error creating equipo:', error);
    throw error;
  }

  // Si tiene monitor, insertar la información del monitor
  if (equipo.monitor && monitorInfo) {
    const { error: monitorError } = await supabase
      .from('monitores')
      .insert({
        equipo_id: data.id,
        ...monitorInfo
      });

    if (monitorError) {
      console.error('Error creating monitor:', monitorError);
      // No lanzamos el error para no interrumpir el flujo, pero lo registramos
    }
  }

  // Devolver el equipo completo con la información del monitor
  return {
    ...data,
    monitorInfo: equipo.monitor && monitorInfo ? monitorInfo : undefined
  };
};

// Actualizar un equipo existente
export const updateEquipo = async (id: string, equipo: Partial<Equipo>): Promise<void> => {
  const { monitorInfo, ...equipoData } = equipo;
  
  // Actualizar el equipo
  const { error } = await supabase
    .from('equipos')
    .update(equipoData)
    .eq('id', id);

  if (error) {
    console.error('Error updating equipo:', error);
    throw error;
  }

  // Si tiene monitor, actualizar la información del monitor
  if (equipo.monitor && monitorInfo) {
    const { error: monitorError } = await supabase
      .from('monitores')
      .update(monitorInfo)
      .eq('equipo_id', id);

    if (monitorError) {
      console.error('Error updating monitor:', monitorError);
      // Intentar insertar si la actualización falló (por si no existe)
      const { error: insertError } = await supabase
        .from('monitores')
        .insert({
          equipo_id: id,
          ...monitorInfo
        });

      if (insertError) {
        console.error('Error inserting monitor after update failure:', insertError);
      }
    }
  }
};

// Eliminar un equipo
export const deleteEquipo = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('equipos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting equipo:', error);
    throw error;
  }
  // No es necesario eliminar el monitor, se eliminará en cascada
};

// Eliminar múltiples equipos
export const deleteEquipos = async (ids: string[]): Promise<void> => {
  const { error } = await supabase
    .from('equipos')
    .delete()
    .in('id', ids);

  if (error) {
    console.error('Error deleting equipos:', error);
    throw error;
  }
};

// Obtener datos para el gráfico
export const getChartData = async (): Promise<ChartDataPoint[]> => {
  const { data, error } = await supabase
    .from('estadisticas_mensuales')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }

  return data.map(item => ({
    name: item.mes,
    desktop: item.desktop,
    laptop: item.laptop,
    servidor: item.servidor
  }));
};

// Exportar inventario (simulado por ahora)
export const exportInventory = async (format: 'xlsx' | 'csv' | 'pdf'): Promise<Blob> => {
  // Esta función simula la exportación
  // En un caso real, se usaría una librería para generar archivos
  
  // Obtener todos los equipos para exportar
  const equipos = await getEquipos();
  
  // Simulamos la descarga de un archivo
  return new Blob([JSON.stringify(equipos)], { type: 'application/json' });
};

// Importar inventario (simulado por ahora)
export const importInventory = async (file: File): Promise<void> => {
  // Esta función simula la importación
  // En un caso real, se parsearía el archivo y se insertarían los datos
  
  console.log('Importando archivo:', file.name);
  // Aquí iría la lógica para procesar el archivo e insertarlo en la base de datos
};
