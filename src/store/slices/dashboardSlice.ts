import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  title: string;
  merchant: string;
  amount: number;
  date: string;
  status: 'successful' | 'pending' | 'failed';
  type: 'store_transaction' | 'get_tipped' | 'withdrawals' | 'chargebacks' | 'cashbacks' | 'refer_and_earn';
}

interface DashboardState {
  availableBalance: number;
  ledgerBalance: number;
  totalPayout: number;
  totalRevenue: number;
  pendingPayout: number;
  transactions: Transaction[];
  chartData: Array<{ date: string; value: number }>;
  isLoading: boolean;
}

const initialState: DashboardState = {
  availableBalance: 120500.00,
  ledgerBalance: 0.00,
  totalPayout: 55080.00,
  totalRevenue: 175580.00,
  pendingPayout: 0.00,
  transactions: [],
  chartData: [],
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setChartData: (state, action: PayloadAction<Array<{ date: string; value: number }>>) => {
      state.chartData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTransactions, setChartData, setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;