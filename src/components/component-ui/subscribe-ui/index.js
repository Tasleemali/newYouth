'use client';

import { useState } from 'react';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
  };

  return (
    <div className=" mb-10 bg-gray-100 p-8 rounded-lg w-full flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-gray-900">Subscribe to YOUTH Wardrobe Wisdom</h2>
      <p className="text-gray-600 mt-2">Invite customers to subscribe for early sale access, new in, promotions, and more.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex w-full max-w-md">
        <input
          type="email"
          className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-800 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
