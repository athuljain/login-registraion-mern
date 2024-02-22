// // import { useContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import { myContext } from "../Context";

// // export default function Cart() {
// //   const { userToken } = useContext(myContext);
// //   const [cart, setCart] = useState([]);

// //   useEffect(() => {
// //     const fetchCart = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:5000/user/cart", {
// //           headers: {
// //             Authorization: `Bearer ${userToken}`, // Assuming you're using JWT for authorization
// //           },
// //         });
// //         setCart(response.data.cart);
// //       } catch (error) {
// //         console.error("Error fetching cart:", error);
// //       }
// //     };

// //     fetchCart();
// //   }, [userToken]); // Trigger fetchCart when userToken changes

// //   return (
// //     <div>
// //       <h1>Cart Page</h1>
// //       <ul>
// //         {cart.map((product) => (
// //           <li key={product._id}>{product.name} - {product.price}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }


// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { myContext } from '../Context';

// export default function Cart() {
//     const { userToken } = useContext(myContext);
//     const [cart, setCart] = useState([]);
//     const [error, setError] = useState(null);


//     console.log("userToken:", userToken);
    


//     console.log("Cart",cart);

//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/user/cart', {
//                     headers: {
//                         Authorization: `Bearer ${userToken}`, // Assuming JWT-based authorization
//                     },
//                 });

//                 setCart(response.data.cart);
//             } catch (error) {
//                 console.error('Error fetching cart:', error);
//                 setError('Error fetching cart. Please try again later.');
//             }
//         };

//         fetchCart();
//     }, [userToken]);

//     return (
//         <div>
//             <h1>Cart Page</h1>
//             {error && <p className="error">{error}</p>}
//             {cart.length > 0 ? (
//                 <ul>
//                     {cart.map((product) => (
//                         <li key={product._id}>
//                             {product.name} - {product.price}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Your cart is currently empty.</p>
//             )}
//         </div>
//     );
// }


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
