// ProductDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { myContext } from "../Context";

export default function SpecificProductPage() {
  const { productId } = useParams();
  const { specificProduct, setSpecificProduct } = useContext(myContext);
  const { products, setProducts, } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  console.log("specific page", specificProduct);

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



  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/user/products/cart/${productId}`,
        {},
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        alert("Product added to cart");
        // Refresh products after adding to cart
        fetchProducts();
      } else if (response.status === 409) {
        console.log("Product is already in the cart");
        alert("Product is already in the cart");
      } else {
        console.error("Error adding to cart:", response.data);
        alert("Error else case");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding product to cart catch case");
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="specific-product-details">
          <h2>{specificProduct.title}</h2>
          <p>{specificProduct.description}</p>
          <p>{specificProduct.price}</p>
          <img src={specificProduct.image} alt="Product" />
          <button onClick={() => handleAddToCart(specificProduct._id)}>Add To Cart</button>
        </div>
      )}
    </div>
  );
}
