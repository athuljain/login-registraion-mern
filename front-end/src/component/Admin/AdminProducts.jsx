import { useNavigate } from "react-router-dom"

export default function AdminProducts(){

    const nav=useNavigate()

    function AddProduct(){
nav("/addProduct")
    }
    return(
        <div>
            <h1>Products</h1>
            <button onClick={AddProduct}>Add Product</button>
        </div>
    )
}