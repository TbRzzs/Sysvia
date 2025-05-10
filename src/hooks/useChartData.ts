
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ChartDataPoint, getChartData } from '@/services/equipmentService';

export const useChartData = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const data = await getChartData();
      setChartData(data);
      setError(null);
    } catch (err: any) {
      setError(err);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los datos del gráfico',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return {
    chartData,
    loading,
    error,
    fetchChartData,
  };
};
