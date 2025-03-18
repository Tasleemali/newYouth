

function ButttonWishList({productId , children ,className}) {
    const addToWishlist = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) return alert("Login required");
    
        const res = await fetch("/api/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
    
        const data = await res.json();
        alert(data.message);
    };
  return (
    
     <button  className={`${className}`} 
    onClick={() => addToWishlist(productId._id)} 

>
   {children}
</button>
    
  )
}

export default ButttonWishList
