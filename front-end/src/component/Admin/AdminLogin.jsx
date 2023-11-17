

import React, { useContext } from 'react';
import { myContext } from '../../Context';
import axios from 'axios';

const AdminLogin = () => {
    
    const{ email,setEmail,password,setPassword}=useContext(myContext)
    console.log("Admin Email",email);
    console.log("Admin Password",password);

  const handleLogin = async () => {
    try {
     const response= await axios.post("http://localhost:5000/admin/login",{
        email,
        password
     })
     
     
     console.log(response.data);

      if (!response.ok) {
        throw new Error('Invalid Email or Password');
      }else{
        const data = await response.json();

        // Assuming you want to store the token in localStorage
        localStorage.setItem('token', data.token);
  
        console.log('Login successful', data.message);
        alert("welcome Admin")
      }

    
    } catch (error) {
      console.error('Login failed', error.message);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
