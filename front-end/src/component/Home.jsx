import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";
import "./Style/Home.css"

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
    <div className="container">
      <div className="sub-Container">
        <h1 className="Home-Head">Home Page</h1>
        
      </div>
      <div className="HomeMainBoady">
        <h2 className="bodyHead">Product List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bodyinner" style={{display:"flex"}}>
            {products.map((product) => (
            //   <li key={product._id}>
            <div className="body-card">
              <img src={product.image} alt="img" ></img>
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
