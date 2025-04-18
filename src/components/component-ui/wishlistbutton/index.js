

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
    
     <button  className='bg-orange-400 py-2 px-3 rounded-md  font-semibold '
    onClick={() => addToWishlist(productId._id)} 

>
   {children}
</button>
    
  )
}

export default ButttonWishList
