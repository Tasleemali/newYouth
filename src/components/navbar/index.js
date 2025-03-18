"use client"

import { AlignLeftIcon,  LogIn,  Search,  ShoppingCart,  User,  X } from 'lucide-react'
import React, {  useContext, useState } from 'react'

import Link from 'next/link'
import Cart from '@/app/service/cart'
import { GlobalContext } from '@/context'





function Navbar() {
  const  [isMenuActive  , setIsMenuActive] = useState('home')
 const [menuOpen ,setMenuOpen] = useState(false)
 const [openCart ,setOpenCart] = useState(false)
  const [searchBarOpen ,setSearchBarOpen] =useState(false)
 const {IsAuth ,setIsAuth , query, setQuery } = useContext(GlobalContext)

  return (
    <nav className='bg-black text-white'>
      <div className='mx-auto max-w-screen-2xl px-5 md:px-20 py-3 md:py-6 '>
        <div className='  flex justify-between items-center '>

        {/* menu */}
        <div className='md:hidden'>
          <button onClick={()=>setMenuOpen(!menuOpen)}>

            {menuOpen? <X/> :<AlignLeftIcon className='w-7 h-7'/> }
          
          </button>
           
        </div>

{/* search */}
        {searchBarOpen && (
        <div className="fixed top-0 left-0 w-full py-3 md:py-6 bg-black text-white flex items-center justify-center z-50 p-4 shadow-lg">
          <form className="w-full max-w-lg flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 outline-none text-black"
            />
            <button type="submit" className="bg-black text-white px-4 py-2">
              <Search size={20} />
            </button>
            <button onClick={() => setSearchBarOpen(false)} className="ml-2 p-2 text-gray-600">
              <X size={24} />
            </button>
          </form>
        </div>
      )}

{/* logo */}
          <div className='text-center '>
          <Link href="/"> <span className=' self-center text-2xl md:text-4xl font-bold whitespace-nowrap '>You<span className='font-thin'>th</span></span></Link> 
          </div>

{/* navbar for big screen */}
   
<ul className='hidden md:flex justify-between items-center gap-10'>
 <Link href="/"> <li  value={'home'}  onClick={()=>{ setIsMenuActive('home'), setMenuOpen(false)}} className={`${isMenuActive === 'home'? 'border-b border-gray-300':null}`}>Home</li></Link>  
 <Link href="/clientpage/all-new-arrivals"> <li value={'new'}  onClick={()=>{ setIsMenuActive('new'), setMenuOpen(false)}} className={`${isMenuActive === 'new'? 'border-b border-gray-300':""}`}>New Arrivals</li> </Link> 
 <Link href='/clientpage/men'>  <li value={'men'}  onClick={()=>{ setIsMenuActive('men'), setMenuOpen(false)}} className={`${isMenuActive === 'men'? 'border-b border-gray-300':""}`}>Men</li></Link>
 <Link href='/clientpage/women'>  <li value={'women'}  onClick={()=>{ setIsMenuActive('women'), setMenuOpen(false)}} className={`${isMenuActive === 'women'? 'border-b border-gray-300':""}`}>Women</li></Link>
</ul>
{/* slide menu */}

<div className={` md:hidden fixed top-0 left-0 w-full h-full bg-black shadow-lg   transform ${menuOpen? "translate-x-0": "-translate-x-full"} transition-transform duration-300  ease-in-out z-50 `}>
  <button className='mx-5  px-5 py-5' onClick={()=>setMenuOpen(false)}> <X/></button>
 <ul className='px-5 mx-5 pt-10 font-semibold flex flex-col justify-center items-start space-y-8'>
 <Link href="/"> <li onClick={()=>setMenuOpen(false)}>Home</li></Link>  
 <Link href="/clientpage/all-new-arrivals"> <li onClick={()=>setMenuOpen(false)}>New Arrivals</li> </Link> 
  <Link href='/clientpage/men' >  <li onClick={()=>setMenuOpen(false)}>Men</li></Link>
  <Link href='/clientpage/women'>  <li onClick={()=>setMenuOpen(false)}>Women</li></Link>
    
     
 </ul>
 
 <div className='mx-5 px-5 py-5 w-full fixed bottom-0 '>
  <hr className='py-4 mr-10'/>
 {IsAuth? <Link href='/service/account'> <span onClick={()=>setMenuOpen(false)} className='inline-flex gap-2'> <User/> Account </span></Link>: <Link href='/service/login'> <span onClick={()=>setMenuOpen(false)} className='inline-flex gap-2'> <LogIn/> Login</span></Link>}
 
 </div>
</div>

{/* icon */}
<div className='flex justify-between items-center  gap-3 md:gap-10'>
    <span className='font-bold' onClick={()=>setSearchBarOpen(!searchBarOpen)} ><Search className=' font-bold w-6 h-6'/></span>
    <Link href="/service/account">    <span className='hidden md:inline-block'><User className='w-6 h-6'/></span></Link>
<span onClick={()=>setOpenCart(true)}><ShoppingCart className='w-6 h-6 hover:text-gray-300'/></span>
</div>


{/* cart */}
<div className={` rounded-lg md:pr-10  fixed top-0 right-0 w-full md:w-[600px]  transform ${openCart? "translate-x-0":"translate-x-full"} transition-transform duration-300  ease-in-out z-50`}>
<Cart setOpenCart={setOpenCart}/>
</div>

        </div >
     
      </div>

    
    </nav>
  )
}

export default Navbar
