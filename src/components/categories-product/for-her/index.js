"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";

function ForHer() {
  const router = useRouter();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState("Top");
  const { query } = useContext(GlobalContext);

  useEffect(() => {
    setLoading(true);
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products/get");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white text-gray-400 grid place-items-center h-40">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="relative text-black">
      {/* Title & Filter */}
      <div className="pt-5 space-y-2">
        <h1 className="text-2xl font-bold flex justify-center items-center gap-1">
          For
          <span className="bg-black text-white px-3 py-1 rounded skew-x-[-10deg] inline-block">
            Women
          </span>
        </h1>
        <ul className="mt-[-15px] text-[10px] md:text-sm flex justify-center items-center gap-5">
          <li
            className={`cursor-pointer ${
              subCategory === "Top" ? "font-semibold underline" : ""
            }`}
            onClick={() => setSubCategory("Top")}
          >
            WOMEN'S TOPWEAR
          </li>
          <li
            className={`cursor-pointer ${
              subCategory === "Bottom" ? "font-semibold underline" : ""
            }`}
            onClick={() => setSubCategory("Bottom")}
          >
            WOMEN'S BOTTOMWEAR
          </li>
        </ul>
      </div>

      {/* Scrollable Product Cards */}
      <div className="mt-5 flex overflow-x-scroll no-scrollbar space-x-4 p-4">
        {product
          .filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((product) => {
            if (
              product.subcategory === subCategory &&
              product.category === "Women"
            ) {
              let discountPercentage = 0;
              if (product.discount && product.price) {
                discountPercentage = Math.round(
                  ((product.discount - product.price) / product.discount) * 100
                );
              }

              return (
                <div
                  key={product._id}
                  onClick={() => router.push(`/main/${product._id}`)}
                  className="bg-white rounded-2xl min-w-[250px] max-w-[400px] overflow-hidden shadow hover:shadow-md cursor-pointer transition-all"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="h-80 w-full object-cover rounded-xl"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                        -{discountPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-2">
                    <h2 className="text-sm font-semibold truncate">
                      {product.name}
                    </h2>
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
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default ForHer;
