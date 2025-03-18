"use client"
import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer';
import GlobalState from '@/context';
import { FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';
 
function CommonLayout({ children }) {
 
  return (
    <div>
      <GlobalState>

    
        <Navbar />
        
       {children}

       <Footer/>
   <Link href="/service/wishlist"> <FaRegHeart className='  text-red-600 fixed bottom-20 right-5 w-30 h-30 text-[50px]'/></Link>
       </GlobalState>
    </div>
  )
}

export default CommonLayout
