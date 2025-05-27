import { createContext, useContext ,useState} from "react";
import { Provider } from "react-redux";


const cartItemContext = createContext()

export const CarItemProvider = ({children}) =>{
    const [cartProducts,setCartProducts] = useState([]) 
    const [cart,setCart] =useState({})
    const fetchCartItems = async() =>{
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart?userId=${userInfo._id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                }
            })
            const data = await response.json();
            if(data.message != "Cart not found"){
                setCart(data)
                setCartProducts(data.products)
            }
        } catch (error) {
            
        }
    }
    return (
        <cartItemContext.Provider value={{cartProducts, fetchCartItems,cart}}>
            {children}
        </cartItemContext.Provider>
    )
}

export const useCartItemContext =() => useContext(cartItemContext);