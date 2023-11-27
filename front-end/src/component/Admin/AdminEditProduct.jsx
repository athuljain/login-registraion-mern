import { useContext, useEffect } from "react"
import { myContext } from "../../Context"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
// import { response } from "../../../../Back-end/routes/adminRoute"

export default function AdminEditProduct(){

   const {productId}=useParams()
    
    const nav=useNavigate()
    const {product,setProduct,token}= useContext(myContext)

    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/products/${productId}`,
        {withCredentials:true})
        .then(response =>{
            setProduct(response.data.updatedProduct)
        })
        .catch(error=>console.error('Error fetching product details:', error))
       
    },[productId,setProduct])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
          ...product,
          [name]: value,
        });
      };
      const handleUpdateProduct = async (e) => {
        e.preventDefault();
    
        // Check if the token is available
        if (!token) {
          console.error("Token not available. Please log in as an admin.");
          return;
        }
    
        try {
          console.log("Token before request:", token);
          console.log("Front end", product);
    
          // Include the token in the request headers
          const response = await axios.put(
            `http://localhost:5000/admin/products/${productId}`,
            product,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            }
          );
    
          console.log("Product updated successfully", response.data);
          // Redirect to the product list page or wherever you want after successful update
          nav('/adminProducts');
        } catch (error) {
          console.error("Failed to update product", error.response);
        }
      };

    
    return(
        <div>
        <h1>Edit product</h1>
        <form onSubmit={handleUpdateProduct}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={product.title || ''}
            onChange={handleChange}
          />
  
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description || ''}
            onChange={handleChange}
          />
  
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={product.price || ''}
            onChange={handleChange}
          />
  
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image || ''}
            onChange={handleChange}
          />
  
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category || ''}
            onChange={handleChange}
          />
  
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={product.brand || ''}
            onChange={handleChange}
          />
  
          <button type="submit">Update Product</button>
        </form>
      </div>
    )
}