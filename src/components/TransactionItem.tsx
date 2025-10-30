import React from "react";
import { Transaction } from "../types";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center gap-4 py-4 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Status Icon */}
      <span>
        <img
          src={transaction.status == "successful" ? "/images/success_icon.png" : "/images/failed_icon.png"}
          alt={`menu-icon-${transaction.id

          }`}
        />
      </span>

      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">
          {transaction.title}
        </h4>
        <p className="text-xs text-gray-500">{transaction.merchant}</p>
      </div>

      {/* Amount and Date */}
      <div className="text-right flex-shrink-0">
        <div className="text-sm font-semibold text-gray-900">
          {formatCurrency(transaction.amount)}
        </div>
        <div className="text-xs text-gray-500">
          {formatDate(transaction.date)}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
