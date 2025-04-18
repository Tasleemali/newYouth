const LoadingSkeleton = () => {
    return (
      <div className="animate-pulse space-y-4">
        {/* Skeleton for User Name */}
        <div className="w-1/2 h-8 bg-gray-200 rounded-md"></div>
  
        {/* Skeleton for Email */}
        <div className="w-3/4 h-6 bg-gray-200 rounded-md"></div>
  
        {/* Skeleton for Address */}
        <div className="w-full h-8 bg-gray-200 rounded-md"></div>
  
        {/* Skeleton for Profile Details */}
        <div className="w-full h-12 bg-gray-200 rounded-md"></div>
      </div>
    )
  }
  export default LoadingSkeleton