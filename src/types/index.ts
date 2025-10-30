export interface Transaction {
    id: string;
    title: string;
    merchant: string;
    amount: number;
    date: string;
    status: 'successful' | 'pending' | 'failed';
    type: 'store_transaction' | 'get_tipped' | 'withdrawals' | 'chargebacks' | 'cashbacks' | 'refer_and_earn';
  }
  
  export interface BalanceCard {
    label: string;
    amount: number;
    hasInfo?: boolean;
  }
  
  export interface ChartDataPoint {
    date: string;
    value: number;
  }
  
  export type QuickFilterOption = {
    label: string;
    value: 'today' | 'last_7_days' | 'this_month' | 'last_3_months';
  };
  
  export const QUICK_FILTERS: QuickFilterOption[] = [
    { label: 'Today', value: 'today' },
    { label: 'Last 7 days', value: 'last_7_days' },
    { label: 'This month', value: 'this_month' },
    { label: 'Last 3 months', value: 'last_3_months' },
  ];
  
  export const TRANSACTION_TYPE_OPTIONS = [
    { label: 'Store Transactions', value: 'store_transaction' },
    { label: 'Get Tipped', value: 'get_tipped' },
    { label: 'Withdrawals', value: 'withdrawals' },
    { label: 'Chargebacks', value: 'chargebacks' },
    { label: 'Cashbacks', value: 'cashbacks' },
    { label: 'Refer & Earn', value: 'refer_and_earn' },
  ];
  
  export const TRANSACTION_STATUS_OPTIONS = [
    { label: 'Successful', value: 'successful' },
    { label: 'Pending', value: 'pending' },
    { label: 'Failed', value: 'failed' },
  ];