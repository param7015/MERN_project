import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const url = "https://mern-project-backend-tcyh.onrender.com"
    const admin_url = "https://mern-project-admin-y0zm.onrender.com/"

    const [cartitems, setcartitems] = useState({})
    const [token, settoken] = useState("")
    const [food_list, setfood_list] = useState([])


    // adding items to cart itemid as key and again click its value

    /*
    click Pizza (_id = "1")
        cartitems = {
            "1": 1               // new key genertaed as 1
        }
        click Pizza again
            cartitems = {
                "1": 2
            }
        click Burger
        
        cartitems = {
            "1": 2, // Pizza
            "2": 1  // Burger    // new key genertaed as 2
        }
    */
    const addtocart = async (itemid) => {
        if (!token) {
            toast.info("Please login to add items to cart")
            return
        }

        if (!cartitems[itemid]) {
            setcartitems((prev) => ({ ...prev, [itemid]: 1 }))
        }
        else {
            setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemid }, { headers: { token } })
        }
    }

    

    // removing the items from the cart
    const removefromcart = async (itemid) => {
        setcartitems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemid }, { headers: { token } })
        }
    }


    // getting the total amount of the items in the cart
    const gettotal = () => {
        let total = 0;
        for (const item in cartitems) {
            if (cartitems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item)
                total += iteminfo.price * cartitems[item]
            }
        }
        return total;
    }

    const [input, setinput] = useState("")

    const fetchfoodlist = async () => {
        const response = await axios.get(url + "/api/food/list")
        setfood_list(response.data.data)
    }

    const loadCartData = async (token) => {
        if (token) {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
            setcartitems(response.data.cart)
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchfoodlist()
            if (localStorage.getItem("token")) {
                settoken(localStorage.getItem("token"))
                // await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])






    const ContextValue = {
        food_list,
        cartitems,
        setcartitems,
        addtocart,
        removefromcart,
        gettotal,
        input,
        setinput,
        url,
        token,
        settoken,
        admin_url
    }


    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
