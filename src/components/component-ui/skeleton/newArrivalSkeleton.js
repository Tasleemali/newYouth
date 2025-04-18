import React from 'react'

function NewArrivalSkeleton() {
  const skeletonItems = new Array(8).fill(null)

  return (
    <div className='bg-white text-black'>
      <div className='mx-auto max-w-screen-2xl py-5'>
        <div className='px-5 sm:px-10'>
          {/* Hero Skeleton */}
          <div className='w-full h-40 bg-gray-200 rounded-lg animate-pulse mb-5'></div>

          {/* Heading Skeleton */}
          <div className='flex justify-center items-center mb-5'>
            <div className='h-6 w-20 bg-gray-300 rounded mr-2 animate-pulse'></div>
            <div className='h-8 w-28 bg-gray-400 rounded skew-x-[-10deg] animate-pulse'></div>
          </div>

          {/* Product Grid Skeleton */}
          <div className='py-10 grid grid-cols-2 md:grid-cols-4 gap-2'>
            {skeletonItems.map((_, index) => (
              <div key={index} className='pb-5 w-full max-w-sm bg-white rounded-lg overflow-hidden gap-5'>
                <div className='w-full aspect-[4/5] bg-gray-200 animate-pulse rounded-md relative'></div>
                <div className='pt-4 space-y-2 px-2'>
                  <div className='w-1/2 h-4 bg-gray-300 rounded animate-pulse'></div>
                  <div className='w-2/3 h-4 bg-gray-200 rounded animate-pulse'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewArrivalSkeleton