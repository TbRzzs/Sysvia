
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

interface DataChartProps {
  data: DataPoint[];
  lines: {
    dataKey: string;
    stroke: string;
    name?: string;
  }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function DataChart({ 
  data, 
  lines, 
  height = 200, 
  showGrid = true,
  showLegend = true
}: DataChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />}
        <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '10px'
          }} 
        />
        {showLegend && <Legend />}
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            name={line.name || line.dataKey}
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 2, fill: 'white' }}
            activeDot={{ r: 5, strokeWidth: 0, fill: line.stroke }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
