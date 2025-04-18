'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const initialRegister = {
  username: '',
  email: '',
  password: '',
};

export default function SignupPage() {
  const [registerFormData, setRegisterFormData] = useState(initialRegister);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(registerFormData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (res.ok) {
      setLoading(false);
      alert('Signup successful! Please login.');
      router.push('/service/login');
    } else {
      alert(data.error);
      setLoading(false);
      setRegisterFormData(initialRegister);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-200">
        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto" />

            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/4" />
              <div className="h-10 bg-gray-300 rounded w-full" />
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/4" />
              <div className="h-10 bg-gray-300 rounded w-full" />
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/4" />
              <div className="h-10 bg-gray-300 rounded w-full" />
            </div>

            <div className="h-10 bg-gray-300 rounded w-full mt-2" />

            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-4" />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  value={registerFormData.username}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      username: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={registerFormData.email}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={registerFormData.password}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      password: e.target.value,
                    })
                  }
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
              Already have an account?{' '}
              <a
                href="/service/login"
                className="text-blue-500 hover:underline"
              >
                Login
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
