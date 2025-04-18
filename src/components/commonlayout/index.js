"use client"
import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer';
import GlobalState from '@/context';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';
import { Heart } from 'lucide-react';
 
function CommonLayout({ children }) {
 
  return (
    <div>
      <GlobalState>

    
        <Navbar />
        
       {children}

       <Footer/>
        </GlobalState>
    </div>
  )
}

export default CommonLayout
