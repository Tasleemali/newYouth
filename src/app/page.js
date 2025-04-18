"use client"

import { useState, useEffect } from 'react'
import ImageSlider from "../components/component-ui/imageSlider"
import ForHim from "@/components/categories-product/for-him"
import ForHer from "@/components/categories-product/for-her"
import Features from "../components/component-ui/features"
import SubscribeSection from "@/components/component-ui/subscribe-ui"
import NewArrival from "@/components/categories-product/new-arrival"
import { motion } from 'framer-motion'

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-72 bg-gray-200 rounded-lg mb-6"></div> {/* image slider Skeleton */} 
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {Array(4).fill('').map((_, index) => (
          <div key={index} className="w-full bg-gray-200 rounded-lg h-64"></div> // Product Skeleton 
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
        {Array(4).fill('').map((_, index) => (
          <div key={index} className="w-full bg-gray-200 rounded-lg h-32"></div> // Feature Skeleton 
        ))}
      </div>
      <div className="w-full h-12 bg-gray-200 rounded-lg"></div> {/* Subscribe Section Skeleton */}
    </div>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false)
    }, 2000) // 2 seconds delay for demo
  }, [])

  return (
    <div className="bg-white text-black">
      <div className="py-5 mx-auto max-w-screen-2xl px-5">
        <div>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <ImageSlider />
              <NewArrival />
              <ForHim />
              <ForHer />
              <Features />
              <SubscribeSection />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
