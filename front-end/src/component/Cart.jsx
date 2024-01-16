import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myContext } from "../Context";

export default function Cart() {
  const { userToken } = useContext(myContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/cart", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userToken]);

  return (
    <div>
      <h1>Cart Page</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
