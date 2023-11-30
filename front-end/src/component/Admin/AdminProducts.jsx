import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../Context";
import axios from "axios";

export default function AdminProducts() {
  const { products, setProducts } = useContext(myContext);

  const nav = useNavigate();

  function EditPage(productId) {
    nav(`/adminEditProduct/${productId}`);
    console.log("edit button :",productId);
  }
  function DeletePage(productId){
    nav(`/adminDeleteProduct/${productId}`)
    console.log('delete button : ',productId);
  }

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/products",
          {
            withCredentials: true,
          }
        ); // Replace with your actual API endpoint
        setProducts(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log("fetch products", products);

  function AddProduct() {
    nav("/addProduct");
  }
  return (
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
              <h4> {product.title} </h4>
              <h5>{product.description}</h5>
              <h4>{product.price}</h4>

              <button onClick={() => EditPage(product._id)}>
                Edit Product
              </button>
              <button onClick={()=> DeletePage(product._id)} >Delete Product</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
