
import { supabase } from '@/integrations/supabase/client';

// Tipos
export interface ChartDataPoint {
  name: string;
  desktop: number;
  laptop: number;
  servidor: number;
}

export interface MonitorInfo {
  id?: string;
  marca: string;
  activo: string;
  serial: string;
  estado: string;
}

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
  monitorInfo?: MonitorInfo;
  created_at?: string;
  updated_at?: string;
}

// Obtener datos para el gráfico
export const getChartData = async (): Promise<ChartDataPoint[]> => {
  try {
    const { data, error } = await supabase
      .from('estadisticas_mensuales')
      .select('*')
      .order('id');

    if (error) throw error;
    
    return data as ChartDataPoint[];
  } catch (error) {
    console.error('Error al obtener datos del gráfico:', error);
    return [];
  }
};

// Obtener todos los equipos
export const fetchEquipos = async (): Promise<Equipo[]> => {
  try {
    const { data, error } = await supabase
      .from('equipos')
      .select('*')
      .order('hostname');
      
    if (error) throw error;

    const equipos = await Promise.all(
      data.map(async (equipo) => {
        if (equipo.monitor) {
          const { data: monitorData } = await supabase
            .from('monitores')
            .select('*')
            .eq('equipo_id', equipo.id)
            .single();

          return { 
            ...equipo, 
            monitorInfo: monitorData || undefined
          };
        }
        return equipo;
      })
    );
    
    return equipos as Equipo[];
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    return [];
  }
};

