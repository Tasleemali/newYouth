'use client'
import { createContext,  useState , useEffect} from "react";


export const GlobalContext = createContext(null)

export default function GlobalState({children}){
    const [selectSize , SetSelectSize] = useState(null)
 const   [IsAuth ,setIsAuth] = useState(false) 
const  [query, setQuery] = useState('')


const [loadingAuth, setLoadingAuth] = useState(true); // 🆕

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setIsAuth(true); // ✅ token mila toh auth true
  } else {
    setIsAuth(false);
  }
  setLoadingAuth(false); // ✅ hydration complete
}, []);
   
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
    <GlobalContext.Provider value={{IsAuth ,setIsAuth ,loadingAuth, query, setQuery ,carts ,setCarts ,addCart ,removeCart ,minusCart ,selectSize , SetSelectSize  
    }}>
        {children}
    </GlobalContext.Provider>
)


}
