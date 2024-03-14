


import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { myContext } from "../Context";

export default function SpecificProductPage() {
  const { productId } = useParams();
  const { specificProduct, setSpecificProduct, cartItems, setCartItems } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    // Check if the product is in the cart when the component mounts
    const isInCart = cartItems.some(item => item._id === productId);
    setInCart(isInCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const fetchSpecificProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/user/products/${productId}`,
        {
          withCredentials: true,
        }
      );
      setSpecificProduct(response.data.specificProduct);
    } catch (error) {
      console.error("Error fetching specific product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecificProduct();
  }, [productId]);

  // const addToCart = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:5000/user/products/cart/${productId}`,
  //       {},
  //       { withCredentials: true }
  //     );
  //     if (response.status === 200) {
  //       // Update cartItems state if the product is added to cart successfully
  //       setCartItems(prevItems => [...prevItems, specificProduct]);
  //       setInCart(true);
  //     }
  //   } catch (error) {
  //     console.error("Error adding product to cart:", error);
  //   }
  // };

  const addToCart = async () => {
    try {
      if (!inCart) {
        const response = await axios.post(
          `http://localhost:5000/user/products/cart/${productId}`,
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          // Update cartItems state if the product is added to cart successfully
          setCartItems(prevCartItems => [...prevCartItems, specificProduct]);
          setInCart(true);
          alert("Product added to cart");
        }
      } else {
        // If the product is already in cart, do nothing
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  
 
const removeFromCart = async () => {
  try {
    if (inCart) {
      const response = await axios.delete(
        `http://localhost:5000/user/products/cart/${productId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        // Update cartItems state if the product is removed from cart successfully
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
        setInCart(false);
        alert("Product removed from cart");
      }
    } else {
      // If the product is not in cart, do nothing
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};
  

  // const removeFromCart = async () => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:5000/user/products/cart/${productId}`,
  //       { withCredentials: true }
  //     );
  //     if (response.status === 200) {
  //       // Update cartItems state if the product is removed from cart successfully
  //       setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  //       setInCart(false);
  //     }
  //   } catch (error) {
  //     console.error("Error removing product from cart:", error);
  //   }
  // };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{specificProduct.title}</h1>
          <img src={specificProduct.image} alt="product" />
          <p>{specificProduct.description}</p>
          <p>{specificProduct.price}</p>
          {inCart ? (
            <button onClick={removeFromCart}>Remove from Cart</button>
          ) : (
            <button onClick={addToCart}>Add to Cart</button>
          )}
        </>
      )}
    </div>
  );
}
