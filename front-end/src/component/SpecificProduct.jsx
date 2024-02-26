import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { myContext } from "../Context";

export default function SpecificProductPage() {
  const { productId } = useParams();
  const { specificProduct, setSpecificProduct } = useContext(myContext);
  const { products, setProducts,inCart, setInCart } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  

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
      if (inCart) {
        // If the product is already in the cart, remove it
        await removeFromCart(productId);
        setInCart(false); // Update state to reflect that the product is not in the cart
        alert("Product removed from cart");
      } else {
        // If the product is not in the cart, add it
        await addToCart(productId);
        setInCart(true); // Update state to reflect that the product is in the cart
        alert("Product added to cart");
      }
      // Refresh products after adding to or removing from cart
      fetchProducts();
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
          <button onClick={() => handleAddToCart(specificProduct._id)}>
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      )}
    </div>
  );
}
