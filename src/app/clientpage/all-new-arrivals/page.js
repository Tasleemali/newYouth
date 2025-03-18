"use client"
import React, { useState, useEffect, useContext } from 'react'


import { motion } from 'framer-motion'
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import AllNewArrival from '@/components/component-ui/all-arrival-banner'


function NewArrival() {
  const router = useRouter()
  const [product, setProduct] = useState([])
  const { query } = useContext(GlobalContext)




  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products/get");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  console.log(product)
  return (


    <div className='bg-white text-black '>
      <div className='mx-auto max-w-screen-2xl'>
        <div className=' px-5 sm:px-10 ' >
          {/* img */}

          <div className='mt-4 '>
            <AllNewArrival/>
          </div>
          <h1 className=" mt-5 text-2xl font-bold flex  justify-center items-center gap-1"> New
            <span className="bg-black text-white px-3 py-1 rounded skew-x-[-10deg] inline-block">
              Arrivals
            </span>
          </h1>
          <div>

            <motion.div
              className="flex flex-col space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <div className=' py-10 grid grid-cols-2 md:grid-cols-4 gap-2 '>
                {product.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).map((item, index) => {

                  if (item.newArrival === true) {

                    let discountPercentage = 0;
                    if (item.discount && item.price) {
                      discountPercentage = Math.round(
                        ((item.discount - item.price) / item.discount) * 100
                      );
                    }
                    return (
                      <div key={index} onClick={() => { router.push(`/service/productdetails/${item._id}`) }}>
                        <div className=' pb-5 w-full h max-w-sm bg-white rounded-lg  overflow-hidden gap-5'>

                          <div className='w-full aspect-[4/5] bg-gray-200 relative'>
                            <span className='hidden md:inline-block absolute top-3 left-3 p-1 rounded-sm  bg-red-800 text-white '>{discountPercentage}%</span>
                            <img
                              src={item.mainImage}
                              alt='product'
                              className=' w-full h-full object-cover'
                            />

                          </div>
                          <div className='pt-4'>
                            <span className=' p-1 rounded-sm  bg-red-800 text-white md:hidden'>-25%</span>
                            <h2 className='text-lg font-semibold '>{item.name}</h2>
                            <span>${item.price} <span className='text-gray-400'><del>${item.discount}</del></span>  </span>

                          </div>
                        </div>

                        {/* <ProductItem  product={item} /> */}
                      </div>
                    )
                  }
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </div>



  )
}

export default NewArrival
