"use client";
import { GlobalContext } from "@/context";
import { useState, useEffect, useContext } from "react";

export default function Wishlist() {
    const { addCart, selectSize, SetSelectSize } = useContext(GlobalContext)
    const [wishlist, setWishlist] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        fetch("/api/wishlist", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setWishlist(data.wishlist));
    }, [token]);

    const removeFromWishlist = async (productId) => {
        try {
            const res = await fetch("/api/wishlist", {
                method: "DELETE",
                body: JSON.stringify({ productId }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (!res.ok) {
                throw new Error("Failed to remove item");
            }
    
            // ✅ Instead of replacing wishlist, filter out the deleted product
            setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== productId));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };
    

    return (
        <div className="max-w-2xl h-screen mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            {wishlist.length === 0 ? <p>No items in wishlist.</p> : (
                <div>
                    {wishlist.map((product) => (
                        <div key={product._id} className="flex justify-between items-center p-2 border-b">
                            <div>
                                <img src={product.mainImage} alt={product.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded" />
                                <p className=" w-[200px] text-wrap">{product.name}</p>
                                <p>${product.price}</p>
                               
                                <div className="inline-flex space-x-5">
                                    {product.sizes?.map((size) => {
                                        return (
                                            <button
                                                key={size}
                                                onClick={() => SetSelectSize(size)}
                                                className={` ${selectSize === size ? ' bg-black text-white' : "bg-white text-black"} w-5 h-5 text-sm rounded-sm border-2 border-gray-300`}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>

                            </div>
                            <div className="flex flex-col space-y-8">
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => removeFromWishlist(product._id)}
                                >
                                    Remove
                                </button>
                                <button onClick={() => { selectSize, addCart(product, selectSize), alert(`${product.name} ,"add successfully"`) }} className=' bg-black text-white px-3 py-1 rounded'>Add To Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}