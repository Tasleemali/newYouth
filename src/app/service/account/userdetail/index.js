'use client'

import { User, Mail,  } from "lucide-react"
import LogOut from "@/components/component-ui/logout"
import Link from "next/link"
import { useContext,  } from "react"
import { GlobalContext } from "@/context"


function UserDetailPage({user}) {
  
  const { IsAuth } = useContext(GlobalContext)
 
  console.log(user)

  return (
    <div className='bg-white text-black'>
      <div className='mx-auto max-w-screen-xl px-5 '>
        <div className="flex flex-col  bg-white">
          {IsAuth ?
            <div> <header className="px-4 lg:px-6 h-14 flex items-center border-b">
              <h1 className="text-2xl font-bold">Your Account Details</h1>
            </header>
              <main className="flex-1 p-4 lg:p-6">
                <div className="space-y-8">

                  <div className="flex items-center space-x-4">
                    <User className="h-6 w-6" />
                    <div>
                      <p className="text-lg font-bold">Name</p>
                      <p className="text-gray-500">{user?.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6" />
                    <div>
                      <p className="text-lg font-bold">Email</p>
                      <p className="text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  {/* logout */}
                  <LogOut />
                </div>
              </main>  </div> : <div className=" h-[400px] grid place-content-center "> <Link href="/service/login"> <button className=" bg-black text-white px-10 py-3 rounded-md">Get Your Account</button> </Link></div>}

        </div>
      </div>
    </div>
  )
}

export default UserDetailPage