'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlobalContext } from "@/context";
import { set } from 'mongoose';

const IntialLoginForm = {
  email: '',
  password: ''
};

export default function LoginPage() {
  const { IsAuth, setIsAuth } = useContext(GlobalContext);
  const [loginFormData, setLoginFormData] = useState(IntialLoginForm);
  const [loading, setLoading] = useState(false);
  const [isLoading , setIsLoading] = useState(true)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginFormData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setIsAuth(true);
      alert("Login successful!");
      router.push("/");
    } else {
      alert(data.error);
      setLoginFormData(IntialLoginForm);
    }

    setLoading(false);
  };
    
useEffect(()=> {
   setTimeout(()=>{
    setIsLoading(false)
  },2000)
},[])

  return (
    <div className="bg-white text-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-200">
        {isLoading ? (
          <div className="animate-pulse space-y-5">
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-10 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded mt-4" />
            <div className="h-10 bg-gray-300 rounded" />
            <div className="h-10 bg-gray-300 rounded mt-4" />
          </div>
        ) : (
          <>
            <h2 className=" text-2xl md:text-3xl font-bold text-center mb-6">Login </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginFormData.email}
                  onChange={(e) =>
                    setLoginFormData({ ...loginFormData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={loginFormData.password}
                  onChange={(e) =>
                    setLoginFormData({ ...loginFormData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-2 rounded-md font-semibold hover:bg-black transition disabled:opacity-60"
                disabled={loading}
              >{loading? "Logging..":"Login"}
              
              </button>
            </form>

            <div className="text-center mt-5">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/service/register" className="text-blue-500 hover:underline">Sign up</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
