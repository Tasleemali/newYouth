"use client"
import { useState ,useEffect } from 'react';
import React from 'react'
import UserDetailPage from './userdetail'
import LoadingSkeleton from '@/components/component-ui/skeleton/accountSkeleton';

  function Account() {
  const [user, setUser] = useState(null);
  const [loading ,setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const token =sessionStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchUser();
  }, []);

  if(loading ) {
    return(
        <LoadingSkeleton/>
    )
  }
  return (
    <div>
      <UserDetailPage user={user}/>
    </div>
  )
}

export default Account
