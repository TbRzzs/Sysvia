
import React from 'react';
import { DataChart } from '@/components/data-chart';

interface HistoryChartProps {
  data: any[];
}

export const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-medium text-lg">Histórico de Equipos</h3>
          <p className="text-envio-gray-500 text-sm">Crecimiento de inventario por mes</p>
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
        data={data} 
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
