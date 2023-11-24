import React, { useContext } from 'react';
import { myContext } from '../../Context.js';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    
    const{ email,setEmail,password,setPassword, setToken}=useContext(myContext)
    console.log("Admin Email",email);
    console.log("Admin Password",password);

    const nav=useNavigate()

    const handleLogin = async () => {
      try {
        const response = await axios.post("http://localhost:5000/admin/login", {
          email,
          password,
        }, {
          withCredentials: true,
        });
    
      const data = response.data;
      console.log("response.data adminlogin",response.data);
    
      if (data.token) {
        // Set the token in the state
        setToken(data.token);
        console.log("token in frontEnd", data.token);
        console.log('Login successful', data.message);
        alert("Welcome Admin");
        nav("/admin");
      } else {
        console.error('Token not found in response');
        alert("Invalid response from the server");
      }
    } catch (error) {
      console.error('Login failed', error.message);
      alert("Invalid Email or Password");
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