import { api } from "./apiUtils";

// Dashboard API Response Types
export interface DashboardData {
  availableBalance: number;
  ledgerBalance: number;
  totalPayout: number;
  totalRevenue: number;
  pendingPayout: number;
}

export interface TransactionMetadata {
  name: string;
  type: string;
  email: string;
  quantity: number;
  country: string;
  product_name: string;
}

export interface Transaction {
  amount: number;
  metadata: TransactionMetadata;
  payment_reference: string;
  status: "successful" | "pending" | "failed";
  type:
    | "deposit"
    | "withdrawal"
    | "store_transaction"
    | "get_tipped"
    | "withdrawals"
    | "chargebacks"
    | "cashbacks"
    | "refer_and_earn";
  date: string;
}

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

// Filter parameters for transactions
export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  transactionTypes?: string[];
  transactionStatuses?: string[];
  page?: number;
  perPage?: number;
}

// Dashboard API Service
export const dashboardApi = {
  // Get dashboard balance data
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>("/dashboard");
    return response.data;
  },

  // Get transactions
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>("/transactions");
    return response.data;
  },

  //  Get user data
  getUser: async (): Promise<UserData> => {
    const response = await api.get<UserData>("/user");
    return response.data;
  },
};

export default dashboardApi;
