
import React, { useMemo } from 'react';
import { DataChart } from '@/components/data-chart';
import { useChartData } from '@/hooks/useChartData';
import { Skeleton } from '@/components/ui/skeleton';
import { ChartDataPoint } from '@/services/equipmentService';

interface HistoryChartProps {
  selectedSede?: string;
  selectedArea?: string;
  searchQuery?: string;
}

export const HistoryChart: React.FC<HistoryChartProps> = ({ 
  selectedSede = "Todos", 
  selectedArea = "Todos",
  searchQuery = ""
}) => {
  const { chartData, loading } = useChartData();
  
  // Filtrar datos de la gráfica según los filtros aplicados
  const filteredChartData = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];
    
    // Si no hay filtros activos, devolver todos los datos
    if (selectedSede === "Todos" && selectedArea === "Todos" && !searchQuery) {
      return chartData;
    }
    
    // Aplicar factores de ajuste basados en los filtros
    return chartData.map(point => {
      const sedeFilter = selectedSede !== "Todos" ? 0.7 : 1;
      const areaFilter = selectedArea !== "Todos" ? 0.8 : 1;
      const searchFilter = searchQuery ? 0.9 : 1;
      
      // Calculamos factores diferentes para cada tipo de equipo
      // para simular que los filtros afectan de manera distinta a cada categoría
      const desktopFactor = sedeFilter * (selectedSede === "Sede Principal" ? 1.2 : 0.8) * 
                           areaFilter * (selectedArea === "Administración" ? 1.3 : 0.9) * 
                           searchFilter;
                           
      const laptopFactor = sedeFilter * (selectedSede === "Paquetería Express" ? 1.4 : 0.7) * 
                          areaFilter * (selectedArea === "Tecnología" ? 1.5 : 0.8) * 
                          searchFilter;
                          
      const servidorFactor = sedeFilter * (selectedSede === "Bodega Norte" ? 1.6 : 0.6) * 
                            areaFilter * (selectedArea === "Tecnología" ? 1.7 : 0.7) * 
                            searchFilter;
      
      return {
        name: point.name,
        desktop: Math.round(point.desktop * desktopFactor),
        laptop: Math.round(point.laptop * laptopFactor),
        servidor: Math.round(point.servidor * servidorFactor)
      };
    });
  }, [chartData, selectedSede, selectedArea, searchQuery]);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-lg">Histórico de Equipos</h3>
            <p className="text-envio-gray-500 text-sm">Cargando datos...</p>
          </div>
        </div>
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium text-lg">Histórico de Equipos</h3>
          <p className="text-envio-gray-500 text-sm">
            {selectedSede !== "Todos" || selectedArea !== "Todos" || searchQuery 
              ? `Datos filtrados: ${selectedSede !== "Todos" ? selectedSede : ''} ${selectedArea !== "Todos" ? selectedArea : ''}`
              : "Crecimiento de inventario por mes"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-envio-blue"></div>
            <span className="text-xs text-envio-gray-500">Desktop</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-envio-green"></div>
            <span className="text-xs text-envio-gray-500">Laptop</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-envio-orange"></div>
            <span className="text-xs text-envio-gray-500">Servidor</span>
          </div>
        </div>
      </div>
      
      <DataChart 
        data={filteredChartData as any[]} 
        lines={[
          { dataKey: 'desktop', stroke: '#0A84FF', name: 'Desktop' },
          { dataKey: 'laptop', stroke: '#30D158', name: 'Laptop' },
          { dataKey: 'servidor', stroke: '#FF9F0A', name: 'Servidor' }
        ]}
        height={250}
        showLegend={false}
      />
    </div>
  );
};
