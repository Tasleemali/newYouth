 "use client"
import {  useSearchParams } from "next/navigation";
import { useEffect , useState } from "react";

export default function OrderSuccess() {
    // const router = useRouter()
    // const { orderId } = router.query;
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (orderId) {
            fetch(`/api/order/${orderId}`)
                .then(res => res.json())
                .then(data => {
                    setOrder(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [orderId]);
    if (loading) return <p>Loading order details...</p>;
    if (!order) return <p className="text-red-500">Order not found!</p>;
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-green-600">Payment Successful!</h2>
            {order && (
                <div className="mt-4">
                    <h3 className="font-bold">Order Details:</h3>
                    <p>Name: {order.shippingDetails.name}</p>
                    <p>Address: {order.shippingDetails.address}, {order.shippingDetails.city}</p>
                    <p>Phone: {order.shippingDetails.phone}</p>
                    <p className="mt-2 font-bold">Items:</p>
                    <ul>
                        {order.items.map((item, i) => (
                            <li key={i}>{item.name} - {item.qty} pcs</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}