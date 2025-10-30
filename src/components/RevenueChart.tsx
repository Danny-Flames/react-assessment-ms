import React from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface RevenueChartProps {
  data: ChartDataPoint[];
  startDate: string;
  endDate: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, startDate, endDate }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="h-64 border-b border-gray-200">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FF6B35"
              strokeWidth={2}
              dot={false}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Date Labels */}
      <div className="flex items-center justify-between mt-2 px-2">
        <span className="text-xs text-gray-400">{formatDate(startDate)}</span>
        <span className="text-xs text-gray-400">{formatDate(endDate)}</span>
      </div>
    </div>
  );
};

export default RevenueChart;