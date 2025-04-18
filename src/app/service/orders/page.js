"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

function Order() {
  const [userId, setUserId] = useState('')
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        setUserId(payload.userId)
      } catch (error) {
        console.error("Invalid user", error)
      }
    }
  }, [])

  const fetchOrder = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      const data = await res.json()
      if (data.success) {
        setOrders(data.orders)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log('Fetching order failed')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userId) fetchOrder()
  }, [userId])

  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch("/api/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      })
      const data = await res.json()
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId ? { ...order, status: "Cancelled" } : order
          )
        )
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log('Cancel order failed')
    }
  }

  const OrderSkeleton = () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6 animate-pulse bg-gray-300 w-1/3 h-6 rounded mx-auto"></h1>
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 bg-gray-100 rounded-lg animate-pulse">
          <div className="h-4 bg-gray-300 w-1/3 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 w-1/4 mb-4 rounded"></div>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
              <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
              <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
            </div>
          </div>
          <div className="mt-4 h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-white text-black">
      <div className="container max-w-screen-2xl mx-auto p-6">
        {isLoading ? (
          <OrderSkeleton />
        ) : orders.length === 0 ? (
          <div>
            <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
            <p>No orders found.</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
            <div className="grid gap-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-lg font-semibold">Order ID: {order.orderId}</h2>
                  <p className="text-gray-500">Total: ₹{order.totalAmount}</p>
                  <p className="text-gray-500">Status: {order.status}</p>
                  <div className="mt-4 space-y-4">
                    {order.products.map((product) => (
                      <div key={product._id} className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 md:w-56 h-auto rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-md font-medium">{product.name}</h3>
                          <p className="text-gray-600">Qty: {product.qty}</p>
                          <p className="text-gray-600">Size: {product.size}</p>
                          <p className="text-gray-600">₹{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {order.status !== "Cancelled" && (
                    <button
                      onClick={() => cancelOrder(order.orderId)}
                      className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
