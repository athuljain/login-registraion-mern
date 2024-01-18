// Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";
import "./Style/Home.css";

export default function Home() {
  const { products, setProducts,userToken, } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/user/getProducts",
        {
          withCredentials: true,
        }
      );
      setProducts(response.data.allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category

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


  // const handleAddToCart = async (productId) => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:5000/user/products/cart/${productId}`,
  //       {},
  //       { withCredentials: true }
  //     );
  
  //     if (response.status === 200) {
  //       console.log("Product added to cart successfully");
  //       alert("Product added to cart");
        
  //     }else if (response.status === 409) {
  //       alert("Product is already in the cart");
  //     } else {
  //       console.error("Error adding to cart:", response.data);
  //       alert("Error adding product to cart");
  //     }
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     alert("Error adding product to cart");
  //   }
  // };


  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/user/products/cart/${productId}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Product added to cart successfully");
        alert("Product added to cart");
        // Refresh products after adding to cart
        fetchProducts();
      } else if (response.status === 409) {
        alert("Product is already in the cart");
      } else {
        console.error("Error adding to cart:", response.data);
        alert("Error adding product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding product to cart");
    }
  };


  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/products/cart/${productId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Product removed from cart successfully");
        alert("Product removed from cart");
        // Refresh products after removing from cart
        fetchProducts();
      } else {
        console.error("Error removing from cart:", response.data);
        alert("Error removing product from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Error removing product from cart");
    }
  };
  

  useEffect(() => {
    fetchProducts();
  },[]);


  return (
    <div className="container">
      <div className="sub-Container">
        <Link to={'/cart'}>Cart</Link>
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
    {userToken ?(
    userToken.cart.includes(product._id)?(
       <button onClick={() => handleRemoveFromCart(product._id)}>
       Remove From Cart
     </button>
    ):(
      <button onClick={() => handleAddToCart(product._id)}>
      Add To Cart
    </button>
    )
    ):(
      <p>Login to add to cart</p>
    )}
    
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
