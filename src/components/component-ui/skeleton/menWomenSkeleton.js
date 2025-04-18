import React from 'react'

function MenProductSkeleton() {
  const skeletonArray = new Array(8).fill(0)

  return (
    <div className='bg-white text-black'>
      <div className='mx-auto max-w-screen-2xl py-8'>
        <div className='px-5 sm:px-10'>
          <div className='mb-6'>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {skeletonArray.map((_, index) => (
              <div key={index} className='w-full bg-white rounded-lg overflow-hidden shadow-md'>
                <div className='w-full aspect-[4/5] bg-gray-200 animate-pulse' />
                <div className='pt-3 px-3 pb-4 space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse'></div>
                  <div className='h-3 bg-gray-200 rounded w-1/2 animate-pulse'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenProductSkeleton
