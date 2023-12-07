import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Register from './component/Registration.jsx';
import Login from './component/Login.jsx';
import {myContext} from './Context.js'
import Home from './component/Home.jsx';
import AdminLogin from './component/Admin/AdminLogin.jsx';
import AdminPage from './component/Admin/AdminPage.jsx';
import AdminUsers from './component/Admin/AdminUsers.jsx';
import AdminAddProduct from './component/Admin/AdminAddProduct.jsx';
import AdminProducts from './component/Admin/AdminProducts.jsx';
import AdminEditProduct from './component/Admin/AdminEditProduct.jsx';

function App() {

  

  const[email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [adminEmail, setAdminEmail] = useState('');
  //const [adminPassword, setAdminPassword] = useState('');
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    brand: '',
  });

  const [token, setToken] = useState(null);
  const [products,setProducts]=useState([])

  const [userToken, setUserToken] = useState(null);

  const values={
    email,setEmail,
    password,setPassword,
    name,setName,confirmPassword,setConfirmPassword,
    //adminPassword, setAdminPassword,
    adminEmail, setAdminEmail,
    product,setProduct,
    token, setToken,
    products,setProducts,
    userToken, setUserToken
  }
  //console.log("front end token",token);

  return (
    <div className="App">
      <BrowserRouter>
        <myContext.Provider value={values}>
          <Routes>
            <Route path='/adminLogin' element={<AdminLogin />}/>
            <Route path='/admin' element={<AdminPage />}/>
            <Route path='/adminProducts' element={<AdminProducts />}/>
            <Route path='/addProduct' element={<AdminAddProduct />}/>
            <Route path='/adminUsers' element={<AdminUsers />}/>
            <Route path='/adminEditProduct/:productId' element={<AdminEditProduct />}/>

            <Route path='/register' element={<Register />}/>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
        </Routes>
        </myContext.Provider>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;