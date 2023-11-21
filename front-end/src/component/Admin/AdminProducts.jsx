import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { myContext } from "../../Context"
import axios from "axios"

export default function AdminProducts(){

    const { products,setProducts}=useContext(myContext)

    const nav=useNavigate()

    useEffect(() => {
        // Fetch products when the component mounts
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:5000/admin/products'); // Replace with your actual API endpoint
            setProducts(response.data.allProducts);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);

    function AddProduct(){
nav("/addProduct")
    }
    return(
        <div>
        <div>
            <h1>Products</h1>
            <button onClick={AddProduct}>Add Product</button>
        </div>
        <div>
            
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.title} 
             
            </li>
          ))}
        </ul>






        </div>
        </div>
    )
}