"use client"

import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
  
function LogOut(){
  const {IsAuth ,setIsAuth} = useContext(GlobalContext)
  const router = useRouter()
const logout = () => {
  localStorage.removeItem("token"); // Remove JWT token
  router.push("/service/login"); // Redirect to login page
  setIsAuth(false)
}
  return (
    <div>
        {IsAuth?
 <button className= ' py-3 bg-black  rounded-md text-white w-full'  onClick={logout}>LogOut</button>:null
        }
     
    </div>
  )
}

export default LogOut