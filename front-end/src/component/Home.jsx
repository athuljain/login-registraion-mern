import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";

export default function Home() {
  const { products, setProducts } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  // const nav = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/user/getProducts", {
        withCredentials: true,
      });
      setProducts(response.data.allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <h1>Home Page</h1>
        
      </div>
      <div>
        <h2>Product List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{display:"flex"}}>
            {products.map((product) => (
            //   <li key={product._id}>
            <div>
                <h4>{product.title}</h4>
                <h5>{product.description}</h5>
                <h4>{product.price}</h4>
                </div>
            //   </li>
            ))}
            </div>
          
        )}
      </div>
    </div>
  );
}
