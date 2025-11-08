import React from "react";
import { IoFunnelOutline } from "react-icons/io5";
import TransactionItem from "./TransactionItem";
import { useAppDispatch } from "../store/hooks";
import { toggleFilter } from "../store/slices/filterSlice";
import { Transaction } from "../utils/dashboardApi";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <div className="py-4 md:px-0 sm:py-6 sm:px-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
          <h2 className="text-lg sm:text-xl font-[700] text-gray-900">
            {transactions?.length} Transaction
            <span>
              {transactions?.length !== 1 ? "s" : ""}
            </span>
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => dispatch(toggleFilter())}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#EFF1F6] hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 transition-colors"
            >
              <span>Filter</span>
              <span>
                <img src={"/images/expand_more.png"} alt={"filter-icon"} className="w-4 h-4" />
              </span>
            </button>
            <button className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#EFF1F6] hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 transition-colors">
              <span className="hidden sm:inline">Export list</span>
              <span className="sm:hidden">Export</span>
              <span>
                <img src={"/images/download.png"} alt={"export-icon"} className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          Your transactions for the last 7 days
        </p>
      </div>

      {/* Transaction List */}
      {transactions?.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction, index) => (
            <TransactionItem key={index + 1} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <IoFunnelOutline className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 text-center">
            No matching transaction found for the selected filter
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 text-center max-w-md mb-6">
            Change your filters to see more results, or add a new product.
          </p>
          <button
            onClick={() => dispatch(toggleFilter())}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;