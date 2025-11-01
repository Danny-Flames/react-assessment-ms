import React from 'react';
import Skeleton from './Skeleton';

const BalanceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 mb-3">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-32" />
    </div>
  );
};

export default BalanceCardSkeleton;