import React from 'react';
import Skeleton from './Skeleton';
import BalanceCardSkeleton from './BalanceCardSkeleton';
import ChartSkeleton from './ChartSkeleton';
import TransactionListSkeleton from './TransactionListSkeleton';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="mx-2 sm:mx-6 lg:mx-32 pt-[80px] sm:pt-[100px] lg:pt-[120px]">
      <div className="flex flex-col lg:flex-row mb-4">
        {/* Left Section - Chart and Transactions */}
        <div className="flex-1 lg:pr-3 mb-6 lg:mb-0">
          <div className="w-full lg:w-[88%]">
            {/* Available Balance and Withdraw Button Skeleton */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-10 w-48" />
              </div>
              <div className="md:ml-[6%] sm:ml-auto">
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
            </div>

            {/* Chart Skeleton */}
            <div className="mb-10">
              <ChartSkeleton />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Balance Cards Skeleton */}
        <div className="w-full lg:w-80 lg:pl-3">
          <BalanceCardSkeleton />
          <BalanceCardSkeleton />
          <BalanceCardSkeleton />
          <BalanceCardSkeleton />
        </div>
      </div>

      {/* Transactions Skeleton */}
      <div>
        <TransactionListSkeleton />
      </div>
    </div>
  );
};

export default DashboardSkeleton;