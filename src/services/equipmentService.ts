
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
    
    // Transform the data to match ChartDataPoint interface
    return (data || []).map(item => ({
      name: item.mes,
      desktop: item.desktop || 0,
      laptop: item.laptop || 0,
      servidor: item.servidor || 0
    }));
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
      (data || []).map(async (equipo) => {
        // Map database column names to our interface properties
        const mappedEquipo: Equipo = {
          id: equipo.id,
          hostname: equipo.hostname,
          ip: equipo.ip || '',
          sede: equipo.sede || '',
          area: equipo.area || '',
          responsable: equipo.responsable || '',
          mac: equipo.mac || '',
          procesador: equipo.procesador || '',
          memoriaRam: equipo.memoriaram || '',  // Note: DB column name might be memoriaram
          discoDuro: equipo.discoduro || '',    // Note: DB column name might be discoduro
          tipoDisco: equipo.tipodisco || '',    // Note: DB column name might be tipodisco
          activo: equipo.activo || '',
          marca: equipo.marca || '',
          referencia: equipo.referencia || '',
          serial: equipo.serial || '',
          tipoEquipo: equipo.tipoequipo || '',  // Note: DB column name might be tipoequipo
          monitor: equipo.monitor || false,
          created_at: equipo.created_at,
          updated_at: equipo.updated_at
        };

        // If equipment has a monitor, fetch its details
        if (mappedEquipo.monitor) {
          const { data: monitorData } = await supabase
            .from('monitores')
            .select('*')
            .eq('equipo_id', mappedEquipo.id)
            .single();

          if (monitorData) {
            mappedEquipo.monitorInfo = {
              id: monitorData.id,
              marca: monitorData.marca || '',
              activo: monitorData.activo || '',
              serial: monitorData.serial || '',
              estado: monitorData.estado || ''
            };
          }
        }
        
        return mappedEquipo;
      })
    );
    
    return equipos;
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    return [];
  }
};

// Alias para compatibilidad con el hook existente
export const getEquipos = fetchEquipos;

// Obtener un equipo con sus detalles
export const fetchEquipoConDetalles = async (id: string): Promise<Equipo | null> => {
  try {
    const { data, error } = await supabase
      .rpc('obtener_equipo_con_monitor', { equipo_id: id });

    if (error) throw error;
    if (!data) return null;
    
    // Convertir el resultado a un objeto Equipo
    // Usando type assertion con as para ayudar con la tipización
    const result = data as any;
    
    const equipo: Equipo = {
      id: result.id,
      hostname: result.hostname,
      ip: result.ip || '',
      sede: result.sede || '',
      area: result.area || '',
      responsable: result.responsable || '',
      mac: result.mac || '',
      procesador: result.procesador || '',
      memoriaRam: result.memoriaRam || '',
      discoDuro: result.discoDuro || '',
      tipoDisco: result.tipoDisco || '',
      activo: result.activo || '',
      marca: result.marca || '',
      referencia: result.referencia || '',
      serial: result.serial || '',
      tipoEquipo: result.tipoEquipo || '',
      monitor: !!result.monitor,
      created_at: result.created_at,
      updated_at: result.updated_at
    };
      
    // Añadir monitor si existe
    if (equipo.monitor && result.monitorInfo) {
      equipo.monitorInfo = {
        id: result.monitorInfo.id,
        marca: result.monitorInfo.marca || '',
        activo: result.monitorInfo.activo || '',
        serial: result.monitorInfo.serial || '',
        estado: result.monitorInfo.estado || ''
      };
    }
      
    return equipo;
  } catch (error) {
    console.error('Error al obtener equipo con detalles:', error);
    return null;
  }
};

// Añadir un nuevo equipo
export const createEquipo = async (equipo: Omit<Equipo, 'id'>): Promise<Equipo | null> => {
  try {
    // First, insert the equipo
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
        memoriaram: equipo.memoriaRam,  // Note DB column name
        discoduro: equipo.discoDuro,    // Note DB column name
        tipodisco: equipo.tipoDisco,    // Note DB column name
        activo: equipo.activo,
        marca: equipo.marca,
        referencia: equipo.referencia,
        serial: equipo.serial,
        tipoequipo: equipo.tipoEquipo,  // Note DB column name
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

    // Devolver el equipo insertado con formato de nuestra interfaz
    return {
      id: equipoData.id,
      hostname: equipoData.hostname,
      ip: equipoData.ip || '',
      sede: equipoData.sede || '',
      area: equipoData.area || '',
      responsable: equipoData.responsable || '',
      mac: equipoData.mac || '',
      procesador: equipoData.procesador || '',
      memoriaRam: equipoData.memoriaram || '',
      discoDuro: equipoData.discoduro || '',
      tipoDisco: equipoData.tipodisco || '',
      activo: equipoData.activo || '',
      marca: equipoData.marca || '',
      referencia: equipoData.referencia || '',
      serial: equipoData.serial || '',
      tipoEquipo: equipoData.tipoequipo || '',
      monitor: equipoData.monitor || false,
      monitorInfo: equipo.monitor && equipo.monitorInfo ? equipo.monitorInfo : undefined
    };
  } catch (error) {
    console.error('Error al añadir equipo:', error);
    return null;
  }
};

// Alias para compatibilidad con el hook existente
export const addEquipo = createEquipo;

// Actualizar un equipo existente
export const updateEquipo = async (id: string, equipoData: Partial<Equipo>): Promise<Equipo | null> => {
  try {
    const monitorInfo = equipoData.monitorInfo;
    const dataToUpdate: any = { ...equipoData };
    delete dataToUpdate.monitorInfo;
    
    // Map properties to DB column names
    if (dataToUpdate.memoriaRam !== undefined) {
      dataToUpdate.memoriaram = dataToUpdate.memoriaRam;
      delete dataToUpdate.memoriaRam;
    }
    
    if (dataToUpdate.discoDuro !== undefined) {
      dataToUpdate.discoduro = dataToUpdate.discoDuro;
      delete dataToUpdate.discoDuro;
    }
    
    if (dataToUpdate.tipoDisco !== undefined) {
      dataToUpdate.tipodisco = dataToUpdate.tipoDisco;
      delete dataToUpdate.tipoDisco;
    }
    
    if (dataToUpdate.tipoEquipo !== undefined) {
      dataToUpdate.tipoequipo = dataToUpdate.tipoEquipo;
      delete dataToUpdate.tipoEquipo;
    }

    // Actualizar el equipo
    const { data, error: equipoError } = await supabase
      .from('equipos')
      .update(dataToUpdate)
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

// Alias para compatibilidad
export const editEquipo = updateEquipo;

// Eliminar un equipo
export const deleteEquipo = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('equipos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error al eliminar equipo:', error);
    return false;
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
