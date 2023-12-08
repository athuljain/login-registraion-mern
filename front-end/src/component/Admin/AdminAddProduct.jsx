import { useContext } from "react";
import { myContext } from "../../Context.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const nav = useNavigate();
  const { product, setProduct, token } = useContext(myContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the token is available
    if (!token) {
      console.error("Token not available. Please log in as an admin.");
      return;
    }
    try {
      console.log("Token before requst:", token);
      console.log("front end", product);
      // Include the token in the request headers
      const response = await axios.post(
        "http://localhost:5000/admin/products",
        product,
        {
          withCredentials:true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Prdoduct add successfully")
      nav('/adminProducts')

      console.log("Product created successfully", response.data);

    } catch (error) {
      console.error("Failed to create product", error.response);
      alert("Failed to create product")
    }
  };

  
  //   try {
  //     console.log("Token before request:", token);
  //     console.log("Front end", product);

  //     const response = await fetch('http://localhost:5000/admin/products', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(product),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Error connecting to the backend');
  //     }

  //     const data = await response.json();
  //     console.log('Backend response:', data);
  //     alert("product added succesfully")
  //     nav('/adminProducts')

  //   } catch (error) {
  //     console.error('Error:', error.message);

  //   }
  // };

  return (
    <div>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
