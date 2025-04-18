'use client'
import React, { useContext, useState } from 'react'
import CheckoutButton from '@/components/component-ui/checkoutbutton';
import { GlobalContext } from '@/context';
export default function Checkout( ) {

    const { carts } = useContext(GlobalContext);
  const totalAmount = carts.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto text-black">
      <input className="w-full border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border p-2" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
      <textarea className="w-full border p-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      
     <CheckoutButton totalAmount={totalAmount} carts={carts} name={name} email={email} contact={contact} address={address}/> 
    </div>
  );
}
