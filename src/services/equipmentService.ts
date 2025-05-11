
import { supabase } from '@/integrations/supabase/client';

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

export const getChartData = async (): Promise<ChartDataPoint[]> => {
  try {
    const { data, error } = await supabase
      .from('estadisticas_mensuales')
      .select('*')
      .order('id');

    if (error) throw error;

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
export const fetchEquipos = async (): Promise<Equipo[]> => {
  try {
    const { data, error } = await supabase
      .from('equipos')
      .select('*')
      .order('hostname');

    if (error) throw error;

    const equipos = await Promise.all(
      (data || []).map(async (equipo) => {
        const mappedEquipo: Equipo = {
          id: equipo.id,
          hostname: equipo.hostname,
          ip: equipo.ip || '',
          sede: equipo.sede || '',
          area: equipo.area || '',
          responsable: equipo.responsable || '',
          mac: equipo.mac || '',
          procesador: equipo.procesador || '',
          memoriaRam: equipo.memoriaram || '',
          discoDuro: equipo.discoduro || '',
          tipoDisco: equipo.tipodisco || '',
          activo: equipo.activo || '',
          marca: equipo.marca || '',
          referencia: equipo.referencia || '',
          serial: equipo.serial || '',
          tipoEquipo: equipo.tipoequipo || '',
          monitor: equipo.monitor || false,
          created_at: equipo.created_at,
          updated_at: equipo.updated_at
        };

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

export const getEquipos = fetchEquipos;

export const fetchEquipoConDetalles = async (id: string): Promise<Equipo | null> => {
  try {
    const { data, error } = await supabase
      .rpc('obtener_equipo_con_monitor', { equipo_id: id });

    if (error) throw error;
    if (!data) return null;

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

export const createEquipo = async (equipo: Omit<Equipo, 'id'>): Promise<Equipo | null> => {
  try {
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
        memoriaram: equipo.memoriaRam,
        discoduro: equipo.discoDuro,
        tipodisco: equipo.tipoDisco,
        activo: equipo.activo,
        marca: equipo.marca,
        referencia: equipo.referencia,
        serial: equipo.serial,
        tipoequipo: equipo.tipoEquipo,
        monitor: equipo.monitor
      }])
      .select()
      .single();

    if (equipoError) throw equipoError;

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

export const addEquipo = createEquipo;

export const updateEquipo = async (id: string, equipoData: Partial<Equipo>): Promise<Equipo | null> => {
  try {
    const monitorInfo = equipoData.monitorInfo;
    const dataToUpdate: any = { ...equipoData };
    delete dataToUpdate.monitorInfo;

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

    const { data, error: equipoError } = await supabase
      .from('equipos')
      .update(dataToUpdate)
      .eq('id', id)
      .select()
      .single();

    if (equipoError) throw equipoError;

    if (equipoData.monitor && monitorInfo) {
      const { data: existingMonitor } = await supabase
        .from('monitores')
        .select('*')
        .eq('equipo_id', id)
        .maybeSingle();

      if (existingMonitor) {
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
      const { error: monitorDeleteError } = await supabase
        .from('monitores')
        .delete()
        .eq('equipo_id', id);

      if (monitorDeleteError) throw monitorDeleteError;
    }

    return await fetchEquipoConDetalles(id);
  } catch (error) {
    console.error('Error al actualizar equipo:', error);
    return null;
  }
};

export const editEquipo = updateEquipo;

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

export const deleteEquipos = async (ids: string[]): Promise<boolean> => {
  try {
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

export const exportInventory = async (format: 'xlsx' | 'csv' | 'pdf'): Promise<Blob> => {
  try {
    const equipos = await fetchEquipos();
    let blob: Blob;

    if (format === 'csv') {
      const headers = 'Hostname,IP,Sede,Area,Responsable,MAC,Procesador,MemoriaRam,DiscoDuro,TipoDisco,Activo,Marca,Referencia,Serial,TipoEquipo,Monitor\n';
      const rows = equipos.map(e =>
        `${e.hostname},${e.ip},${e.sede},${e.area},${e.responsable},${e.mac},${e.procesador},${e.memoriaRam},${e.discoDuro},${e.tipoDisco},${e.activo},${e.marca},${e.referencia},${e.serial},${e.tipoEquipo},${e.monitor}`
      ).join('\n');

      blob = new Blob([headers + rows], { type: 'text/csv' });
    } else if (format === 'xlsx') {
      blob = new Blob(['Simulación de archivo XLSX'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    } else {
      blob = new Blob(['Simulación de archivo PDF'], { type: 'application/pdf' });
    }

    return blob;
  } catch (error) {
    console.error('Error al exportar inventario:', error);
    throw error;
  }
};

export const importInventory = async (file: File): Promise<boolean> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  } catch (error) {
    console.error('Error al importar inventario:', error);
    return false;
  }
};
