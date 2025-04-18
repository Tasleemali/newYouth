"use client"

import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import MenProductSkeleton from '@/components/component-ui/skeleton/menWomenSkeleton'
function Women() {
  const router = useRouter()
  const [product, setProduct] = useState([])
   const [loading, setLoading] = useState(false)
  const { query } = useContext(GlobalContext)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const res = await fetch("/api/products/get")
        const data = await res.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])
  if (loading) {
    return <MenProductSkeleton/>
  }
  return (
    <div className='bg-white text-black'>
      <div className='mx-auto max-w-screen-2xl py-8'>
        <div className='px-5 sm:px-10'>
          
          {/* Hero Image or Banner */}
          <div className='mb-6'>
            {/* <NewArrivalBanner /> */}
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold flex justify-center items-center gap-2 mb-8">
            Only
            <span className="bg-black text-white px-3 py-1 rounded skew-x-[-10deg] inline-block">
              Women
            </span>
          </h1>

          {/* Product List */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {product
                .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                .map((item, index) => {
                  if (item.category === "Women") {
                    let discountPercentage = 0
                    if (item.discount && item.price) {
                      discountPercentage = Math.round(
                        ((item.discount - item.price) / item.discount) * 100
                      )
                    }
                    return (
                      <div
                        key={index}
                        onClick={() => { router.push(`/main/${item._id}`) }}
                        className='cursor-pointer transition-transform hover:scale-[1.02]'
                      >
                        <div className='w-full bg-white rounded-lg overflow-hidden shadow-md'>
                          <div className='w-full aspect-[4/5] bg-gray-100 relative'>
                            {discountPercentage > 0 && (
                              <span className='absolute top-3 left-3 p-1 rounded-sm bg-red-800 text-white text-xs md:text-sm'>
                                {discountPercentage}% OFF
                              </span>
                            )}
                            <img
                              src={item.mainImage}
                              alt='product'
                              className='w-full h-full object-cover'
                            />
                          </div>

                          <div className='pt-3 px-3 pb-4 space-y-1'>
                            <h2 className='text-base font-semibold truncate'>{item.name}</h2>
                            <div className='text-sm font-medium'>
                              ${item.price}{' '}
                              <span className='text-gray-400 line-through ml-2'>
                                ${item.discount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Women
