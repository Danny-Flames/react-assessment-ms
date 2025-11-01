import type { ChartDataPoint } from "../types";

// I'd generate chart data for the last 30 days with smooth curve pattern
export const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Create a smooth wave pattern
    const value = 50000 + Math.sin((i / 30) * Math.PI * 2) * 30000 + Math.random() * 10000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100,
    });
  }
  
  return data;
};

export const mockChartData = generateChartData();