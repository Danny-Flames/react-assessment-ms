import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

interface BalanceCardProps {
  label: string;
  amount: number;
  hasInfo?: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  label,
  amount,
  hasInfo = false,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[#56616B]">{label}</span>
        {hasInfo && (
          <>
            <span>
              <img src={"/images/info.png"} alt={"notification-icon"} />
            </span>
          </>
        )}
      </div>
      <div className="text-2xl font-semibold text-gray-900">
        {formatCurrency(amount)}
      </div>
    </div>
  );
};

export default BalanceCard;
