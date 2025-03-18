"use client"
import React, { useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'


import { useState ,useEffect } from 'react'
import { Heart } from 'lucide-react'
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
function ForHer() {
  const router = useRouter()
    const [product ,setProduct] = useState([])
    const [subCategory ,setSubCategory] = useState('Top')
      const {  query } = useContext(GlobalContext)

   

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


    
      const discount =(
        ((product.discount - product.price)/ product.discount)*100).toFixed(2);

      

      

  return (
    <div className="relative text-black">
  
<div className='pt-5 space-y-2'>
<h1 className="  text-2xl font-bold flex  justify-center items-center gap-1"> For
            <span className="bg-black text-white px-3 py-1 rounded skew-x-[-10deg] inline-block">
              Men
            </span>
          </h1>
 <ul className='  mt-[-15px] text-[10px] md:text-sm  flex justify-center items-center gap-5 '>
    <li value={'Top'} onClick={()=>setSubCategory('Top')}>MEN'S TOPWEAR</li>
 <li value={'Bottom'} onClick={()=>setSubCategory('Bottom')}>MENS'S BOTTOMWEAR</li>

  </ul>    </div>

    {/* Scrollable Container */}
    <div className=" mt-5 flex overflow-x-scroll  no-scrollbar space-x-4 p-4">
      {product.filter((item)=> item.name.toLowerCase().includes(query.toLowerCase())).map((product) =>{ 

       if(product.subcategory === subCategory && product.category === 'Women'){

        let discountPercentage = 0;
        if (product.discount && product.price) {
          discountPercentage = Math.round(
            ((product.discount - product.price) / product.discount) * 100
          );
        }
return(
  <div
  key={product._id}
  onClick={() => { router.push(`/service/productdetails/${product._id}`)} }
  className="bg-white rounded-2xl  min-w-[250px] max-w-[400px]  overflow-hidden"
>
  {/* Product Image */}
  <div className="relative">
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

export default ForHer