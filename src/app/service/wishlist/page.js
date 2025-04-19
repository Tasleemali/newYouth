"use client";
import { GlobalContext } from "@/context";
import { useState, useEffect, useContext } from "react";

export default function Wishlist() {
    const { addCart, selectSize, SetSelectSize } = useContext(GlobalContext);
    const [wishlist, setWishlist] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

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

            setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== productId));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleAddCart = (product) => {
        if (selectSize) {
            addCart(product, selectSize);
            alert(`${product.name} added successfully`);
            SetSelectSize(null);
        } else {
            alert("Please select a size");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 md:p-6 bg-white text-black shadow-md rounded overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No items in wishlist.</p>
            ) : (
                <div className="space-y-6">
                    {wishlist.map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border rounded-md shadow-sm space-y-4 md:space-y-0"
                        >
                            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                <img
                                    src={product.mainImage}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold text-lg">{product.name}</p>
                                    <p className="text-gray-600">${product.price}</p>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {product.sizes?.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => SetSelectSize(size)}
                                                className={`px-2 py-1 text-sm rounded border ${
                                                    selectSize === size
                                                        ? "bg-black text-white border-black"
                                                        : "border-gray-300"
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col gap-3">
                                <button
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                                    onClick={() => removeFromWishlist(product._id)}
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() => handleAddCart(product)}
                                    className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
