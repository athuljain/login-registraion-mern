import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";

const Phone = () => {
  const { products, setProducts } = useContext(myContext);
  const [loading, setLoading] = useState(false);

  const fetchLaptopProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/user/products/category/phone",
        {
          withCredentials: true,
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Phone products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaptopProducts();
  }, []);

  return (
    <div className="container">
      <div className="sub-Container">
        <h1 className="Phone-Head">Phone Products</h1>
      </div>
      <div className="PhoneMainBody">
        <h2 className="bodyHead">Phone List</h2>
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
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Phone;
