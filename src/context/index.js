'use client'
import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext(null)

export default function GlobalState({children}){
    const [selectSize , SetSelectSize] = useState('')
 const   [IsAuth ,setIsAuth] = useState(false) 
const  [query, setQuery] = useState('')
// this is for wishlist
    const [wishlist, setWishlist] = useState([]);
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    useEffect(() => {
        if (userId) {
            fetch(`/api/wishlist?userId=${userId}`)
                .then(res => res.json())
                .then(data => setWishlist(data.wishlist))
                .catch(error => console.error("Failed to load wishlist:", error));
        }
    }, [userId]);

    const addToWishlist = async (productId) => {
        if (!userId) return alert("Login required");

        try {
            const res = await fetch("/api/wishlist", {
                method: "POST",
                body: JSON.stringify({ userId, productId }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error(`Server Error: ${res.status}`);

            const data = await res.json();
            setWishlist(data.wishlist); // ✅ Fix
        } catch (error) {
            console.error("Failed to add to wishlist:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const removeFromWishlist = async (productId) => {
        if (!userId) return;

        try {
            const res = await fetch("/api/wishlist", {
                method: "DELETE",
                body: JSON.stringify({ userId, productId }), // ✅ Fix
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error(`Server Error: ${res.status}`);

            const data = await res.json();
            setWishlist(data.wishlist); // ✅ Fix
        } catch (error) {
            console.error("Failed to remove from wishlist:", error);
            alert("Something went wrong. Please try again.");
        }
    };
// this for cart
   const [carts ,setCarts] = useState([])

   const addCart = (item ,size) =>{
           setCarts((prev)=> {
            const existitem = prev.find((i)=> i._id === item._id)
            if(existitem){
                return  prev.map((i) => i._id === item._id? {...i , qty:i.qty+1} : i)
            }
            return [...prev ,{...item,size:size , qty:1} ]
           }
        )
   }
   const minusCart = (item) =>{
    setCarts((prev)=> {
     const existitem = prev.find((i)=> i._id === item._id)
     if(existitem){
         return  prev.map((i) => i._id === item._id? {...i , qty:i.qty-1} : i)
     }
     return [...prev ,{...item , qty:1} ]
    }
 )
}

   const removeCart =(item)=>{
    setCarts((prev)=> prev.filter((i)=> i._id !== item))
   }

return(
    <GlobalContext.Provider value={{IsAuth ,setIsAuth , query, setQuery ,carts ,setCarts ,addCart ,removeCart ,minusCart ,selectSize , SetSelectSize  ,  wishlist ,addToWishlist ,removeFromWishlist
    }}>
        {children}
    </GlobalContext.Provider>
)


}