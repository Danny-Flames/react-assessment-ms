import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import dashboardApi, {
  Transaction,
  TransactionFilters,
} from "../../utils/dashboardApi";

interface DashboardState {
  availableBalance: number;
  ledgerBalance: number;
  totalPayout: number;
  totalRevenue: number;
  pendingPayout: number;
  transactions: Transaction[];
  userData: { first_name: string; last_name: string; email: string };
  walletData: {
    balance: number;
    total_payout: number;
    total_revenue: number;
    pending_payout: number;
    ledger_balance: number;
  };
  chartData: Array<{ date: string; value: number }>;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  availableBalance: 120500.0,
  ledgerBalance: 0.0,
  totalPayout: 55080.0,
  totalRevenue: 175580.0,
  pendingPayout: 0.0,
  transactions: [],
  userData: { first_name: "", last_name: "", email: "" },
  walletData: {
    balance: 0,
    total_payout: 0,
    total_revenue: 0,
    pending_payout: 0,
    ledger_balance: 0,
  },
  chartData: [],
  isLoading: false,
  error: null,
};

// Fetch dashboard balance data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getDashboardData();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch dashboard data");
    }
  }
);

// Fetch transactions with optional filters
export const fetchTransactions = createAsyncThunk(
  "dashboard/fetchTransactions",
  async (filters: TransactionFilters, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getTransactions();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch transactions");
    }
  }
);

// Fetch user data
export const fetchUserData = createAsyncThunk(
  "dashboard/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getUser();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user data");
    }
  }
);

// Fetch user wallet details
export const fetchUserWalletDetails = createAsyncThunk(
  "dashboard/fetchUserWalletDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getUserWalletDetails();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch wallet details");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setChartData: (
      state,
      action: PayloadAction<Array<{ date: string; value: number }>>
    ) => {
      state.chartData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Dashboard Data
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("transactions-fetched", action.payload);
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch User Data
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch User Wallet Details
      .addCase(fetchUserWalletDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserWalletDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.walletData = {...action.payload};
      })
      .addCase(fetchUserWalletDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTransactions, setChartData, setLoading, clearError } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
