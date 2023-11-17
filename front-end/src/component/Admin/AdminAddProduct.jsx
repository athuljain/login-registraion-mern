import { useContext } from "react"
import { myContext } from "../../Context"
import axios from "axios";

export default function AdminAddProduct(){
    const { product,setProduct,token, setToken}=useContext(myContext)


    const handleChange=(e)=>{
        const {name,value}=e.target;
        setProduct({
            ...product,
            [name]:value
        })
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log('Token:', token); 
        try {
            await axios.post("http://localhost:5000/admin/products", product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Product created successfully");
          } catch (error) {
            console.error("Failed to create product", error);
          }
    }


    return(
        <div>
            <h1>Add Product</h1>


        <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={product.title} onChange={handleChange} />

        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} />

        <label>Price:</label>
        <input type="text" name="price" value={product.price} onChange={handleChange} />

        <label>Image URL:</label>
        <input type="text" name="image" value={product.image} onChange={handleChange} />

        <label>Category:</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} />

        <label>Brand:</label>
        <input type="text" name="brand" value={product.brand} onChange={handleChange} />

        <button type="submit">Submit</button>

        </form>

        </div>
    )
}