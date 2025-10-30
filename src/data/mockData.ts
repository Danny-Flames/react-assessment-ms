import type { Transaction, ChartDataPoint } from "../types";

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Psychology of Money',
    merchant: 'Roy Cash',
    amount: 600,
    date: '2022-04-03',
    status: 'successful',
    type: 'store_transaction',
  },
  {
    id: '2',
    title: 'Buy me a coffee',
    merchant: 'Jonathan Smart',
    amount: 100,
    date: '2022-04-02',
    status: 'successful',
    type: 'get_tipped',
  },
  {
    id: '3',
    title: 'How to build an online brand',
    merchant: 'Delvan Luderis',
    amount: 100,
    date: '2022-04-02',
    status: 'successful',
    type: 'store_transaction',
  },
  {
    id: '4',
    title: 'Cash withdrawal',
    merchant: 'Successful',
    amount: 3000.33,
    date: '2022-04-01',
    status: 'failed',
    type: 'withdrawals',
  },
  {
    id: '5',
    title: 'Support my outreach',
    merchant: 'Shawn Kane',
    amount: 400,
    date: '2022-04-01',
    status: 'successful',
    type: 'get_tipped',
  },
  {
    id: '6',
    title: 'Cash withdrawal',
    merchant: 'Pending',
    amount: 1004.44,
    date: '2022-04-01',
    status: 'pending',
    type: 'withdrawals',
  },
  {
    id: '7',
    title: 'Learn how to pitch your idea',
    merchant: 'Dajon Jencho',
    amount: 1200,
    date: '2022-04-02',
    status: 'successful',
    type: 'store_transaction',
  },
];

// Generate chart data for the last 30 days with smooth curve pattern
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