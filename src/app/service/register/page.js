 'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { RegisterAction } from '@/action';
const intialRegister ={
  username:'',
  email:'',
  password:"",
}
export default function SignupPage() {

const [registerFormData ,setRegisterFormData] =useState(intialRegister)

  const [loading, setLoading] = useState(false);
  const router = useRouter();
console.log(registerFormData)




const handleSubmit = async (e) => {
  setLoading(true)
  e.preventDefault();
  const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(registerFormData),
      headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (res.ok) {
    setLoading(false)
      alert("Signup successful! Please login.");
      router.push("service/login");
  } else {
      alert(data.error);
      setLoading(false);
      setRegisterFormData(intialRegister)
  }
};

  return (
    <div className='bg-white text-black'>
    <div className='mx-auto max-w-screen-2xl px-5 '>
    <div className="flex items-center justify-center min-h-[600px] bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={registerFormData.username}
              onChange={(e) => setRegisterFormData({ ...registerFormData , username:e.target.value})}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>


          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={registerFormData.email}
              onChange={(e) => setRegisterFormData({...registerFormData ,email:e.target.value})}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={registerFormData.repassword}
              onChange={(e) => setRegisterFormData({...registerFormData ,password:e.target.value})}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-slate-950 text-white py-2 rounded hover:bg-black transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/service/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
    </div>
    </div>

  );
}


