// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Cart() {
//   const [cart, setCart] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/user/cart");
//         console.log("Response from server:", response.data);
//         setCart(response.data.cart);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//         setError("Error fetching cart. Please try again.");
//       }
//     };

//     fetchCart();
//   }, []);

//   return (
//     <div>
//       <h1>Cart Page</h1>
//       {error && <p>{error}</p>}
//       <ul>
//         {cart.map((product) => (
//           <li key={product._id}>
//             {product.name} - {product.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/cart", {
          withCredentials: true // Include credentials (cookies) in the request
        });
        console.log("Response from server:", response.data);
        const cartIds = response.data.cart;
        const cartProducts = await Promise.all(cartIds.map(fetchProductDetails));
        setCart(cartProducts);
        setError(null);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Error fetching cart. Please try again.");
      }
    };

    fetchCart();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${productId}`);
      return response.data; // Return the product details
    } catch (error) {
      console.error(`Error fetching product details for ID ${productId}:`, error);
      // If there's an error fetching product details, return null
      return null;
    }
  };

  return (
    <div>
      <h1>Cart Page</h1>
      {error && <p>{error}</p>}
      <ul>
        {cart.map((product) => (
          <li key={product._id}>
            {product ? `${product.title} - ${product.price}` : "Product details not available"}
          </li>
        ))}
      </ul>
    </div>
  );
}
