// Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";
import "./Style/Home.css";

export default function Home() {
  const { products, setProducts,userToken,setUserToken } = useContext(myContext);
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

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/user/products/cart/${productId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setUserToken(response.data.user.token); // Update the user token

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };




  return (
    <div className="container">
      <div className="sub-Container">
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
    <button onClick={() => handleAddToCart(product._id)}>Add To Cart</button>
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
