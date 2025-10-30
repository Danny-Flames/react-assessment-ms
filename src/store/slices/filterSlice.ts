import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuickFilterType = 'today' | 'last_7_days' | 'this_month' | 'last_3_months' | 'custom';

export type TransactionType = 'store_transaction' | 'get_tipped' | 'withdrawals' | 'chargebacks' | 'cashbacks' | 'refer_and_earn';

export type TransactionStatus = 'successful' | 'pending' | 'failed';

interface FilterState {
  isOpen: boolean;
  quickFilter: QuickFilterType;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  transactionTypes: TransactionType[];
  transactionStatuses: TransactionStatus[];
}

const initialState: FilterState = {
  isOpen: false,
  quickFilter: 'last_7_days',
  dateRange: {
    start: null,
    end: null,
  },
  transactionTypes: [],
  transactionStatuses: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeFilter: (state) => {
      state.isOpen = false;
    },
    setQuickFilter: (state, action: PayloadAction<QuickFilterType>) => {
      state.quickFilter = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ start: string | null; end: string | null }>) => {
      state.dateRange = action.payload;
    },
    setTransactionTypes: (state, action: PayloadAction<TransactionType[]>) => {
      state.transactionTypes = action.payload;
    },
    toggleTransactionType: (state, action: PayloadAction<TransactionType>) => {
      const index = state.transactionTypes.indexOf(action.payload);
      if (index > -1) {
        state.transactionTypes.splice(index, 1);
      } else {
        state.transactionTypes.push(action.payload);
      }
    },
    setTransactionStatuses: (state, action: PayloadAction<TransactionStatus[]>) => {
      state.transactionStatuses = action.payload;
    },
    clearFilters: (state) => {
      state.quickFilter = 'last_7_days';
      state.dateRange = { start: null, end: null };
      state.transactionTypes = [];
      state.transactionStatuses = [];
    },
  },
});

export const {
  toggleFilter,
  closeFilter,
  setQuickFilter,
  setDateRange,
  setTransactionTypes,
  toggleTransactionType,
  setTransactionStatuses,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;