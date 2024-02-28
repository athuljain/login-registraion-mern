import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        console.log("Response from server:", response.data);
        setCart(response.data.cart);
        setError(null);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Error fetching cart. Please try again.");
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <h1>Cart Page</h1>
      {error && <p>{error}</p>}
      <ul>
        {cart.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
