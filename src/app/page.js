"use client"

import ImageSlider from "../components/component-ui/imageSlider";

import ForHim from "@/components/categories-product/for-him";
import ForHer from "@/components/categories-product/for-her";
import Features from "../components/component-ui/features";
import SubscribeSection from "@/components/component-ui/subscribe-ui";
import NewArrival from "@/components/categories-product/new-arrival";

export default function Home() {
  return (
    <div className="bg-white text-black ">
    
      <div className="mt-5 mx-auto max-w-screen-2xl px-5  ">
    
        <div>
        <ImageSlider/>
       <NewArrival/>
       <ForHim/>
       <ForHer/>
       <Features/>
       <SubscribeSection/>
        
        </div>
       

      </div>
      
    </div>
  );
}
