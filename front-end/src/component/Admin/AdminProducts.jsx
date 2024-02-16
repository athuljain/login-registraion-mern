import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../Context";
import axios from "axios";
import "../Style/AdminProduct.css";

export default function AdminProducts() {
  const { products, setProducts } = useContext(myContext);

  const nav = useNavigate();

  function EditPage(productId) {
    nav(`/adminEditProduct/${productId}`);
    console.log("edit button :", productId);
  }

  const DeleteBtn = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/products/${productId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      }
    } catch (error) {
      console.error("Erro deleting product", error);
    }
  };

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
    <div className="admin-main">
      <div className="admin-sub">
        <h1 className="admin-head">Products</h1>
        <button className="admin-add" onClick={AddProduct}>
          Add Product
        </button>
      </div>
      <div className="admin-body">
        <h2 className="admin-bodyHead">Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h4> {product.title} </h4>
              <img src={product.image} alt="img"></img>
              <h5>{product.description}</h5>
              <h4>{product.price}</h4>

              <button
                className="adminBtn"
                onClick={() => EditPage(product._id)}
              >
                Edit Product
              </button>
              <button
                className="adminBtn"
                onClick={() => DeleteBtn(product._id)}
              >
                Delete Product
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
