
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

function App() {

  const[email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const values={
    email,setEmail,
    password,setPassword,
    name,setName,confirmPassword,setConfirmPassword,
    adminPassword, setAdminPassword,
    adminEmail, setAdminEmail
  }

  return (
    <div className="App">
      <BrowserRouter>
        <myContext.Provider value={values}>
          <Routes>
            <Route path='/adminLogin' element={<AdminLogin />}/>
            <Route path='/admin' element={<AdminPage />}/>
            <Route path='/adminProducts' element={<AdminUsers />}/>


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
