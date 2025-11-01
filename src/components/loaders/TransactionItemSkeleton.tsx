import React from 'react';
import Skeleton from './Skeleton';

const TransactionItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-4 p-4">
      {/* Status Icon */}
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

      {/* Transaction Details */}
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>

      {/* Amount and Date */}
      <div className="text-right flex-shrink-0 space-y-2">
        <Skeleton className="h-4 w-20 ml-auto" />
        <Skeleton className="h-3 w-24 ml-auto" />
      </div>
    </div>
  );
};

export default TransactionItemSkeleton;

