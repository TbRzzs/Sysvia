
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
  monitorInfo?: MonitorInfo;
  created_at?: string;
  updated_at?: string;
}

export interface MonitorInfo {
  id?: string;
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

  // Mapeamos los campos de la base de datos a nuestra interfaz
  const equiposTransformed = await Promise.all(
    data.map(async (equipo) => {
      const transformedEquipo: Equipo = {
        id: equipo.id,
        hostname: equipo.hostname,
        ip: equipo.ip || "",
        sede: equipo.sede || "",
        area: equipo.area || "",
        responsable: equipo.responsable || "",
        mac: equipo.mac || "",
        procesador: equipo.procesador || "",
        memoriaRam: equipo.memoriaram || "",
        discoDuro: equipo.discoduro || "",
        tipoDisco: equipo.tipodisco || "",
        activo: equipo.activo || "",
        marca: equipo.marca || "",
        referencia: equipo.referencia || "",
        serial: equipo.serial || "",
        tipoEquipo: equipo.tipoequipo || "",
        monitor: equipo.monitor || false,
        created_at: equipo.created_at,
        updated_at: equipo.updated_at,
      };

      // Obtener monitor si existe
      if (equipo.monitor) {
        const { data: monitorData, error: monitorError } = await supabase
          .from('monitores')
          .select('*')
          .eq('equipo_id', equipo.id)
          .single();

        if (monitorError && monitorError.code !== 'PGRST116') {
          console.error('Error fetching monitor:', monitorError);
        }

        if (monitorData) {
          transformedEquipo.monitorInfo = {
            id: monitorData.id,
            marca: monitorData.marca || "",
            activo: monitorData.activo || "",
            serial: monitorData.serial || "",
            estado: monitorData.estado || ""
          };
        }
      }

      return transformedEquipo;
    })
  );

  return equiposTransformed;
};

