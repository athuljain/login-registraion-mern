// Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";
import "./Style/Home.css";

export default function Home() {
  const { products, setProducts } = useContext(myContext);
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
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="body-card">
                  <img src={product.image} alt="img" />
                  <h4>{product.title}</h4>
                  <h5>{product.description}</h5>
                  <h4>{product.price}</h4>
                  <button>Add To Cart</button>
                </div>
              </Link>
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
