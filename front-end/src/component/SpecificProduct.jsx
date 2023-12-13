// ProductDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { myContext } from "../Context";

export default function SpecificProductPage() {
  const { productId } = useParams();
  const { specificProduct, setSpecificProduct } = useContext(myContext);
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
        </div>
      )}
    </div>
  );
}