// Obtener un equipo por ID
export const getEquipoById = async (id: string): Promise<Equipo | null> => {
  const { data, error } = await supabase
    .rpc('obtener_equipo_con_monitor', { equipo_id: id });

  if (error) {
    console.error('Error fetching equipo by ID:', error);
    throw error;
  }

  if (!data) return null;

  // Transformar los datos al formato que espera nuestra interfaz
  const equipo: Equipo = {
    id: data.id,
    hostname: data.hostname,
    ip: data.ip || "",
    sede: data.sede || "",
    area: data.area || "",
    responsable: data.responsable || "",
    mac: data.mac || "",
    procesador: data.procesador || "",
    memoriaRam: data.memoriaRam || "",
    discoDuro: data.discoDuro || "",
    tipoDisco: data.tipoDisco || "",
    activo: data.activo || "",
    marca: data.marca || "",
    referencia: data.referencia || "",
    serial: data.serial || "",
    tipoEquipo: data.tipoEquipo || "",
    monitor: data.monitor || false,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  if (data.monitorInfo) {
    equipo.monitorInfo = {
      id: data.monitorInfo.id,
      marca: data.monitorInfo.marca || "",
      activo: data.monitorInfo.activo || "",
      serial: data.monitorInfo.serial || "",
      estado: data.monitorInfo.estado || ""
    };
  }

  return equipo;
};

// Crear un nuevo equipo
export const createEquipo = async (equipo: Omit<Equipo, 'id'>): Promise<Equipo> => {
  // Extraer la información del monitor para insertarla por separado
  const { monitorInfo, ...equipoData } = equipo;
  
  // Mapear los datos al formato de la tabla en Supabase
  const supabaseEquipo = {
    hostname: equipoData.hostname,
    ip: equipoData.ip,
    sede: equipoData.sede,
    area: equipoData.area,
    responsable: equipoData.responsable,
    mac: equipoData.mac,
    procesador: equipoData.procesador,
    memoriaram: equipoData.memoriaRam,
    discoduro: equipoData.discoDuro,
    tipodisco: equipoData.tipoDisco,
    activo: equipoData.activo,
    marca: equipoData.marca,
    referencia: equipoData.referencia,
    serial: equipoData.serial,
    tipoequipo: equipoData.tipoEquipo,
    monitor: equipoData.monitor
  };
  
  // Insertar el equipo primero
  const { data, error } = await supabase
    .from('equipos')
    .insert(supabaseEquipo)
    .select()
    .single();

  if (error) {
    console.error('Error creating equipo:', error);
    throw error;
  }

  const createdEquipo: Equipo = {
    id: data.id,
    hostname: data.hostname,
    ip: data.ip || "",
    sede: data.sede || "",
    area: data.area || "",
    responsable: data.responsable || "",
    mac: data.mac || "",
    procesador: data.procesador || "",
    memoriaRam: data.memoriaram || "",
    discoDuro: data.discoduro || "",
    tipoDisco: data.tipodisco || "",
    activo: data.activo || "",
    marca: data.marca || "",
    referencia: data.referencia || "",
    serial: data.serial || "",
    tipoEquipo: data.tipoequipo || "",
    monitor: data.monitor || false,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  // Si tiene monitor, insertar la información del monitor
  if (equipo.monitor && monitorInfo) {
    const supabaseMonitor = {
      equipo_id: data.id,
      marca: monitorInfo.marca,
      activo: monitorInfo.activo,
      serial: monitorInfo.serial,
      estado: monitorInfo.estado
    };

    const { data: monitorData, error: monitorError } = await supabase
      .from('monitores')
      .insert(supabaseMonitor)
      .select()
      .single();

    if (monitorError) {
      console.error('Error creating monitor:', monitorError);
      // No lanzamos el error para no interrumpir el flujo, pero lo registramos
    } else {
      createdEquipo.monitorInfo = {
        id: monitorData.id,
        marca: monitorData.marca || "",
        activo: monitorData.activo || "",
        serial: monitorData.serial || "",
        estado: monitorData.estado || ""
      };
    }
  }

  return createdEquipo;
};

// Actualizar un equipo existente
export const updateEquipo = async (id: string, equipo: Partial<Equipo>): Promise<void> => {
  const { monitorInfo, ...equipoData } = equipo;
  
  // Mapear los datos al formato de la tabla en Supabase
  const supabaseEquipo: Record<string, any> = {};
  
  if (equipoData.hostname !== undefined) supabaseEquipo.hostname = equipoData.hostname;
  if (equipoData.ip !== undefined) supabaseEquipo.ip = equipoData.ip;
  if (equipoData.sede !== undefined) supabaseEquipo.sede = equipoData.sede;
  if (equipoData.area !== undefined) supabaseEquipo.area = equipoData.area;
  if (equipoData.responsable !== undefined) supabaseEquipo.responsable = equipoData.responsable;
  if (equipoData.mac !== undefined) supabaseEquipo.mac = equipoData.mac;
  if (equipoData.procesador !== undefined) supabaseEquipo.procesador = equipoData.procesador;
  if (equipoData.memoriaRam !== undefined) supabaseEquipo.memoriaram = equipoData.memoriaRam;
  if (equipoData.discoDuro !== undefined) supabaseEquipo.discoduro = equipoData.discoDuro;
  if (equipoData.tipoDisco !== undefined) supabaseEquipo.tipodisco = equipoData.tipoDisco;
  if (equipoData.activo !== undefined) supabaseEquipo.activo = equipoData.activo;
  if (equipoData.marca !== undefined) supabaseEquipo.marca = equipoData.marca;
  if (equipoData.referencia !== undefined) supabaseEquipo.referencia = equipoData.referencia;
  if (equipoData.serial !== undefined) supabaseEquipo.serial = equipoData.serial;
  if (equipoData.tipoEquipo !== undefined) supabaseEquipo.tipoequipo = equipoData.tipoEquipo;
  if (equipoData.monitor !== undefined) supabaseEquipo.monitor = equipoData.monitor;
  
  // Actualizar el equipo
  const { error } = await supabase
    .from('equipos')
    .update(supabaseEquipo)
    .eq('id', id);

  if (error) {
    console.error('Error updating equipo:', error);
    throw error;
  }

  // Si tiene monitor, actualizar la información del monitor
  if (equipo.monitor !== false && monitorInfo) {
    const supabaseMonitor = {
      marca: monitorInfo.marca,
      activo: monitorInfo.activo,
      serial: monitorInfo.serial,
      estado: monitorInfo.estado
    };

    // Intentamos hacer un update primero
    const { error: updateError } = await supabase
      .from('monitores')
      .update(supabaseMonitor)
      .eq('equipo_id', id);

    if (updateError) {
      console.error('Error updating monitor:', updateError);
      
      // Si no existe, lo creamos
      const { error: insertError } = await supabase
        .from('monitores')
        .insert({
          equipo_id: id,
          ...supabaseMonitor
        });

      if (insertError) {
        console.error('Error inserting monitor after update failure:', insertError);
      }
    }
  } else if (equipo.monitor === false) {
    // Si se marca como que no tiene monitor, eliminamos cualquier monitor asociado
    const { error: deleteError } = await supabase
      .from('monitores')
      .delete()
      .eq('equipo_id', id);

    if (deleteError) {
      console.error('Error deleting monitor:', deleteError);
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
    desktop: item.desktop || 0,
    laptop: item.laptop || 0,
    servidor: item.servidor || 0
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
