"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";

const CheckoutPage = () => {
    const { carts } = useContext(GlobalContext); // ✅ Changed from cartItems to carts
    const router = useRouter();

    const [shippingDetails, setShippingDetails] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    };

    const handleCheckout = async () => {
        if (carts.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Ensure shipping details are filled
        for (const key in shippingDetails) {
            if (!shippingDetails[key]) {
                alert(`Please fill in the ${key} field.`);
                return;
            }
        }

        setLoading(true);

        try {
            console.log("Sending checkout request...", carts, shippingDetails);

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ carts, shippingDetails }),
            });

            const data = await res.json();
            console.log("Checkout Response:", data);

            if (res.ok && data.url) {
                window.location.href = data.url; // ✅ Redirect to Stripe checkout
            } else {
                alert(`Error: ${data.error || "Invalid checkout response"}`);
            }
    
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Failed to process checkout.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 text-black">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {/* Shipping Form */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
                <input type="text" name="name" placeholder="Full Name" value={shippingDetails.name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                <input type="email" name="email" placeholder="Email" value={shippingDetails.email} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                <input type="text" name="address" placeholder="Address" value={shippingDetails.address} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                <input type="text" name="city" placeholder="City" value={shippingDetails.city} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
                <input type="text" name="postalCode" placeholder="Postal Code" value={shippingDetails.postalCode} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>

            {/* Cart Summary */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                {carts.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {carts.map((item, index) => (
                            <li key={index} className="flex justify-between py-2 border-b">
                                <span>{item.name} x {item.qty}</span>
                                <span>${(item.price * item.qty).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Checkout Button */}
            <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                {loading ? "Processing..." : "Proceed to Payment"}
            </button>
        </div>
    );
};

export default CheckoutPage;