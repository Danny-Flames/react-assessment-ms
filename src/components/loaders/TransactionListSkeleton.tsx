import Skeleton from "./Skeleton";
import TransactionItemSkeleton from "./TransactionItemSkeleton";

const TransactionListSkeleton: React.FC = () => {
    return (
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-4 w-48" />
        </div>
  
        {/* Transaction List */}
        <div className="divide-y divide-gray-100">
          {[...Array(5)].map((_, index) => (
            <TransactionItemSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  };
  
  export default TransactionListSkeleton;