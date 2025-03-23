"use client"

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SubscribeSection from "@/components/component-ui/subscribe-ui";
import { GlobalContext } from "@/context";
import Link from "next/link";
import ButttonWishList from "@/components/component-ui/wishlistbutton";
const ProductDetail = () => {

  const { id } = useParams()
  const [showImage, setShowImage] = useState()
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [releted ,setReleted] = useState([])

  const { wishlist, selectSize, SetSelectSize, addCart } = useContext(GlobalContext)


  console.log(wishlist)
  // console.log(selectSize)

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/get/${id}`);

        if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);

        const data = await res.json();
        setProduct(data);

        // ✅ Set default image (First image from array OR single image field)
        setShowImage(data.extraImages?.[0] || data.extraImages || "/placeholder.jpg");
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
// rleted
   useEffect(() => {
      async function fetchProducts() {
        try {
          const res = await fetch("/api/products/get");
          const data = await res.json();
          setReleted(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
  
      fetchProducts();
    },[]);
console.log("relted", releted)
console.log("product",product)
  return (

    <div className='bg-white text-black'>
      <div className='mx-auto max-w-screen-xl py-10'>
        <div className=' h-auto px-5  grid grid-cols-1 place-items-center items-start md:grid-cols-2 gap-10'>
          {/* img */}
          <div>
            <div>
              <img src={showImage} alt='img' className='w-96 md:w-auto' />
            </div>

            <div className=' py-5 flex justify-center md:justify-start  items-center gap-5'>
              {product?.extraImages.map((item, index) => (
                <div >
                  <img key={index} onClick={() => { setShowImage(item) }} className={` w-20 h-auto ${showImage === item ? "border-2 border-black" : ''}`} src={item} alt={`Thumbnail ${index}`} />
                </div>)
              )}
            </div>
          </div>

          {/* details */}
          <div className=''>
            <div className='flex flex-col justify-start items-start space-y-5'>
              <h1 className='font-semibold md:text-3xl'>{product?.name}</h1>
              <p className='text-gray-500'>₹{product?.price} <span>MRP₹ <del>{product?.discount} </del>(Price inclusive of all taxes)</span></p>
              <p className='text-gray-500' >💳 Additional 10% discount on Orders Above ₹999</p>
              <p className='text-gray-500'>Discount automatically applied at checkout</p>
              {/* size */}
              <h1 className='font-semibold'>Size:</h1>
              <div className=' py-2 flex justify-between items-center gap-5'>
                {product?.sizes.map((size, index) => (

                  <button key={index} onClick={() => SetSelectSize(size)} className={` ${selectSize === size ? ' bg-black text-white' : "bg-white text-black"} w-10 h-10 rounded-sm border-2 border-gray-300`}>{size}</button>

                ))}
              </div>

              {/* checkout  */}
              <div className='w-full '>
                <button onClick={() => { selectSize, addCart(product, selectSize), alert(`${product?.name} ,"add successfully"`) }} className=' h-10 w-full bg-black text-white font-semibold'>Add To Cart</button>
              </div>
              {/* wishlist */}
              <div className=' w-full  text-center'>
                <ButttonWishList className='bg-gray-300 border-2 border-black py-3 px-3 rounded-md hover:bg-black hover:text-white' productId={product}>Add To Wish List</ButttonWishList>
              </div>
              {/*  discription */}

              <div className='text-wrap  space-y-5  text-gray-500 text-sm'>
                <h1 className='font-semibold'>Product Description</h1>
                <p className='text-wrap text-gray-500 text-sm'>
                  {product?.description}
                </p>

                <h2 className=' text-wrap font-semibold  text-gray-500 text-sm'>Marketed And Imported By:<span className='text-xs text-gray-500'>Noize Brands Lifestyle Limited</span> </h2>

                <p className='text-wrap  text-gray-500 text-sm'>
                  (erstwhile SPM Brands Fashion Private Limited), Plot No. 129, Sector 136, off Noida-Greater Noida Expressway, Noida, Uttar Pradesh - 201304.
                </p>

                <h2 className='font-semibold'>Country of Origin:<span className='text-xs text-gray-500'>India</span> </h2>
              </div>
            </div>
          </div>
        </div>
{/* releted  */}

   
<h1 className=" mt-5 text-2xl font-bold flex  justify-center items-center gap-1"> Releted
            <span className="bg-black text-white px-3 py-1 rounded skew-x-[-10deg] inline-block">
              Products
            </span>
          </h1>
<div className=" py-10 px-5  flex  overflow-x-scroll no-scrollbar space-x-4 p-4">
  { product && releted.map((item ,index) => {
    if (
      product.category === item.category 
    ) {
      return (
        <div  key={index} onClick={() => router.push(`/service/productdetails/${item._id}`)}
        className=" min-w-[250px] md:max-w-[400px]">
                 
                    <div className=''>
                       {/* <span className='hidden md:inline-block absolute top-3 left-3 p-1 rounded-sm  bg-red-800 text-white '>{discountPercentage}%</span> */}
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
      );
    }
  })}
</div>



          {/* subscription */}
          <div className='py-10 px-5'>
          <SubscribeSection />
        </div>

      </div>

    </div>
  )
}

export default ProductDetail


