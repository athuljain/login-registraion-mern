


// Home.jsx

import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";
import "./Style/Home.css";

export default function Home() {
  const { products, setProducts, cartItems, setCartItems } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/user/getProducts",
        {
          withCredentials: true,
        }
      );
      // Initialize inCart property for each product
      const updatedProducts = response.data.allProducts.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id) // Check if the product is in the cart
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [setProducts, cartItems]);

  // const handleAddToCart = async (productId) => {
  //   try {
  //     if (cartItems.includes(productId)) {
  //       // If the product is already in the cart, remove it
  //       await removeFromCart(productId);
  //       setCartItems(prevCartItems => prevCartItems.filter(id => id !== productId));
  //       alert("Product removed from cart");
  //     } else {
  //       // If the product is not in the cart, add it
  //       await addToCart(productId);
  //       setCartItems(prevCartItems => [...prevCartItems, productId]);
  //       alert("Product added to cart");
  //     }
  //     // Refresh products after adding to or removing from cart
  //     fetchProducts();
  //   } catch (error) {
  //     console.error("Error adding to/removing from cart:", error);
  //     alert("Error adding/removing product to/from cart");
  //   }
  // };

  const handleAddToCart = async (productId, inCart) => {
    try {
      if (inCart) {
        // If the product is already in the cart, remove it
        await removeFromCart(productId);
        setCartItems(prevCartItems => prevCartItems.filter(id => id !== productId));
        alert("Product removed from cart");
      } else {
        // If the product is not in the cart, add it
        await addToCart(productId);
        setCartItems(prevCartItems => [...prevCartItems, productId]);
        alert("Product added to cart");
      }
      // No need to refresh products here, it's done after adding/removing from cart
    } catch (error) {
      console.error("Error adding to/removing from cart:", error);
      alert("Error adding/removing product to/from cart");
    }
  };
  

  const addToCart = async (productId) => {
    const response = await axios.post(
      `http://localhost:5000/user/products/cart/${productId}`,
      {},
      { withCredentials: true }
    );
    if (response.status !== 200) {
      throw new Error("Failed to add product to cart");
    }
  };

  const removeFromCart = async (productId) => {
    const response = await axios.delete(
      `http://localhost:5000/user/products/cart/${productId}`,
      { withCredentials: true }
    );
    if (response.status !== 200) {
      throw new Error("Failed to remove product from cart");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/user/products/category/${category}`,
        {
          withCredentials: true,
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLaptopProducts = () => {
    fetchProductsByCategory("laptop");
    nav(`/laptops`); // Navigate to the /laptops route
  };

  const handleGetPhoneProducts = () => {
    fetchProductsByCategory("phone");
    nav(`/phones`);
  };

  return (
    <div className="container">
      <div className="sub-Container">
        <Link to={"/cart"}>Cart</Link>
        <h1 className="Home-Head">Home Page</h1>
      </div>
      <div className="HomeMainBoady">
        <h2 className="bodyHead">Product List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bodyinner" style={{ display: "flex" }}>
           {products.map((product) => (
  <div className="body-card" key={product._id}>
    <Link to={`/product/${product._id}`}>
      <img src={product.image} alt="img" />
    </Link>
    <h4>{product.title}</h4>
    <h5>{product.description}</h5>
    <h4>{product.price}</h4>
    <button onClick={() => handleAddToCart(product._id, product.inCart)}>
      {product.inCart ? "Remove from Cart" : "Add to Cart"}
    </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <button onClick={handleGetLaptopProducts}>Get Laptop Products</button>
        <button onClick={handleGetPhoneProducts}>Get Phone Products</button>
      </div>
    </div>
  );
}