// Obtener un equipo con sus detalles
export const fetchEquipoConDetalles = async (id: string): Promise<Equipo | null> => {
  try {
    const { data, error } = await supabase
      .rpc('obtener_equipo_con_monitor', { equipo_id: id });

    if (error) throw error;
    if (!data) return null;
    
    // Debemos transformar el resultado JSON a un objeto Equipo
    if (typeof data === 'object') {
      const equipo = {
        id: data.id as string,
        hostname: data.hostname as string,
        ip: data.ip as string,
        sede: data.sede as string,
        area: data.area as string,
        responsable: data.responsable as string,
        mac: data.mac as string,
        procesador: data.procesador as string,
        memoriaRam: data.memoriaRam as string,
        discoDuro: data.discoDuro as string,
        tipoDisco: data.tipoDisco as string,
        activo: data.activo as string,
        marca: data.marca as string,
        referencia: data.referencia as string,
        serial: data.serial as string,
        tipoEquipo: data.tipoEquipo as string,
        monitor: data.monitor as boolean,
        created_at: data.created_at as string,
        updated_at: data.updated_at as string
      } as Equipo;
      
      // Añadir monitor si existe
      if (data.monitorInfo && typeof data.monitorInfo === 'object') {
        equipo.monitorInfo = {
          id: data.monitorInfo.id as string,
          marca: data.monitorInfo.marca as string,
          activo: data.monitorInfo.activo as string,
          serial: data.monitorInfo.serial as string,
          estado: data.monitorInfo.estado as string
        };
      }
      
      return equipo;
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener equipo con detalles:', error);
    return null;
  }
};

// Añadir un nuevo equipo
export const addEquipo = async (equipo: Omit<Equipo, 'id'>): Promise<Equipo | null> => {
  try {
    // Primero, insertar el equipo
    const { data: equipoData, error: equipoError } = await supabase
      .from('equipos')
      .insert([{
        hostname: equipo.hostname,
        ip: equipo.ip,
        sede: equipo.sede,
        area: equipo.area,
        responsable: equipo.responsable,
        mac: equipo.mac,
        procesador: equipo.procesador,
        memoriaRam: equipo.memoriaRam,
        discoDuro: equipo.discoDuro,
        tipoDisco: equipo.tipoDisco,
        activo: equipo.activo,
        marca: equipo.marca,
        referencia: equipo.referencia,
        serial: equipo.serial,
        tipoEquipo: equipo.tipoEquipo,
        monitor: equipo.monitor
      }])
      .select()
      .single();

    if (equipoError) throw equipoError;
    
    // Si tiene monitor, insertar el monitor asociado
    if (equipo.monitor && equipo.monitorInfo) {
      const { error: monitorError } = await supabase
        .from('monitores')
        .insert([{
          equipo_id: equipoData.id,
          marca: equipo.monitorInfo.marca,
          activo: equipo.monitorInfo.activo,
          serial: equipo.monitorInfo.serial,
          estado: equipo.monitorInfo.estado
        }]);

      if (monitorError) throw monitorError;
    }

    // Devolver el equipo insertado
    return {
      ...equipoData,
      monitorInfo: equipo.monitor && equipo.monitorInfo ? equipo.monitorInfo : undefined
    };
  } catch (error) {
    console.error('Error al añadir equipo:', error);
    return null;
  }
};

// Actualizar un equipo existente
export const updateEquipo = async (id: string, equipoData: Partial<Equipo>): Promise<Equipo | null> => {
  try {
    const monitorInfo = equipoData.monitorInfo;
    delete equipoData.monitorInfo;

    // Actualizar el equipo
    const { data, error: equipoError } = await supabase
      .from('equipos')
      .update(equipoData)
      .eq('id', id)
      .select()
      .single();
      
    if (equipoError) throw equipoError;

    // Si tiene monitor, actualizar o insertar el monitor asociado
    if (equipoData.monitor && monitorInfo) {
      const { data: existingMonitor } = await supabase
        .from('monitores')
        .select('*')
        .eq('equipo_id', id)
        .maybeSingle();

      if (existingMonitor) {
        // Actualizar monitor existente
        const { error: monitorError } = await supabase
          .from('monitores')
          .update({
            marca: monitorInfo.marca,
            activo: monitorInfo.activo,
            serial: monitorInfo.serial,
            estado: monitorInfo.estado
          })
          .eq('equipo_id', id);

        if (monitorError) throw monitorError;
      } else {
        // Insertar nuevo monitor
        const { error: monitorError } = await supabase
          .from('monitores')
          .insert([{
            equipo_id: id,
            marca: monitorInfo.marca,
            activo: monitorInfo.activo,
            serial: monitorInfo.serial,
            estado: monitorInfo.estado
          }]);

        if (monitorError) throw monitorError;
      }
    } else if (!equipoData.monitor) {
      // Si ya no tiene monitor, eliminar el monitor asociado
      const { error: monitorDeleteError } = await supabase
        .from('monitores')
        .delete()
        .eq('equipo_id', id);

      if (monitorDeleteError) throw monitorDeleteError;
    }

    // Devolver el equipo actualizado con monitor si existe
    return await fetchEquipoConDetalles(id);
  } catch (error) {
    console.error('Error al actualizar equipo:', error);
    return null;
  }
};

// Eliminar equipos seleccionados
export const deleteEquipos = async (ids: string[]): Promise<boolean> => {
  try {
    // Eliminar los equipos seleccionados
    const { error } = await supabase
      .from('equipos')
      .delete()
      .in('id', ids);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error al eliminar equipos:', error);
    return false;
  }
};

// Exportar inventario
export const exportInventory = async (format: 'xlsx' | 'csv' | 'pdf'): Promise<Blob> => {
  try {
    // Obtener todos los equipos
    const equipos = await fetchEquipos();
    
    // Crear un archivo blob según el formato
    let blob: Blob;
    
    if (format === 'csv') {
      // Crear CSV
      const headers = 'Hostname,IP,Sede,Area,Responsable,MAC,Procesador,MemoriaRam,DiscoDuro,TipoDisco,Activo,Marca,Referencia,Serial,TipoEquipo,Monitor\n';
      const rows = equipos.map(e => 
        `${e.hostname},${e.ip},${e.sede},${e.area},${e.responsable},${e.mac},${e.procesador},${e.memoriaRam},${e.discoDuro},${e.tipoDisco},${e.activo},${e.marca},${e.referencia},${e.serial},${e.tipoEquipo},${e.monitor}`
      ).join('\n');
      
      blob = new Blob([headers + rows], { type: 'text/csv' });
    } else if (format === 'xlsx') {
      // Simulación de XLSX (en una app real, usaríamos una librería como ExcelJS)
      blob = new Blob(['Simulación de archivo XLSX'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    } else {
      // Simulación de PDF (en una app real, usaríamos una librería como pdfmake)
      blob = new Blob(['Simulación de archivo PDF'], { type: 'application/pdf' });
    }
    
    return blob;
  } catch (error) {
    console.error('Error al exportar inventario:', error);
    throw error;
  }
};

// Importar inventario
export const importInventory = async (file: File): Promise<boolean> => {
  try {
    // En una app real, procesaríamos el archivo según su formato
    // y luego insertaríamos los datos en la base de datos
    
    // Simulación de importación exitosa
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return true;
  } catch (error) {
    console.error('Error al importar inventario:', error);
    return false;
  }
};
