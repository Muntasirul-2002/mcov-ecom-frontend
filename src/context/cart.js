import {useState, useContext, createContext, useEffect} from 'react';
import { axiosInstance, getConfig } from '../utils/urlRequest';

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const fetchCartProducts = async (userID) => {
        try {
            await getConfig()
            const response = await axiosInstance.post('/api/v1/product/cart/get-product', {
                userID: userID,
            });
            console.log(response.data.cart);
            setCart(response.data.cart);
            localStorage.setItem('cart', JSON.stringify(response.data.cart));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const data = localStorage.getItem('auth');
        const userData = JSON.parse(data);
        const userID = userData?.user?.userID;
        console.log(userID);
        fetchCartProducts(userID);
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook
const useCart = () => useContext(CartContext);

export {useCart, CartProvider};
