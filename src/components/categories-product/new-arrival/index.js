"use client"
import React, { useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { GlobalContext } from '@/context'
function NewArrival() {
  const router = useRouter()
  const [product, setProduct] = useState([])

  const { query } = useContext(GlobalContext)
  const [like, setLike] = useState(false)


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

  return (
    <div className="relative text-black">
      <h1 className=" mt-5 text-2xl font-bold flex  justify-center items-center gap-1"> New
        <span className="bg-black text-white px-3 py-1 rounded skew-x-[-10deg] inline-block">
          Arrivals
        </span>
      </h1>
      {/* Scrollable Container */}
      <div className=" mt-5 flex overflow-x-scroll  no-scrollbar space-x-4 p-4">
        {product.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).map((product) => {

          if (product.newArrival === true) {

            let discountPercentage = 0;
            if (product.discount && product.price) {
              discountPercentage = Math.round(
                ((product.discount - product.price) / product.discount) * 100
              );
            }
            return (
              <div
                key={product._id}
                onClick={() => { router.push(`/service/productdetails/${product._id}`) }}
                className="bg-white text-black rounded-2xl  min-w-[250px] max-w-[400px]  overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative text-black">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="h-72 w-full object-cover rounded-xl"
                  />
                  {/* Discount Tag (If applicable) */}
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      -{discountPercentage}%
                    </span>
                  )}
                  {/* Wishlist Icon */}

                </div>
                {/* Product Details */}
                <h2 className="mt-2 text-sm font-semibold">{product.name}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-black">
                    ₹{product.price}
                  </span>
                  {product.discount && (
                    <span className="text-gray-500 text-sm line-through">
                      ₹{product.discount}
                    </span>
                  )}
                </div>
              </div>
            )
          }

        })}
      </div>
    </div>

  )
}

export default NewArrival



