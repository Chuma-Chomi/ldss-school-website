export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Stats Card Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200 rounded-lg p-6 h-24"></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-gray-200 rounded-lg shadow h-64">
        <div className="p-4 border-b border-gray-300">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
