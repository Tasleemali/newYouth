"use client";
import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SubscribeSection from "@/components/component-ui/subscribe-ui";
import { GlobalContext } from "@/context";
import ButttonWishList from "@/components/component-ui/wishlistbutton";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [showImage, setShowImage] = useState();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [releted, setReleted] = useState([]);

  const { selectSize, SetSelectSize, addCart } = useContext(GlobalContext);

  // Loading the product data
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/get/${id}`);

        if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);

        const data = await res.json();
        setProduct(data);
        setLoading(false);

        setShowImage(data.extraImages?.[0] || data.extraImages || "/placeholder.jpg");
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading related products
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products/get");
        const data = await res.json();
        setReleted(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleCart= ()=>{
    if(selectSize){
      selectSize;
      SetSelectSize()
      addCart(product, selectSize);
      alert(`${product?.name} ,"added successfully"`);
    }else{
      alert("please select size")
    }
      
  }
  return (
    <div className="bg-white text-black">
      <div className="mx-auto max-w-screen-2xl">
        <div className="py-10 h-auto px-5 grid grid-cols-1 place-items-center items-start md:grid-cols-2 gap-10">
          {/* Image Skeleton */}
          <div className={`relative ${loading ? "animate-pulse" : ""}`}>
            {loading ? (
              <div className="bg-gray-300 h-[400px] w-[400px] rounded-md"></div>
            ) : (
              <img src={showImage} alt="img" className="w-96 md:w-auto" />
            )}
            <div className="py-5 flex justify-center md:justify-start items-center gap-5">
              {loading ? (
                <>
                  <div className="bg-gray-300 h-20 w-20 rounded-md"></div>
                  <div className="bg-gray-300 h-20 w-20 rounded-md"></div>
                  <div className="bg-gray-300 h-20 w-20 rounded-md"></div>
                </>
              ) : (
                product?.extraImages.map((item, index) => (
                  <div key={index}>
                    <img
                      onClick={() => {
                        setShowImage(item);
                      }}
                      className={`w-20 h-auto ${showImage === item ? "border-2 border-black" : ""}`}
                      src={item}
                      alt={`Thumbnail ${index}`}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Details Skeleton */}
          <div className={`flex flex-col justify-start items-start space-y-4 ${loading ? "animate-pulse" : ""}`}>
            {loading ? (
              <>
                <div className="bg-gray-300 h-10 w-60 rounded-md"></div>
                <div className="bg-gray-300 h-8 w-32 rounded-md"></div>
                <div className="bg-gray-300 h-8 w-60 rounded-md"></div>
                <div className="bg-gray-300 h-8 w-40 rounded-md"></div>
              </>
            ) : (
              <>
                <h1 className="font-semibold md:text-3xl">{product?.name}</h1>
                <p className="text-gray-500">
                  ₹{product?.price} <span>MRP₹ <del>{product?.discount}</del> (Price inclusive of all taxes)</span>
                </p>
                <p className="text-gray-500">💳 Additional 10% discount on Orders Above ₹999</p>
                <p className="text-gray-500">Discount automatically applied at checkout</p>

                {/* Size */}
                <h1 className="font-semibold">Size:</h1>
                <div className="py-2 flex justify-between items-center gap-5">
                  {product?.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => SetSelectSize(size)}
                      className={`${selectSize === size ? "bg-black text-white" : "bg-white text-black"
                        } w-10 h-10 rounded-sm border-2 border-gray-300`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Checkout */}
                <div className="w-full">
                  <button
                    onClick={handleCart
                    }
                    className="w-full py-4 bg-black text-white font-semibold rounded-lg"
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Wishlist */}
                <div className="w-full text-center">
                  <ButttonWishList
                    className="bg-gray-300 border-2 border-black py-3 px-3 rounded-md hover:bg-black hover:text-white"
                    productId={product}
                  >
                    Add To Wish List
                  </ButttonWishList>
                </div>

                {/* Description */}
                <div className="text-wrap space-y-5 text-gray-500 text-sm">
                  <h1 className="font-semibold">Product Description</h1>
                  <p className="text-wrap text-gray-500 text-sm">{product?.description}</p>
                  <h2 className="text-wrap font-semibold text-gray-500 text-sm">
                    Marketed And Imported By:
                    <span className="text-xs text-gray-500">Noize Brands Lifestyle Limited</span>
                  </h2>
                  <p className="text-wrap text-gray-500 text-sm">
                    (erstwhile SPM Brands Fashion Private Limited), Plot No. 129, Sector 136, off Noida-Greater Noida Expressway, Noida, Uttar Pradesh - 201304.
                  </p>
                  <h2 className="font-semibold">
                    Country of Origin:
                    <span className="text-xs text-gray-500">India</span>
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Related Products Skeleton */}
        {loading ? <h1 className=" bg-gray-300 mt-5 text-2xl font-bold flex justify-center items-center gap-1"></h1> : <h1 className="mt-5 text-2xl font-bold flex justify-center items-center gap-1">
          Related
          <span className="bg-black text-white px-3 py-1 rounded skew-x-[-10deg] inline-block">Products</span>
        </h1>}

        <div className="py-10 px-5 flex overflow-x-scroll no-scrollbar space-x-4">
          {loading ? (
            <>
              <div className="bg-gray-300 h-[300px] w-[250px] rounded-md"></div>
              <div className="bg-gray-300 h-[300px] w-[250px] rounded-md"></div>
              <div className="bg-gray-300 h-[300px] w-[250px] rounded-md"></div>
            </>
          ) : (
            !loading && product && releted?.length > 0 &&
            releted.filter((item) => item.category === product.category)
              .map((item, index) => (
                <div
                  key={index}
                  onClick={() => router.push(`/service/productdetails/${item._id}`)}
                  className="bg-white text-black rounded-2xl min-w-[250px] md:min-w-[300px] max-w-[300px] overflow-hidden cursor-pointer p-3"
                >
                  <div className="relative text-black">
                    <div className=" relative ">
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="h-80 w-auto object-cover rounded-xl"
                      />
                    </div>

                    <div className="pt-4">
                      <span className="p-1 rounded-sm bg-red-800 text-white md:hidden">-25%</span>
                      <h2 className="text-lg font-semibold w-full line-clamp-2 break-words">{item.name}</h2>
                      <span className="block text-base">
                        ₹{item.price}{" "}
                        <span className="text-gray-400">
                          <del>₹{item.discount}</del>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Subscription Section Skeleton */}
        <div className="py-10 px-5">
          {loading ? (
            <div className="bg-gray-300 h-10 w-40 rounded-md mx-auto"></div>
          ) : (
            <SubscribeSection />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
