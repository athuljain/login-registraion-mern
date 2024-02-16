import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myContext } from "../Context";

export default function Cart() {
  const { userToken } = useContext(myContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/cart", {
          headers: {
            Authorization: `Bearer ${userToken}`, // Assuming you're using JWT for authorization
          },
        });
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userToken]); // Trigger fetchCart when userToken changes

  return (
    <div>
      <h1>Cart Page</h1>
      <ul>
        {cart.map((product) => (
          <li key={product._id}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
}
