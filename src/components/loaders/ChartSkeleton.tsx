import React from 'react';
import Skeleton from './Skeleton';

const ChartSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Chart area */}
      <div className="h-56 flex items-end justify-between gap-2 mb-4">
        {/* Animated bars representing chart */}
        {[...Array(20)].map((_, index) => (
          <Skeleton
            key={index}
            className="flex-1"
          />
        ))}
      </div>

      {/* Date labels skeleton */}
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
};

export default ChartSkeleton;